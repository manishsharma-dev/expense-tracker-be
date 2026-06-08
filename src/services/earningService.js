const Earning = require('../models/earning');
const EarningCategory = require('../models/earningCategory');

const defaultCategories = [
  { name: 'Salary', color: 'green', icon: 'payments' },
  { name: 'Rental Income', color: 'teal', icon: 'home_work' },
  { name: 'Dividends', color: 'purple', icon: 'query_stats' },
  { name: 'Interest', color: 'blue', icon: 'account_balance' },
  { name: 'Freelance', color: 'orange', icon: 'work' },
  { name: 'Other', color: 'neutral', icon: 'add_circle' },
];

const visibleForUser = (userId) => ({
  isDeleted: false,
  isActive: true,
  $or: [{ isSystem: true }, { createdBy: userId }],
});

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const seedDefaultCategories = async () => {
  await EarningCategory.bulkWrite(defaultCategories.map((category) => ({
    updateOne: {
      filter: { name: category.name, isSystem: true },
      update: { $setOnInsert: { ...category, isSystem: true } },
      upsert: true,
    },
  })));
};

const getCategories = async (userId) => {
  await seedDefaultCategories();
  return EarningCategory.find(visibleForUser(userId)).sort({ isSystem: -1, name: 1 });
};

const getCategoryById = async (categoryId, userId) => {
  await seedDefaultCategories();
  const category = await EarningCategory.findOne({ _id: categoryId, ...visibleForUser(userId) });
  if (!category) throw Object.assign(new Error('Earning category not found'), { statusCode: 404 });
  return category;
};

const ensureUniqueCategoryName = async (name, userId) => {
  const existingCategory = await EarningCategory.findOne({
    ...visibleForUser(userId),
    name: new RegExp(`^${escapeRegex(name.trim())}$`, 'i'),
  });
  if (existingCategory) throw Object.assign(new Error('Earning category name already exists'), { statusCode: 409 });
};

const createCategory = async ({ name, color, icon }, userId) => {
  await ensureUniqueCategoryName(name, userId);
  return EarningCategory.create({ name: name.trim(), color, icon, createdBy: userId });
};

const getEarnings = async (userId, options = {}) => {
  const query = { createdBy: userId };
  if (options.category) query.category = options.category;
  if (options.startDate || options.endDate) {
    query.date = {};
    if (options.startDate) query.date.$gte = new Date(options.startDate);
    if (options.endDate) query.date.$lte = new Date(options.endDate);
  }

  return Earning.find(query).populate('category country').sort({ date: -1, _id: -1 });
};

const createEarning = async (payload, userId) => {
  await getCategoryById(payload.category, userId);
  return Earning.create({
    amount: Number(payload.amount),
    date: payload.date,
    category: payload.category,
    country: payload.country,
    description: payload.description,
    notes: payload.notes,
    createdBy: userId,
  }).then((earning) => earning.populate('category country'));
};

module.exports = {
  getCategories,
  createCategory,
  getEarnings,
  createEarning,
};
