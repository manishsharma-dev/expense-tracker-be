const Expense = require('../models/expense');
const Budget = require('../models/budget');
const Earning = require('../models/earning');

const monthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

const normalizeMonth = (month) => {
  if (!month) return monthKey(new Date());
  if (!/^\d{4}-\d{2}$/.test(month)) {
    throw Object.assign(new Error('Month must be in YYYY-MM format'), { statusCode: 400 });
  }
  return month;
};

const getMonthRange = (month) => {
  const [year, monthIndex] = month.split('-').map(Number);
  const start = new Date(year, monthIndex - 1, 1);
  const end = new Date(year, monthIndex, 1);
  return { start, end };
};

const getMonthLabel = (month) => {
  const [year, monthIndex] = month.split('-').map(Number);
  return new Date(year, monthIndex - 1, 1).toLocaleString('en-US', { month: 'short' });
};

const getMonthDisplay = (month) => {
  const [year, monthIndex] = month.split('-').map(Number);
  return new Date(year, monthIndex - 1, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
};

const getRecentMonths = (month, count = 6) => {
  const [year, monthIndex] = month.split('-').map(Number);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(year, monthIndex - count + index, 1);
    return monthKey(date);
  });
};

const getChangePercent = (current, previous) => {
  if (!previous && !current) return 0;
  if (!previous) return 100;
  return Math.round(((current - previous) / previous) * 100);
};

const getToneFromColor = (color) => {
  const tones = {
    purple: 'purple',
    teal: 'teal',
    blue: 'teal',
    orange: 'orange',
    amber: 'orange',
    yellow: 'orange',
    green: 'green',
    neutral: 'gray',
  };
  return tones[color] ?? 'gray';
};

const getDashboardData = async (user, options = {}) => {
  const month = normalizeMonth(options.month);
  const { start, end } = getMonthRange(month);
  const previousMonthDate = new Date(start.getFullYear(), start.getMonth() - 1, 1);
  const previousMonth = monthKey(previousMonthDate);
  const previousRange = getMonthRange(previousMonth);
  const recentMonths = getRecentMonths(month);
  const sixMonthRange = getMonthRange(recentMonths[0]);

  const [currentExpenses, currentEarnings, previousExpenses, sixMonthExpenses, recentExpenses, budget] = await Promise.all([
    Expense.find({ createdBy: user._id, date: { $gte: start, $lt: end } }).populate('category'),
    Earning.find({ createdBy: user._id, date: { $gte: start, $lt: end } }).populate('category'),
    Expense.find({ createdBy: user._id, date: { $gte: previousRange.start, $lt: previousRange.end } }),
    Expense.find({ createdBy: user._id, date: { $gte: sixMonthRange.start, $lt: end } }),
    Expense.find({ createdBy: user._id })
      .populate('category')
      .sort({ date: -1, _id: -1 })
      .limit(5),
    Budget.findOne({ createdBy: user._id, month, isDeleted: false, isActive: true }),
  ]);

  const totalSpent = currentExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalEarned = currentEarnings.reduce((sum, earning) => sum + earning.amount, 0);
  const previousSpent = previousExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const spentChangePercent = getChangePercent(totalSpent, previousSpent);
  const totalBudget = budget?.totalAmount ?? 0;
  const budgetRemaining = totalBudget ? totalBudget - totalSpent : 0;
  const largestExpense = currentExpenses.reduce((largest, expense) =>
    !largest || expense.amount > largest.amount ? expense : largest, null);

  const monthlySpendByMonth = new Map(recentMonths.map((item) => [item, 0]));
  sixMonthExpenses.forEach((expense) => {
    const key = monthKey(expense.date);
    if (monthlySpendByMonth.has(key)) {
      monthlySpendByMonth.set(key, monthlySpendByMonth.get(key) + expense.amount);
    }
  });

  const categorySpendById = new Map();
  currentExpenses.forEach((expense) => {
    const category = expense.category;
    const key = `${category?._id ?? 'other'}`;
    const current = categorySpendById.get(key) ?? {
      id: key,
      name: category?.name ?? 'Other',
      icon: category?.icon ?? 'receipt_long',
      color: category?.color ?? 'neutral',
      amount: 0,
    };
    current.amount += expense.amount;
    categorySpendById.set(key, current);
  });

  const categorySpend = [...categorySpendById.values()]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6);

  return {
    user: {
      name: user.name || user.email?.split('@')[0] || user.phone || 'there',
    },
    month,
    monthLabel: getMonthDisplay(month),
    currencyCode: user.country?.currency?.code || 'INR',
    summary: {
      totalSpent,
      totalEarned,
      netAmount: totalEarned - totalSpent,
      spentMoreThanEarned: totalSpent > totalEarned,
      spentChangePercent,
      totalBudget,
      budgetRemaining,
      transactionCount: currentExpenses.length,
      largestExpense: largestExpense ? {
        amount: largestExpense.amount,
        description: largestExpense.description,
        date: largestExpense.date,
      } : null,
    },
    monthlySpend: recentMonths.map((item) => ({
      month: getMonthLabel(item),
      value: monthlySpendByMonth.get(item) ?? 0,
    })),
    categorySpend: categorySpend.map((category) => ({
      id: category.id,
      name: category.name,
      amount: category.amount,
      value: category.amount,
      color: category.color,
      icon: category.icon,
    })),
    recentTransactions: recentExpenses.map((expense) => ({
      id: expense._id,
      date: expense.date,
      description: expense.description,
      category: expense.category?.name ?? 'Uncategorized',
      amount: expense.amount,
      status: 'Completed',
      icon: expense.category?.icon ?? 'receipt_long',
      color: getToneFromColor(expense.category?.color),
    })),
  };
};

module.exports = {
  getDashboardData,
};
