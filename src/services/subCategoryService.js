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

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ensureUniqueSubCategoryName = async (name, category, userId, excludeId) => {
  const query = {
    ...visibleForUser(userId),
    category,
    name: new RegExp(`^${escapeRegex(name.trim())}$`, 'i'),
  };
  if (excludeId) query._id = { $ne: excludeId };

  const existingSubCategory = await SubCategory.findOne(query);
  if (existingSubCategory) {
    throw Object.assign(new Error('Sub category name already exists for this category'), { statusCode: 409 });
  }
};

const createSubCategory = async ({ name, category, color, icon }, userId) => {
  await getCategoryById(category, userId);
  await ensureUniqueSubCategoryName(name, category, userId);
  return SubCategory.create({ name: name.trim(), category, color, icon, createdBy: userId });
};

const updateSubCategory = async (subCategoryId, updates, userId) => {
  const currentSubCategory = await getSubCategoryById(subCategoryId, userId);
  const nextCategory = updates.category ?? currentSubCategory.category._id;
  if (updates.category) await getCategoryById(updates.category, userId);
  if (updates.name || updates.category) {
    await ensureUniqueSubCategoryName(updates.name ?? currentSubCategory.name, nextCategory, userId, subCategoryId);
  }
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: subCategoryId, createdBy: userId, isSystem: false, isDeleted: false },
    { ...updates, updatedBy: userId },
    { new: true, runValidators: true }
  );
  if (!subCategory) throw Object.assign(new Error('Sub category not found'), { statusCode: 404 });
  return subCategory;
};

module.exports = { getAllSubCategories, getSubCategoryById, createSubCategory, updateSubCategory };
