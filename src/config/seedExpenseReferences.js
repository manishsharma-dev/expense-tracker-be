const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

const commonCategories = [
  {
    name: 'Food & Dining',
    icon: 'restaurant',
    color: 'orange',
    subCategories: ['Groceries', 'Restaurants', 'Coffee'],
  },
  {
    name: 'Transport',
    icon: 'directions_car',
    color: 'teal',
    subCategories: ['Fuel', 'Taxi', 'Public Transport'],
  },
  {
    name: 'Housing',
    icon: 'home',
    color: 'amber',
    subCategories: ['Rent', 'Maintenance'],
  },
  {
    name: 'Utilities',
    icon: 'bolt',
    color: 'yellow',
    subCategories: ['Electricity', 'Internet', 'Phone'],
  },
  {
    name: 'Health',
    icon: 'favorite',
    color: 'pink',
    subCategories: ['Medicine', 'Gym', 'Doctor'],
  },
  {
    name: 'Shopping',
    icon: 'shopping_bag',
    color: 'green',
    subCategories: ['Clothing', 'Online Orders'],
  },
  {
    name: 'Entertainment',
    icon: 'movie',
    color: 'purple',
    subCategories: ['Subscriptions', 'Movies'],
  },
  {
    name: 'Travel',
    icon: 'flight',
    color: 'blue',
    subCategories: ['Flights', 'Hotels'],
  },
  {
    name: 'Other',
    icon: 'category',
    color: 'neutral',
    subCategories: [],
  },
];

const seedExpenseReferences = async () => {
  for (const item of commonCategories) {
    const category = await Category.findOneAndUpdate(
      { name: item.name, isSystem: true },
      {
        name: item.name,
        icon: item.icon,
        color: item.color,
        isSystem: true,
        isActive: true,
        isDeleted: false,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    for (const subCategoryName of item.subCategories) {
      await SubCategory.findOneAndUpdate(
        { name: subCategoryName, category: category._id, isSystem: true },
        {
          name: subCategoryName,
          category: category._id,
          icon: 'label',
          color: item.color,
          isSystem: true,
          isActive: true,
          isDeleted: false,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
  }
};

module.exports = seedExpenseReferences;
