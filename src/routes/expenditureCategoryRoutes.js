const router = require('express').Router();
const expenditureCategoryController = require('../controllers/expenditureCategoryController');
const {protect} = require('../middlewares/auth');

router.post('/', protect, expenditureCategoryController.createCategory);
router.get('/', protect, expenditureCategoryController.getCategories);
router.get('/:id', protect, expenditureCategoryController.getCategoryById);
router.put('/:id', protect, expenditureCategoryController.updateCategory);

module.exports = router;