const mongoose = require('mongoose');

const paymentProviderSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Code is required'],
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [255, 'Name cannot exceed 255 characters'],
    },
    type: {
      type: String,
      enum: ['bank', 'upi_app', 'wallet', 'cash'],
      required: [true, 'Type is required'],
      index: true,
    },
    icon: {
      type: String,
      trim: true,
      maxlength: [255, 'Icon cannot exceed 255 characters'],
    },
    country: {
      type: String,
      trim: true,
      uppercase: true,
      default: 'IN',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('PaymentProvider', paymentProviderSchema);
