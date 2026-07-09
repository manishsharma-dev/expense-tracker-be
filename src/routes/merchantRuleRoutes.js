const router = require('express').Router();
const merchantRuleController = require('../controllers/merchantRuleController');
const { protect } = require('../middlewares/auth');

router.get('/suggestions', protect, merchantRuleController.getSuggestions);
router.delete('/suggestions/:id', protect, merchantRuleController.deleteSuggestion);

module.exports = router;
