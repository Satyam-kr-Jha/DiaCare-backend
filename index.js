require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')

const patientRoute  = require('./routers/patientRoute')
const authRoute     = require('./routers/authRoute')
const doctorRoute   = require('./routers/doctorRoute')
const { router: hardwareDataRoute, startSerial } = require('./routers/hardwareData')
require('./config/mongoConnect')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/patient',  patientRoute)
app.use('/api/auth',     authRoute)
app.use('/api/doctor',   doctorRoute)
app.use('/api/hardware', hardwareDataRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`)
  startSerial()   // start reading ESP32 as soon as server boots
})
