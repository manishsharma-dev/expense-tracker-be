const Budget = require('../models/budget');
const { getCategoryById } = require('./categoryService');

const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

const normalizeMonth = (month) => {
  if (!month) return getCurrentMonth();
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

const getBudget = async (userId, month) => {
  const budgetMonth = normalizeMonth(month);
  return Budget.findOne({
    month: budgetMonth,
    createdBy: userId,
    isDeleted: false,
    isActive: true,
  }).populate('allocations.category');
};

const upsertBudget = async ({ month, totalAmount, allocations }, userId) => {
  const budgetMonth = normalizeMonth(month);
  const normalizedTotalAmount = normalizeAmount(totalAmount, 'Total budget');
  const normalizedAllocations = await normalizeAllocations(allocations, userId);
  validateBudgetLimit(normalizedTotalAmount, normalizedAllocations);

  return Budget.findOneAndUpdate(
    { month: budgetMonth, createdBy: userId, isDeleted: false },
    {
      month: budgetMonth,
      totalAmount: normalizedTotalAmount,
      allocations: normalizedAllocations,
      createdBy: userId,
      updatedBy: userId,
      isActive: true,
      isDeleted: false,
    },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  ).populate('allocations.category');
};

module.exports = {
  getBudget,
  upsertBudget,
};
