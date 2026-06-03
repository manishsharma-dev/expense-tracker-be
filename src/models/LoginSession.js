const mongoose = require('mongoose');

const loginSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    loginMethod: {
      type: String,
      enum: ['email_otp', 'phone_otp', 'google', 'facebook'],
      required: true,
    },
    identifier: {
      type: String,
      required: true,
      trim: true,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    deviceType: {
      type: String,
      enum: ['mobile', 'tablet', 'desktop', 'unknown'],
      default: 'unknown',
    },
    deviceId: {
      type: String,
      trim: true,
    },
    accessTokenHash: {
      type: String,
      required: true,
      index: true,
    },
    loginAt: {
      type: Date,
      default: Date.now,
    },
    logoutAt: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('LoginSession', loginSessionSchema);
