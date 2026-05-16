const router = require('express').Router();
const expenditureSourceController = require('../controllers/expenditureSourceController');
const {protect} = require('../middlewares/auth');

router.post('/', protect, expenditureSourceController.createSource);
router.get('/', protect, expenditureSourceController.getAllSources);
router.get('/:id', protect, expenditureSourceController.getSourceById);
router.put('/:id', protect, expenditureSourceController.updateSource);

module.exports = router;