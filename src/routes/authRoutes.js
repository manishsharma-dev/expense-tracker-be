const router = require('express').Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { registerRules, loginRules } = require('../middlewares/validate');

router.post('/register', registerRules, authController.register);
router.post('/login', loginRules, authController.login);
router.get('/me', protect, authController.getMe);

module.exports = router;
