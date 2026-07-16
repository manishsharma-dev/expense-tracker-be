const router = require('express').Router();
const { getLiveness, getReadiness } = require('../services/healthService');

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));

//protected routes
router.use('/categories', require('./categoryRoutes'));
router.use('/sub-categories', require('./subCategoryRoutes'));
router.use('/payment-providers', require('./paymentProviderRoutes'));
router.use('/payment-methods', require('./paymentMethodRoutes'));
router.use('/countries', require('./countryRoutes'));
router.use("/expenses", require('./expenseRoutes'));
router.use('/merchant-rules', require('./merchantRuleRoutes'));
router.use('/earnings', require('./earningRoutes'));
router.use('/budgets', require('./budgetRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));
router.use('/debts', require('./debtRoutes'));

// Liveness is intentionally cheap for platform checks. Readiness performs
// dependency diagnostics for DB/Redis/email/S3 troubleshooting.
router.get('/health', (_req, res) => res.json(getLiveness()));

router.get('/health/readiness', async (_req, res, next) => {
  try {
    const report = await getReadiness();
    res.status(report.status === 'down' ? 503 : 200).json(report);
  } catch (error) {
    next(error);
  }
});

router.get('/health/deep', async (_req, res, next) => {
  try {
    const report = await getReadiness();
    res.status(report.status === 'down' ? 503 : 200).json(report);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
