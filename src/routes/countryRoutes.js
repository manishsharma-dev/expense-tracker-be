const router = require('express').Router();
const countryController = require('../controllers/countryController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, countryController.getCountries);

module.exports = router;
