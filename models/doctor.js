const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patients: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        time: {
          type: String,
          required: true,
        }
      },
    ],

    specialization: { type: String, default: "General" },
    rating: { type: Number, default: 5 },
    experience: { type: Number, default: 1 },
    slots: [String],
  },
);

module.exports = mongoose.model("Doctor", doctorSchema);