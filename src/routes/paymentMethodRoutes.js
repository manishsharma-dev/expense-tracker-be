const router = require('express').Router();
const paymentMethodController = require('../controllers/paymentMethodController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, paymentMethodController.createPaymentMethod);
router.get('/', protect, paymentMethodController.getPaymentMethods);
router.put('/sequence', protect, paymentMethodController.updatePaymentMethodSequence);
router.get('/:id', protect, paymentMethodController.getPaymentMethodById);
router.put('/:id', protect, paymentMethodController.updatePaymentMethod);
router.delete('/:id', protect, paymentMethodController.deletePaymentMethod);

module.exports = router;
