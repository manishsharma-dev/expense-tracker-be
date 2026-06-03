const router = require('express').Router();
const subCategoryController = require('../controllers/subCategoryController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, subCategoryController.createSubCategory);
router.get('/', protect, subCategoryController.getSubCategories);
router.get('/:id', protect, subCategoryController.getSubCategoryById);
router.put('/:id', protect, subCategoryController.updateSubCategory);

module.exports = router;
