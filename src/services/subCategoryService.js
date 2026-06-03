const SubCategory = require('../models/subCategory');
const { getCategoryById } = require('./categoryService');

const visibleForUser = (userId) => ({
  isDeleted: false,
  isActive: true,
  $or: [{ isSystem: true }, { createdBy: userId }],
});

const getAllSubCategories = async (userId, categoryId) => {
  const filter = visibleForUser(userId);
  if (categoryId) filter.category = categoryId;
  return SubCategory.find(filter).populate('category').sort({ isSystem: -1, name: 1 });
};

const getSubCategoryById = async (subCategoryId, userId) => {
  const subCategory = await SubCategory.findOne({ _id: subCategoryId, ...visibleForUser(userId) }).populate('category');
  if (!subCategory) throw Object.assign(new Error('Sub category not found'), { statusCode: 404 });
  return subCategory;
};

const createSubCategory = async ({ name, category, color, icon }, userId) => {
  await getCategoryById(category, userId);
  return SubCategory.create({ name, category, color, icon, createdBy: userId });
};

const updateSubCategory = async (subCategoryId, updates, userId) => {
  if (updates.category) await getCategoryById(updates.category, userId);
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: subCategoryId, createdBy: userId, isSystem: false, isDeleted: false },
    { ...updates, updatedBy: userId },
    { new: true, runValidators: true }
  );
  if (!subCategory) throw Object.assign(new Error('Sub category not found'), { statusCode: 404 });
  return subCategory;
};

module.exports = { getAllSubCategories, getSubCategoryById, createSubCategory, updateSubCategory };
