const router = require('express').Router();
const paymentMethodController = require('../controllers/paymentMethodController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, paymentMethodController.createPaymentMethod);
router.get('/', protect, paymentMethodController.getPaymentMethods);
router.get('/:id', protect, paymentMethodController.getPaymentMethodById);
router.put('/:id', protect, paymentMethodController.updatePaymentMethod);

module.exports = router;
