const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExpenditureCategory',
            required: [true, 'Category is required'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);