const mongoose = require('mongoose');

const vitalsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["heartRate", "spO2", "glucose", "activity"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },

    routine: {
      type: String,
      enum: ["fasting", "after_meal", "before_meal", "random"],
    },

    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
);

const Vitals = mongoose.model("Vitals", vitalsSchema);

module.exports = Vitals;