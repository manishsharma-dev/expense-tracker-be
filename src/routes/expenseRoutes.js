const router = require('express').Router();
const expenseController = require('../controllers/expenseController');
const {protect} = require('../middlewares/auth');

router.post('/', protect, expenseController.createExpense);
router.get('/', protect, expenseController.getAllExpenses);
router.get('/filter', protect, expenseController.getExpenses);
router.get('/:id', protect, expenseController.getExpenseById);
router.put('/:id', protect, expenseController.updateExpense);

module.exports = router;
