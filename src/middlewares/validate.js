const { body } = require('express-validator');

const emailRule = body('email')
  .optional()
  .isEmail()
  .withMessage('Valid email is required')
  .normalizeEmail();

const phoneRule = body('phone')
  .optional()
  .trim()
  .matches(/^\+?[1-9]\d{1,14}$/)
  .withMessage('Valid phone number is required');

const requireEmailOrPhone = body().custom((value) => {
  if (!value.email && !value.phone) {
    throw new Error('Either email or phone is required');
  }
  return true;
});

const registerRules = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  emailRule,
  phoneRule,
  requireEmailOrPhone,
  body('country').optional().isMongoId().withMessage('Country must be a valid id'),
];

const otpRequestRules = [
  body('identifier').trim().notEmpty().withMessage('Email or phone is required'),
];

const otpVerifyRules = [
  body('identifier').trim().notEmpty().withMessage('Email or phone is required'),
  body('otp')
    .trim()
    .isLength({ min: 4, max: 8 })
    .isNumeric()
    .withMessage('Valid OTP is required'),
];

module.exports = {
  registerRules,
  otpRequestRules,
  otpVerifyRules,
};
