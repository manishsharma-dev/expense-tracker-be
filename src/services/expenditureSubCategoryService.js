const expenditureSubCategory = require('../models/expenditureSubCategory');
 
const getAllSubCategories = async () => {
  return await expenditureSubCategory.find({ isDeleted: false , isActive: true }).sort({ createdAt: -1 });
};

const getSubCategoryById = async ( subCategoryId) => {
  const subCategory = await expenditureSubCategory.findById(subCategoryId);
  if (!subCategory) throw Object.assign(new Error('Sub Category not found'), { statusCode: 404 });
  return subCategory;
}

const getSubCategoriesByCategoryId = async ( categoryId) => {
  return await expenditureSubCategory.find({ category: categoryId, isDeleted: false , isActive: true }).sort({ createdAt: -1 });
}

const createSubCategory = async ( { name, category, color, icon }) => {
  const subCategory = await expenditureSubCategory.create({ name, category, color, icon });
  return subCategory;
}

const updateSubCategory = async ( subCategoryId, updates) => {
  const subCategory = await expenditureSubCategory.findByIdAndUpdate(subCategoryId, updates, {
    new: true,
    runValidators: true,
    });
    if (!subCategory) throw Object.assign(new Error('Sub Category not found'), { statusCode: 404 });
    return subCategory;    
};

module.exports = { getAllSubCategories, getSubCategoryById, getSubCategoriesByCategoryId, createSubCategory, updateSubCategory };