const router = require('express').Router();
const earningController = require('../controllers/earningController');
const { protect } = require('../middlewares/auth');

router.get('/categories', protect, earningController.getCategories);
router.post('/categories', protect, earningController.createCategory);
router.get('/', protect, earningController.getEarnings);
router.post('/', protect, earningController.createEarning);

module.exports = router;
