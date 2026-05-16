const mongoose = require('mongoose');

const expenditureSubCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [255, 'Name cannot exceed 255 characters'],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ExpenditureCategory',
            required: [true, 'Category is required'],
        },
        color: {
            type: String,
            trim: true,
            maxlength: [50, 'Color cannot exceed 50 characters'],
        },
        icon: {
            type: String,
            trim: true,
            maxlength: [255, 'Icon cannot exceed 255 characters'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ExpenditureSubCategory', expenditureSubCategorySchema);