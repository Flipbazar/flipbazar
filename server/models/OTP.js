const mongoose = require("mongoose");

// OTP Schema
const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// OTP Model
const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
