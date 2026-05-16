const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));

//protected routes
router.use("/expenditure-category", require('./expenditureCategoryRoutes'));
router.use("/expenditure-sub-category", require('./expenditureSubCategoryRoutes'));

// Health check
router.get('/health', (req, res) =>
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() })
);

module.exports = router;
