const router = require('express').Router();
const expenditureSubCategoryController = require('../controllers/expenditureSubCategoryController');
const {protect} = require('../middlewares/auth');

router.post('/', protect, expenditureSubCategoryController.createSubCategory);
router.get('/', protect, expenditureSubCategoryController.getSubCategories);
router.get('/:id', protect, expenditureSubCategoryController.getSubCategoryById);
router.get('/category/:categoryId', protect, expenditureSubCategoryController.getSubCategoriesByCategoryId);
router.put('/:id', protect, expenditureSubCategoryController.updateSubCategory);

module.exports = router;