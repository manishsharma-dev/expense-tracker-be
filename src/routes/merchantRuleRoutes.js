const router = require('express').Router();
const merchantRuleController = require('../controllers/merchantRuleController');
const { protect } = require('../middlewares/auth');

router.get('/suggestions', protect, merchantRuleController.getSuggestions);

module.exports = router;
