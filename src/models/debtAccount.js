const mongoose = require('mongoose');

const debtAccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Debt name is required'],
      trim: true,
      maxlength: [255, 'Debt name cannot exceed 255 characters'],
    },
    type: {
      type: String,
      enum: ['credit_card', 'personal_loan', 'home_loan', 'vehicle_loan', 'education_loan', 'bnpl', 'borrowed', 'other'],
      required: [true, 'Debt type is required'],
      index: true,
    },
    source: {
      type: String,
      trim: true,
      maxlength: [255, 'Source cannot exceed 255 characters'],
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      index: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
    openingBalance: {
      type: Number,
      default: 0,
      min: [0, 'Opening balance cannot be negative'],
    },
    currentBalance: {
      type: Number,
      default: 0,
      min: [0, 'Current balance cannot be negative'],
    },
    creditLimit: {
      type: Number,
      min: [0, 'Credit limit cannot be negative'],
    },
    interestRate: {
      type: Number,
      min: [0, 'Interest rate cannot be negative'],
    },
    emiAmount: {
      type: Number,
      min: [0, 'EMI amount cannot be negative'],
    },
    dueDay: {
      type: Number,
      min: [1, 'Due day must be between 1 and 31'],
      max: [31, 'Due day must be between 1 and 31'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['active', 'closed'],
      default: 'active',
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

debtAccountSchema.index(
  { name: 1, createdBy: 1 },
  { unique: true, partialFilterExpression: { isDeleted: false } }
);

module.exports = mongoose.model('DebtAccount', debtAccountSchema);
