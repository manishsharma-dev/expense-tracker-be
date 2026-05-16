const mongoose = require('mongoose');

const expenditureCategorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [255, 'Name cannot exceed 255 characters'],
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
  }
);

module.exports = mongoose.model('ExpenditureCategory', expenditureCategorySchema);