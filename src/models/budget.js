const mongoose = require('mongoose');

const budgetAllocationSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Budget amount is required'],
      min: [0, 'Budget amount cannot be negative'],
    },
  },
  { _id: false }
);

const budgetSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: [true, 'Month is required'],
      match: [/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format'],
      index: true,
    },
    totalAmount: {
      type: Number,
      default: 0,
      min: [0, 'Total budget cannot be negative'],
    },
    allocations: [budgetAllocationSchema],
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

budgetSchema.index(
  { month: 1, createdBy: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } }
);

module.exports = mongoose.model('Budget', budgetSchema);
