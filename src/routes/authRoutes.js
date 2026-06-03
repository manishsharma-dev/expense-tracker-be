const router = require('express').Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const {
  registerRules,
  otpRequestRules,
  otpVerifyRules,
} = require('../middlewares/validate');

router.post('/register', registerRules, authController.register);
router.post('/otp/request', otpRequestRules, authController.requestOtp);
router.post('/otp/verify', otpVerifyRules, authController.verifyOtp);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

module.exports = router;
