const router = require('express').Router();
const paymentProviderController = require('../controllers/paymentProviderController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, paymentProviderController.getPaymentProviders);

module.exports = router;
