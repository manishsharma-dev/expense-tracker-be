const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
    },
    gender: {
      type: String,
      enum: ['female', 'male', 'non_binary', 'prefer_not_to_say', 'other'],
    },
    dateOfBirth: {
      type: Date,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
    },
    profileReminderDismissedAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('validate', function (next) {
  if (!this.email && !this.phone) {
    this.invalidate('email', 'Either email or phone is required');
  }
  next();
});

userSchema.methods.toJSON = function () {
  return this.toObject();
};

module.exports = mongoose.model('User', userSchema);
