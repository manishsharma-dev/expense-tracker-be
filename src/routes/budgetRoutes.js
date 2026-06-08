const router = require('express').Router();
const budgetController = require('../controllers/budgetController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, budgetController.getBudget);
router.put('/', protect, budgetController.upsertBudget);

module.exports = router;
