const router = require('express').Router();
const expenseController = require('../controllers/expenseController');
const {protect} = require('../middlewares/auth');
const { uploadReceipt } = require('../middlewares/uploadReceipt');

const uploadExpenseReceipt = (req, res, next) => {
  uploadReceipt.single('receipt')(req, res, (err) => {
    if (err) {
      err.statusCode = err.statusCode || 400;
      next(err);
      return;
    }
    next();
  });
};

router.post('/', protect, uploadExpenseReceipt, expenseController.createExpense);
router.get('/', protect, expenseController.getAllExpenses);
router.get('/filter', protect, expenseController.getExpenses);
router.get('/:id/receipt', protect, expenseController.getReceipt);
router.get('/:id', protect, expenseController.getExpenseById);
router.put('/:id', protect, uploadExpenseReceipt, expenseController.updateExpense);
router.delete('/:id', protect, expenseController.deleteExpense);

module.exports = router;
