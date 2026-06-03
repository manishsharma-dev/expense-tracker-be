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

const createCategory = async ({ name, color, icon }, userId) =>
  Category.create({ name, color, icon, createdBy: userId });

const updateCategory = async (categoryId, updates, userId) => {
  const category = await Category.findOneAndUpdate(
    { _id: categoryId, createdBy: userId, isSystem: false, isDeleted: false },
    { ...updates, updatedBy: userId },
    { new: true, runValidators: true }
  );
  if (!category) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
  return category;
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory };
