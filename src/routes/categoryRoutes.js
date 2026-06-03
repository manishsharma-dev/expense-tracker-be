const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, categoryController.createCategory);
router.get('/', protect, categoryController.getCategories);
router.get('/:id', protect, categoryController.getCategoryById);
router.put('/:id', protect, categoryController.updateCategory);

module.exports = router;
