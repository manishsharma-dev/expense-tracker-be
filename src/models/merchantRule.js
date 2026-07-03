const mongoose = require('mongoose');

const merchantRuleSchema = new mongoose.Schema(
  {
    merchantName: {
      type: String,
      required: [true, 'Merchant name is required'],
      trim: true,
      maxlength: [200, 'Merchant name cannot exceed 200 characters'],
    },
    pattern: {
      type: String,
      required: [true, 'Merchant pattern is required'],
      trim: true,
      lowercase: true,
      maxlength: [200, 'Merchant pattern cannot exceed 200 characters'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      required: [true, 'Payment method is required'],
    },
    usageCount: {
      type: Number,
      default: 1,
      min: 0,
    },
    lastUsedAt: {
      type: Date,
      default: Date.now,
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

merchantRuleSchema.index(
  { createdBy: 1, pattern: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } }
);
merchantRuleSchema.index({ createdBy: 1, usageCount: -1, lastUsedAt: -1 });

module.exports = mongoose.model('MerchantRule', merchantRuleSchema);
