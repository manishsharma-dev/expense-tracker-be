const Expense = require('../models/expense');

const getAllExpenses = async (userId) => {
  return await Expense.find({ user: userId }).sort({ date: -1 });
}; 

const getExpenseByFilter = async (filter, userId) => {
  return await Expense.find({ ...filter, user: userId }).sort({ date: -1 });
}

const getExpenseById = async (expenseId, userId) => {
  const expense = await Expense.findOne({ _id: expenseId, user: userId });
  if (!expense) throw Object.assign(new Error('Expense not found'), { statusCode: 404 });
  return expense;
}

const createExpense = async ({ amount, date, category, source, country, description }, createdBy) => {
  const expense = await Expense.create({ amount, date, category, source, country, description, createdBy });
  return expense;
}

const updateExpense = async (expenseId, updates, createdBy) => {
  const expense = await Expense.findOneAndUpdate({ _id: expenseId, createdBy }, updates, {
    new: true,
    runValidators: true,
    });
    if (!expense) throw Object.assign(new Error('Expense not found'), { statusCode: 404 });
    return expense;
};

module.exports = { getAllExpenses,getExpenseByFilter, getExpenseById, createExpense, updateExpense };

