const PaymentMethod = require('../models/paymentMethod');

const getAllPaymentMethods = async (userId) =>
  PaymentMethod.find({ createdBy: userId, isDeleted: false, isActive: true }).sort({ name: 1 });

const getPaymentMethodById = async (paymentMethodId, userId) => {
  const paymentMethod = await PaymentMethod.findOne({
    _id: paymentMethodId,
    createdBy: userId,
    isDeleted: false,
    isActive: true,
  });
  if (!paymentMethod) throw Object.assign(new Error('Payment method not found'), { statusCode: 404 });
  return paymentMethod;
};

const createPaymentMethod = async ({ name, type, lastFour, icon }, userId) =>
  PaymentMethod.create({ name, type, lastFour, icon, createdBy: userId });

const updatePaymentMethod = async (paymentMethodId, updates, userId) => {
  const paymentMethod = await PaymentMethod.findOneAndUpdate(
    { _id: paymentMethodId, createdBy: userId, isDeleted: false },
    { ...updates, updatedBy: userId },
    { new: true, runValidators: true }
  );
  if (!paymentMethod) throw Object.assign(new Error('Payment method not found'), { statusCode: 404 });
  return paymentMethod;
};

module.exports = { getAllPaymentMethods, getPaymentMethodById, createPaymentMethod, updatePaymentMethod };
