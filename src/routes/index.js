const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));

//protected routes
router.use('/categories', require('./categoryRoutes'));
router.use('/sub-categories', require('./subCategoryRoutes'));
router.use('/payment-providers', require('./paymentProviderRoutes'));
router.use('/payment-methods', require('./paymentMethodRoutes'));
router.use('/countries', require('./countryRoutes'));
router.use("/expenses", require('./expenseRoutes'));
router.use('/earnings', require('./earningRoutes'));
router.use('/budgets', require('./budgetRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));

// Health check
router.get('/health', (req, res) =>
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() })
);

module.exports = router;
