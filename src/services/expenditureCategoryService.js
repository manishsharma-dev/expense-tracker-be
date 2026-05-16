const ExpenditureCategory = require('../models/expenditureCategory');

const getAllCategories = async () => {
  return await ExpenditureCategory.find({ isDeleted: false , isActive: true }).sort({ createdAt: -1 });
};

const getCategoryById = async (categoryId) => {
  const category = await ExpenditureCategory.findById(categoryId);
  if (!category) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
  return category;
}

const createCategory = async (createdBy,{ name, color, icon }) => {
  const category = await ExpenditureCategory.create({ name, color, icon, createdBy });
  return category;
}

const updateCategory = async (categoryId, updates) => {
  const category = await ExpenditureCategory.findByIdAndUpdate(categoryId, updates, {
    new: true,
    runValidators: true,
    });
    if (!category) throw Object.assign(new Error('Category not found'), { statusCode: 404 });
    return category;    
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory };