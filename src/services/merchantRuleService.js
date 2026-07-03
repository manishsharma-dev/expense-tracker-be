const MerchantRule = require('../models/merchantRule');
const logger = require('../utils/logger');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const normalizeMerchantText = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s&.-]/gu, ' ')
    .replace(/\b\d{1,2}[/-]\d{1,2}([/-]\d{2,4})?\b/g, ' ')
    .replace(/\b\d+([.,]\d+)?\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200);

const getMerchantName = (description = '') => {
  const cleaned = String(description).replace(/\s+/g, ' ').trim();
  return cleaned.slice(0, 200);
};

const upsertMerchantRuleFromExpense = async (expense, userId) => {
  const merchantName = getMerchantName(expense.description);
  const pattern = normalizeMerchantText(merchantName);

  if (!merchantName || !pattern || !expense.category || !expense.paymentMethod) return null;

  const category = expense.category._id ?? expense.category;
  const subCategory = expense.subCategory?._id ?? expense.subCategory ?? null;
  const paymentMethod = expense.paymentMethod._id ?? expense.paymentMethod;

  try {
    return await MerchantRule.findOneAndUpdate(
      { createdBy: userId, pattern, isDeleted: false },
      {
        $set: {
          merchantName,
          category,
          subCategory,
          paymentMethod,
          lastUsedAt: new Date(),
          updatedBy: userId,
        },
        $setOnInsert: {
          createdBy: userId,
        },
        $inc: { usageCount: 1 },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
  } catch (err) {
    logger.warn('Merchant rule upsert failed', {
      userId: String(userId),
      expenseId: String(expense._id),
      pattern,
      error: err.message,
    });
    return null;
  }
};

const getMerchantRuleSuggestions = async (userId, query) => {
  const pattern = normalizeMerchantText(query);
  if (!pattern || pattern.length < 2) return [];

  const search = new RegExp(escapeRegex(pattern), 'i');
  return MerchantRule.find({
    createdBy: userId,
    isDeleted: false,
    $or: [{ pattern: search }, { merchantName: search }],
  })
    .populate('category subCategory paymentMethod')
    .sort({ usageCount: -1, lastUsedAt: -1 })
    .limit(5)
    .lean();
};

module.exports = {
  getMerchantRuleSuggestions,
  normalizeMerchantText,
  upsertMerchantRuleFromExpense,
};
