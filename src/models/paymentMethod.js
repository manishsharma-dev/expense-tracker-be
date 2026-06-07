const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [255, 'Name cannot exceed 255 characters'],
    },
    type: {
      type: String,
      enum: ['cash', 'card', 'debit_card', 'credit_card', 'upi', 'bank', 'wallet', 'other'],
      default: 'other',
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentProvider',
      index: true,
    },
    nickname: {
      type: String,
      trim: true,
      maxlength: [255, 'Nickname cannot exceed 255 characters'],
    },
    lastFour: {
      type: String,
      trim: true,
      maxlength: [4, 'Last four cannot exceed 4 characters'],
    },
    upiId: {
      type: String,
      trim: true,
      maxlength: [100, 'UPI ID cannot exceed 100 characters'],
    },
    icon: {
      type: String,
      trim: true,
      maxlength: [255, 'Icon cannot exceed 255 characters'],
    },
    sequence: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, versionKey: false }
);

paymentMethodSchema.index(
  { name: 1, createdBy: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } }
);

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
