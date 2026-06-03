const Expense = require('../models/expense');
const { getCategoryById } = require('./categoryService');
const { getSubCategoryById } = require('./subCategoryService');
const { getPaymentMethodById } = require('./paymentMethodService');

const getAllExpenses = async (userId) => {
  return await Expense.find({ createdBy: userId })
    .populate('category subCategory paymentMethod country')
    .sort({ date: -1 });
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
    return expense;
};

module.exports = { getAllExpenses,getExpenseByFilter, getExpenseById, createExpense, updateExpense };

