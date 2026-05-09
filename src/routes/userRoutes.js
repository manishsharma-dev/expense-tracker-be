const router = require('express').Router();
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/auth');

router.use(protect);

router.get('/', restrictTo('admin'), userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', restrictTo('admin'), userController.deleteUser);

module.exports = router;
