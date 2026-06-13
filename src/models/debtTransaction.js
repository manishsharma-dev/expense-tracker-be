const mongoose = require('mongoose');

const debtTransactionSchema = new mongoose.Schema(
  {
    debtAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DebtAccount',
      required: [true, 'Debt account is required'],
      index: true,
    },
    type: {
      type: String,
      enum: ['opening_balance', 'charge', 'payment', 'interest', 'fee', 'adjustment'],
      required: [true, 'Transaction type is required'],
      index: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than zero'],
    },
    direction: {
      type: String,
      enum: ['increase', 'decrease'],
      required: [true, 'Direction is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [255, 'Description cannot exceed 255 characters'],
    },
    sourceExpense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
      index: true,
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

debtTransactionSchema.index(
  { sourceExpense: 1, createdBy: 1 },
  { unique: true, partialFilterExpression: { sourceExpense: { $exists: true } } }
);

module.exports = mongoose.model('DebtTransaction', debtTransactionSchema);
