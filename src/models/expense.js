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
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExpenditureSubCategory',
        },
        source: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExpenditureSource',
            required: [true, 'Source is required'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [200, 'Description cannot exceed 200 characters'],
            required: [true, 'Description is required'],
        },
        country: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Country',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);