const express=require('express');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const user = require('../models/user');
const vitals = require('../models/vitals');
const router=express.Router();


router.get('/data', isLoggedIn,async (req, res)=>{
    try{
        const userId = req.user.id;
        const userData = await user.findById(userId).select("-password").lean();
        if(!userData){
            return res.status(404).json({ message: "User not found" });
        }
        res.json(userData);

    } catch (error) {
        console.error("Error fetching patient data:", error);
        res.status(500).json({ message: "Server error" });
    }
    // [fetch patient data from database]
})
router.post('/update', isLoggedIn, async (req, res)=>{
    try {
        const userId = req.user.id;
        const { fullname, age, gender } = req.body;
        const updatedUser = await user.findByIdAndUpdate(userId, { fullname, age, gender }, { returnDocument: "after" }).select("-password").lean();
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating patient data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/report', isLoggedIn, async (req, res)=>{
    try {
        const userId = req.user.id;
        const { report } = req.body;
        if (!report) {
            return res.status(400).json({ message: "Report data is required" });
        } 
        let newVital;
        if(report.type === "glucose"){
            newVital = await vitals.create({
            userId,
            type: report.type,
            value: report.value,
            routine: report.routine,
            unit: report.unit,
            recordedAt: report.recordedAt
        })
        }else{
            newVital= await vitals.create({
                userId,
                type: report.type,
                value: report.value,
                unit: report.unit,
                recordedAt: report.recordedAt
            })
        }
        res.status(201).json(newVital);
    } catch (error) {
        console.error("Error updating patient report data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/vitals/glucose', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user.id;

    const glucoseData = await vitals
      .find({ userId, type: "glucose" })
      .sort({ recordedAt: 1 }) // ✅ ascending
      .lean();

    res.json(glucoseData);

  } catch (error) {
    console.error("Error fetching glucose data:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get('/vitals/activity', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user.id;
        const activityData = await vitals
            .find({ userId, type: "activity" })
            .sort({ recordedAt: 1 })   // ← ascending: oldest first → newest last
            .lean();
        res.json(activityData);
    } catch (error) {
        console.error("Error fetching activity data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/vitals/heartRate', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user.id;
        const heartRateData = await vitals
            .find({ userId, type: "heartRate" })
            .sort({ recordedAt: 1 })
            .lean();
        res.json(heartRateData);
    } catch (error) {
        console.error("Error fetching heart rate data:", error);
        res.status(500).json({ message: "Server error" });
    }
});
router.get('/vitals/spO2', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user.id;
        const spO2Data = await vitals
            .find({ userId, type: "spO2" })
            .sort({ recordedAt: 1 })   // ← ascending: oldest → newest
            .lean();
        res.json(spO2Data);
    } catch (error) {
        console.error("Error fetching spO2 data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/hardwareData', isLoggedIn, async (req, res) => {

})


module.exports=router