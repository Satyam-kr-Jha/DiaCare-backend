/**
 * backend/routers/hardwareData.js
 *
 * - Reads ESP32 serial data continuously
 * - Stores latest reading in memory
 * - GET /api/hardware  → returns latest reading
 */

const express = require('express');
const router  = express.Router();
const { SerialPort }     = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// ── Latest reading stored in memory ──────────────────────────────────────────
let latestData = {
  ir:        0,
  red:       0,
  finger:    false,
  spo2:      null,
  timestamp: null,
};

// ── Parse one line from ESP32 ─────────────────────────────────────────────────
function parseLine(raw) {
  const irMatch  = raw.match(/IR:\s*(\d+)/);
  const redMatch = raw.match(/Red:\s*(\d+)/);
  if (!irMatch || !redMatch) return null;

  const ir     = parseInt(irMatch[1]);
  const red    = parseInt(redMatch[1]);
  const finger = raw.includes('Finger detected');

  let spo2 = null;
  if (finger && ir > 0) {
    const ratio = red / ir;
    spo2 = Math.round(Math.min(100, Math.max(85, 110 - 25 * ratio)));
  }

  return { ir, red, finger, spo2, timestamp: new Date().toISOString() };
}

// ── Auto-detect ESP32 port ────────────────────────────────────────────────────
async function autoDetect() {
  const ports    = await SerialPort.list();
  const keywords = ['usb', 'uart', 'ch340', 'cp210', 'ftdi', 'silicon', 'esp'];
  for (const p of ports) {
    const desc = ((p.manufacturer || '') + (p.friendlyName || '') + (p.path || '')).toLowerCase();
    if (keywords.some(k => desc.includes(k))) return p.path;
  }
  return ports.length > 0 ? ports[0].path : null;
}

// ── Start reading serial port ─────────────────────────────────────────────────
async function startSerial() {
  const portPath = process.env.SERIAL_PORT || await autoDetect();

  if (!portPath) {
    console.error('[Hardware] No serial port found. Connect your ESP32 and restart.');
    return;
  }

  console.log(`[Hardware] Opening port: ${portPath}`);

  const serial = new SerialPort({ path: portPath, baudRate: 115200 });
  const parser = serial.pipe(new ReadlineParser({ delimiter: '\n' }));

  serial.on('open',  () => console.log(`[Hardware] Connected to ${portPath}`));
  serial.on('error', err => console.error(`[Hardware] Error: ${err.message}`));

  parser.on('data', raw => {
    raw = raw.trim();
    const parsed = parseLine(raw);
    if (!parsed) return;

    latestData = parsed;

    // Print to terminal
    const ts     = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const status = parsed.finger ? '● FINGER' : '○ No finger';
    console.log(`[${ts}]  IR: ${parsed.ir}  Red: ${parsed.red}  ${status}${parsed.spo2 ? `  SpO2: ~${parsed.spo2}%` : ''}`);
  });
}

// ── GET /api/hardware ─────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  res.json({ success: true, data: latestData });
});

module.exports = { router, startSerial };
