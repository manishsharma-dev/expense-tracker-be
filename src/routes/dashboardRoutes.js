const router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, dashboardController.getDashboardData);

module.exports = router;
