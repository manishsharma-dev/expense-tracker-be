const DebtAccount = require('../models/debtAccount');
const DebtTransaction = require('../models/debtTransaction');
const { getPaymentMethodById } = require('./paymentMethodService');
const { normalizeCalendarDate } = require('../utils/dateUtils');

const debtPopulate = 'paymentMethod country';
const transactionPopulate = 'paymentMethod sourceExpense';

const getDebtAccounts = async (userId) => {
  const accounts = await DebtAccount.find({ createdBy: userId, isDeleted: false })
    .populate(debtPopulate)
    .sort({ status: 1, currentBalance: -1, name: 1 });

  const totals = accounts.reduce((summary, account) => {
    if (account.status !== 'active') return summary;
    summary.totalDebt += account.currentBalance;
    if (account.type === 'credit_card') summary.creditCardDebt += account.currentBalance;
    return summary;
  }, { totalDebt: 0, creditCardDebt: 0 });

  return { accounts, summary: totals };
};

const getDebtAccountById = async (accountId, userId) => {
  const account = await DebtAccount.findOne({ _id: accountId, createdBy: userId, isDeleted: false })
    .populate(debtPopulate);
  if (!account) throw Object.assign(new Error('Debt account not found'), { statusCode: 404 });
  return account;
};

const getDebtTransactions = async (accountId, userId) => {
  await getDebtAccountById(accountId, userId);
  return DebtTransaction.find({ debtAccount: accountId, createdBy: userId })
    .populate(transactionPopulate)
    .sort({ date: -1, createdAt: -1 });
};

const ensurePaymentMethodCanLink = async (paymentMethodId, type, userId) => {
  if (!paymentMethodId) return undefined;
  const paymentMethod = await getPaymentMethodById(paymentMethodId, userId);
  if (type === 'credit_card' && paymentMethod.type !== 'credit_card') {
    throw Object.assign(new Error('Credit card debt must be linked to a credit card payment method'), { statusCode: 400 });
  }
  return paymentMethod._id;
};

const createDebtAccount = async (payload, userId) => {
  const paymentMethod = await ensurePaymentMethodCanLink(payload.paymentMethod, payload.type, userId);
  const openingBalance = Number(payload.openingBalance ?? 0);

  const account = await DebtAccount.create({
    name: payload.name?.trim(),
    type: payload.type,
    source: payload.source?.trim(),
    paymentMethod,
    country: payload.country || undefined,
    openingBalance,
    currentBalance: openingBalance,
    creditLimit: payload.creditLimit === undefined ? undefined : Number(payload.creditLimit),
    interestRate: payload.interestRate === undefined ? undefined : Number(payload.interestRate),
    emiAmount: payload.emiAmount === undefined ? undefined : Number(payload.emiAmount),
    dueDay: payload.dueDay === undefined ? undefined : Number(payload.dueDay),
    notes: payload.notes?.trim(),
    createdBy: userId,
  });

  if (openingBalance > 0) {
    await DebtTransaction.create({
      debtAccount: account._id,
      type: 'opening_balance',
      amount: openingBalance,
      direction: 'increase',
      date: new Date(),
      description: 'Opening balance',
      createdBy: userId,
    });
  }

  return getDebtAccountById(account._id, userId);
};

const updateDebtBalance = async (accountId, userId, amount, direction) => {
  const multiplier = direction === 'increase' ? 1 : -1;
  const account = await DebtAccount.findOneAndUpdate(
    { _id: accountId, createdBy: userId, isDeleted: false },
    { $inc: { currentBalance: multiplier * amount }, updatedBy: userId },
    { new: true, runValidators: true }
  );
  if (!account) throw Object.assign(new Error('Debt account not found'), { statusCode: 404 });
  if (account.currentBalance < 0) {
    account.currentBalance = 0;
    await account.save();
  }
  return account;
};

const recordDebtTransaction = async (accountId, payload, userId) => {
  await getDebtAccountById(accountId, userId);
  const type = payload.type || 'payment';
  const direction = payload.direction || (type === 'payment' ? 'decrease' : 'increase');
  const amount = Number(payload.amount);

  const transaction = await DebtTransaction.create({
    debtAccount: accountId,
    type,
    amount,
    direction,
    date: normalizeCalendarDate(payload.date) || new Date(),
    description: payload.description?.trim(),
    paymentMethod: payload.paymentMethod || undefined,
    createdBy: userId,
  });

  await updateDebtBalance(accountId, userId, amount, direction);
  return transaction.populate(transactionPopulate);
};

const toObjectId = (value) => value?._id ?? value;

const findLinkedCreditCardDebt = async (paymentMethodId, userId) => {
  const normalizedPaymentMethodId = toObjectId(paymentMethodId);
  if (!normalizedPaymentMethodId) return null;
  return DebtAccount.findOne({
    createdBy: userId,
    paymentMethod: normalizedPaymentMethodId,
    type: 'credit_card',
    status: 'active',
    isDeleted: false,
  });
};

const syncExpenseDebtOnCreate = async (expense, userId) => {
  const debtAccount = await findLinkedCreditCardDebt(expense.paymentMethod, userId);
  if (!debtAccount) return;

  await DebtTransaction.create({
    debtAccount: debtAccount._id,
    type: 'charge',
    amount: expense.amount,
    direction: 'increase',
    date: expense.date,
    description: expense.description,
    sourceExpense: expense._id,
    paymentMethod: toObjectId(expense.paymentMethod),
    createdBy: userId,
  });
  await updateDebtBalance(debtAccount._id, userId, expense.amount, 'increase');
};

const syncExpenseDebtOnUpdate = async (expense, userId) => {
  const existingTransaction = await DebtTransaction.findOne({ sourceExpense: expense._id, createdBy: userId });
  const debtAccount = await findLinkedCreditCardDebt(expense.paymentMethod, userId);

  if (!existingTransaction && debtAccount) {
    await syncExpenseDebtOnCreate(expense, userId);
    return;
  }

  if (existingTransaction && !debtAccount) {
    await updateDebtBalance(existingTransaction.debtAccount, userId, existingTransaction.amount, 'decrease');
    await existingTransaction.deleteOne();
    return;
  }

  if (!existingTransaction || !debtAccount) return;

  const oldSignedAmount = existingTransaction.direction === 'increase'
    ? existingTransaction.amount
    : -existingTransaction.amount;
  const nextSignedAmount = expense.amount;

  if (`${existingTransaction.debtAccount}` !== `${debtAccount._id}`) {
    await updateDebtBalance(existingTransaction.debtAccount, userId, existingTransaction.amount, 'decrease');
    await updateDebtBalance(debtAccount._id, userId, expense.amount, 'increase');
  } else {
    const delta = nextSignedAmount - oldSignedAmount;
    if (delta > 0) await updateDebtBalance(debtAccount._id, userId, delta, 'increase');
    if (delta < 0) await updateDebtBalance(debtAccount._id, userId, Math.abs(delta), 'decrease');
  }

  existingTransaction.debtAccount = debtAccount._id;
  existingTransaction.amount = expense.amount;
  existingTransaction.direction = 'increase';
  existingTransaction.date = expense.date;
  existingTransaction.description = expense.description;
  existingTransaction.paymentMethod = toObjectId(expense.paymentMethod);
  await existingTransaction.save();
};

module.exports = {
  createDebtAccount,
  getDebtAccounts,
  getDebtAccountById,
  getDebtTransactions,
  recordDebtTransaction,
  syncExpenseDebtOnCreate,
  syncExpenseDebtOnUpdate,
};
