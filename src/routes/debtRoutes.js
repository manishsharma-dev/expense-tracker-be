const router = require('express').Router();
const debtController = require('../controllers/debtController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, debtController.getDebtAccounts);
router.post('/', protect, debtController.createDebtAccount);
router.get('/:id', protect, debtController.getDebtAccountById);
router.post('/:id/charges', protect, debtController.recordDebtCharge);
router.post('/:id/payments', protect, debtController.recordDebtPayment);

module.exports = router;
