const Budget = require('../models/budget');
const Expense = require('../models/expense');
const { getCategoryById } = require('./categoryService');
const { getMonthKey, getMonthRange, getUserTimeZone } = require('../utils/dateUtils');

const getCurrentMonth = (timeZone) => getMonthKey(new Date(), timeZone);

const normalizeMonth = (month, timeZone) => {
  if (!month) return getCurrentMonth(timeZone);
  if (!/^\d{4}-\d{2}$/.test(month)) {
    throw Object.assign(new Error('Month must be in YYYY-MM format'), { statusCode: 400 });
  }
  return month;
};

const normalizeAmount = (value, label) => {
  const amount = Number(value ?? 0);
  if (!Number.isFinite(amount) || amount < 0) {
    throw Object.assign(new Error(`${label} must be a positive number`), { statusCode: 400 });
  }
  return amount;
};

const normalizeAllocations = async (allocations = [], userId) => {
  if (!Array.isArray(allocations)) {
    throw Object.assign(new Error('Budget allocations must be an array'), { statusCode: 400 });
  }

  const seenCategories = new Set();
  const normalizedAllocations = [];

  for (const allocation of allocations) {
    const categoryId = allocation?.category;
    const amount = normalizeAmount(allocation?.amount, 'Category budget');

    if (!categoryId || amount <= 0) continue;
    if (seenCategories.has(`${categoryId}`)) {
      throw Object.assign(new Error('Each category can only be added once'), { statusCode: 400 });
    }

    await getCategoryById(categoryId, userId);
    seenCategories.add(`${categoryId}`);
    normalizedAllocations.push({ category: categoryId, amount });
  }

  return normalizedAllocations;
};

const validateBudgetLimit = (totalAmount, allocations) => {
  const allocatedAmount = allocations.reduce((sum, allocation) => sum + allocation.amount, 0);
  if (totalAmount > 0 && allocatedAmount > totalAmount) {
    throw Object.assign(new Error('Category budgets cannot exceed total budget'), { statusCode: 400 });
  }
};

const attachAllocationUsage = async (budget, user) => {
  if (!budget) return null;

  const timeZone = getUserTimeZone(user);
  const { start, end } = getMonthRange(budget.month, timeZone);
  const categorySpend = await Expense.aggregate([
    {
      $match: {
        createdBy: user._id,
        date: { $gte: start, $lt: end },
      },
    },
    {
      $group: {
        _id: '$category',
        used: { $sum: '$amount' },
      },
    },
  ]);
  const usedByCategory = new Map(categorySpend.map((item) => [`${item._id}`, item.used]));
  const budgetObject = budget.toObject();

  budgetObject.allocations = budgetObject.allocations.map((allocation) => {
    const used = usedByCategory.get(`${allocation.category?._id ?? allocation.category}`) ?? 0;
    const remaining = allocation.amount - used;
    const utilizationPercent = allocation.amount > 0 ? Math.round((used / allocation.amount) * 100) : 0;

    return {
      ...allocation,
      used,
      remaining,
      utilizationPercent,
      isOverBudget: used > allocation.amount,
    };
  });

  return budgetObject;
};

const getBudget = async (user, month) => {
  const budgetMonth = normalizeMonth(month, getUserTimeZone(user));
  const budget = await Budget.findOne({
    month: budgetMonth,
    createdBy: user._id,
    isDeleted: false,
    isActive: true,
  }).populate('allocations.category');

  return attachAllocationUsage(budget, user);
};

const upsertBudget = async ({ month, totalAmount, allocations }, user) => {
  const budgetMonth = normalizeMonth(month, getUserTimeZone(user));
  const normalizedTotalAmount = normalizeAmount(totalAmount, 'Total budget');
  const normalizedAllocations = await normalizeAllocations(allocations, user._id);
  validateBudgetLimit(normalizedTotalAmount, normalizedAllocations);

  const budget = await Budget.findOneAndUpdate(
    { month: budgetMonth, createdBy: user._id, isDeleted: false },
    {
      month: budgetMonth,
      totalAmount: normalizedTotalAmount,
      allocations: normalizedAllocations,
      createdBy: user._id,
      updatedBy: user._id,
      isActive: true,
      isDeleted: false,
    },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  ).populate('allocations.category');

  return attachAllocationUsage(budget, user);
};

module.exports = {
  getBudget,
  upsertBudget,
};
