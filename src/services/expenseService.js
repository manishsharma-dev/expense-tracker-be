const Expense = require('../models/expense');
const { getCategoryById } = require('./categoryService');
const { getSubCategoryById } = require('./subCategoryService');
const { getPaymentMethodById } = require('./paymentMethodService');
const { syncExpenseDebtOnCreate, syncExpenseDebtOnUpdate } = require('./debtService');

const allowedSortFields = new Set(['date', 'amount', 'description', 'createdAt', 'updatedAt']);

const getAllExpenses = async (userId, options = {}) => {
  const page = Math.max(Number(options.page) || 1, 1);
  const limit = Math.min(Math.max(Number(options.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;
  const sortBy = allowedSortFields.has(options.sortBy) ? options.sortBy : 'date';
  const sortOrder = options.sortOrder === 'asc' ? 1 : -1;

  const query = { createdBy: userId };
  if (options.category) query.category = options.category;
  if (options.subCategory) query.subCategory = options.subCategory;
  if (options.paymentMethod) query.paymentMethod = options.paymentMethod;
  if (options.country) query.country = options.country;
  if (options.search?.trim()) {
    const search = new RegExp(options.search.trim(), 'i');
    query.$or = [{ description: search }, { notes: search }];
  }

  const [expenses, total] = await Promise.all([
    Expense.find(query)
      .populate('category subCategory paymentMethod country')
      .sort({ [sortBy]: sortOrder, _id: -1 })
      .skip(skip)
      .limit(limit),
    Expense.countDocuments(query),
  ]);

  return {
    expenses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getExpenseByFilter = async (filter, userId) => {
  return await Expense.find({ ...filter, createdBy: userId })
    .populate('category subCategory paymentMethod country')
    .sort({ date: -1 });
}

const getExpenseById = async (expenseId, userId) => {
  const expense = await Expense.findOne({ _id: expenseId, createdBy: userId })
    .populate('category subCategory paymentMethod country');
  if (!expense) throw Object.assign(new Error('Expense not found'), { statusCode: 404 });
  return expense;
}

const validateReferences = async ({ category, subCategory, paymentMethod }, userId) => {
  await getCategoryById(category, userId);
  await getPaymentMethodById(paymentMethod, userId);
  if (subCategory) {
    const existingSubCategory = await getSubCategoryById(subCategory, userId);
    if (`${existingSubCategory.category._id ?? existingSubCategory.category}` !== `${category}`) {
      throw Object.assign(new Error('Sub category does not belong to selected category'), { statusCode: 400 });
    }
  }
};

const createExpense = async (payload, createdBy, receipt) => {
  await validateReferences(payload, createdBy);
  const expense = await Expense.create({ ...payload, receipt, createdBy });
  await syncExpenseDebtOnCreate(expense, createdBy);
  return getExpenseById(expense._id, createdBy);
}

const updateExpense = async (expenseId, updates, createdBy) => {
  const currentExpense = await getExpenseById(expenseId, createdBy);
  const nextPayload = {
    category: updates.category ?? currentExpense.category._id,
    subCategory: updates.subCategory ?? currentExpense.subCategory?._id,
    paymentMethod: updates.paymentMethod ?? currentExpense.paymentMethod._id,
  };
  await validateReferences(nextPayload, createdBy);

  const expense = await Expense.findOneAndUpdate({ _id: expenseId, createdBy }, updates, {
    new: true,
    runValidators: true,
  }).populate('category subCategory paymentMethod country');
    if (!expense) throw Object.assign(new Error('Expense not found'), { statusCode: 404 });
    await syncExpenseDebtOnUpdate(expense, createdBy);
    return expense;
};

module.exports = { getAllExpenses,getExpenseByFilter, getExpenseById, createExpense, updateExpense };

