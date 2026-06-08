const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than zero'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EarningCategory',
      required: [true, 'Category is required'],
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Description cannot exceed 200 characters'],
      required: [true, 'Description is required'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
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

earningSchema.index({ createdBy: 1, date: -1 });

module.exports = mongoose.model('Earning', earningSchema);
