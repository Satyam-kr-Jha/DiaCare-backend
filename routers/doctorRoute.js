const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const user = require("../models/user");
const { isLoggedIn}= require("../middlewares/isLoggedIn");

router.get('/data', isLoggedIn,async (req, res)=>{
    try{
        const userId = req.user.id;
        const userData = await user.findById(userId).select("-password").lean();
        if(!userData){
            return res.status(404).json({ message: "User not found" });
        }
        res.json(userData);

    } catch (error) {
        console.error("Error fetching doctor data:", error);
        res.status(500).json({ message: "Server error" });
    }
})

router.get("/alldoctor", isLoggedIn, async (req, res) => {
  try {
    const allDoctors = await Doctor.find().populate("doctorId", "fullname");
    res.json(allDoctors);
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ doctorId: req.user.id }).populate("doctorId", "fullname").populate("patients.userId", "fullname");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    res.status(500).json({ message: "Error fetching doctor profile" });
  }
});

router.post("/update", isLoggedIn, async (req, res) => {
  try {
    const { specialty, experience, rating, slots, fullname } = req.body;

    const doctor = await Doctor.findOneAndUpdate(
      { doctorId: req.user.id },
      { specialty, experience, rating, slots},
      {returnDocument: "after", upsert: true,}
    );
    await user.findByIdAndUpdate(req.user.id, { fullname }, { returnDocument: "after" });
    res.json(doctor);
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({ message: "Error updating doctor profile" });
  }
});

router.post("/book", isLoggedIn, async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { $push: { patients: { userId: req.user.id, date, time } } }, { returnDocument: "after" });
    if(!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Error booking appointment" });
  }
});

router.get("/bookings", isLoggedIn, async (req, res) => {
  try {
    const doctors = await Doctor.find({
      "patients.userId": req.user.id,
    }).populate("doctorId", "fullname") // doctor name
    if (!doctors.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.json(doctors);

  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

module.exports = router;