const Category = require('../models/category');

const visibleForUser = (userId) => ({
  isDeleted: false,
  isActive: true,
  $or: [{ isSystem: true }, { createdBy: userId }],
});

const getAllCategories = async (userId) =>
  Category.find(visibleForUser(userId)).sort({ isSystem: -1, name: 1 });

const getCategoryById = async (categoryId, userId) => {
  const category = await Category.findOne({ _id: categoryId, ...visibleForUser(userId) });
  if (!category) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
  return category;
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ensureUniqueCategoryName = async (name, userId, excludeId) => {
  const query = {
    ...visibleForUser(userId),
    name: new RegExp(`^${escapeRegex(name.trim())}$`, 'i'),
  };
  if (excludeId) query._id = { $ne: excludeId };

  const existingCategory = await Category.findOne(query);
  if (existingCategory) {
    throw Object.assign(new Error('Category name already exists'), { statusCode: 409 });
  }
};

const createCategory = async ({ name, color, icon }, userId) => {
  await ensureUniqueCategoryName(name, userId);
  return Category.create({ name: name.trim(), color, icon, createdBy: userId });
};

const updateCategory = async (categoryId, updates, userId) => {
  if (updates.name) await ensureUniqueCategoryName(updates.name, userId, categoryId);
  const category = await Category.findOneAndUpdate(
    { _id: categoryId, createdBy: userId, isSystem: false, isDeleted: false },
    { ...updates, updatedBy: userId },
    { new: true, runValidators: true }
  );
  if (!category) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
  return category;
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory };
