const PaymentMethod = require('../models/paymentMethod');
const PaymentProvider = require('../models/paymentProvider');

const getAllPaymentMethods = async (userId) =>
  PaymentMethod.find({ createdBy: userId, isDeleted: false, isActive: true })
    .populate('provider')
    .sort({ sequence: 1, name: 1 });

const getPaymentMethodById = async (paymentMethodId, userId) => {
  const paymentMethod = await PaymentMethod.findOne({
    _id: paymentMethodId,
    createdBy: userId,
    isDeleted: false,
    isActive: true,
  });
  if (!paymentMethod) throw Object.assign(new Error('Payment method not found'), { statusCode: 404 });
  return paymentMethod.populate('provider');
};

const getProvider = async (providerId) => {
  if (!providerId) return null;
  const provider = await PaymentProvider.findOne({ _id: providerId, isActive: true });
  if (!provider) throw Object.assign(new Error('Payment provider not found'), { statusCode: 400 });
  return provider;
};

const buildPaymentMethodPayload = async ({ provider, name, type, nickname, lastFour, upiId, icon }) => {
  const paymentProvider = await getProvider(provider);
  const displayName = name?.trim() || nickname?.trim() || paymentProvider?.name;

  return {
    provider: paymentProvider?._id,
    name: displayName,
    type,
    nickname,
    lastFour,
    upiId,
    icon: icon || paymentProvider?.icon || 'payments',
  };
};

const createPaymentMethod = async (payload, userId) => {
  const latestPaymentMethod = await PaymentMethod.findOne({ createdBy: userId, isDeleted: false })
    .sort({ sequence: -1 })
    .select('sequence');

  const paymentMethod = await PaymentMethod.create({
    ...(await buildPaymentMethodPayload(payload)),
    sequence: (latestPaymentMethod?.sequence ?? 0) + 1,
    createdBy: userId,
  });

  return paymentMethod.populate('provider');
};

const updatePaymentMethod = async (paymentMethodId, updates, userId) => {
  const payload = await buildPaymentMethodPayload(updates);
  const paymentMethod = await PaymentMethod.findOneAndUpdate(
    { _id: paymentMethodId, createdBy: userId, isDeleted: false },
    { ...payload, updatedBy: userId },
    { new: true, runValidators: true }
  ).populate('provider');
  if (!paymentMethod) throw Object.assign(new Error('Payment method not found'), { statusCode: 404 });
  return paymentMethod;
};

const updatePaymentMethodSequence = async (items, userId) => {
  if (!Array.isArray(items) || !items.length) {
    throw Object.assign(new Error('Payment method sequence is required'), { statusCode: 400 });
  }

  const operations = items.map((item, index) => {
    if (!item?.id) {
      throw Object.assign(new Error('Payment method id is required'), { statusCode: 400 });
    }

    return {
      updateOne: {
        filter: { _id: item.id, createdBy: userId, isDeleted: false },
        update: {
          sequence: Number.isFinite(Number(item.sequence)) ? Number(item.sequence) : index + 1,
          updatedBy: userId,
        },
      },
    };
  });

  await PaymentMethod.bulkWrite(operations);
  return getAllPaymentMethods(userId);
};

const deletePaymentMethod = async (paymentMethodId, userId) => {
  const paymentMethod = await PaymentMethod.findOneAndUpdate(
    { _id: paymentMethodId, createdBy: userId, isDeleted: false },
    { isDeleted: true, isActive: false, updatedBy: userId },
    { new: true }
  );
  if (!paymentMethod) throw Object.assign(new Error('Payment method not found'), { statusCode: 404 });
  return paymentMethod;
};

module.exports = {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  updatePaymentMethodSequence,
  deletePaymentMethod,
};
