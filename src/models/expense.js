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
        country: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Country',
        },
        receipt: {
            storageProvider: {
                type: String,
                enum: ['local', 's3'],
                default: 's3',
            },
            originalName: {
                type: String,
                trim: true,
            },
            fileName: {
                type: String,
                trim: true,
            },
            path: {
                type: String,
                trim: true,
            },
            url: {
                type: String,
                trim: true,
            },
            bucket: {
                type: String,
                trim: true,
            },
            key: {
                type: String,
                trim: true,
            },
            mimeType: {
                type: String,
                trim: true,
            },
            size: {
                type: Number,
            },
            etag: {
                type: String,
                trim: true,
            },
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
