const PaymentProvider = require('../models/paymentProvider');

const defaultProviders = [
  { code: 'cash', name: 'Cash', type: 'cash', icon: 'payments' },
  { code: 'hdfc_bank', name: 'HDFC Bank', type: 'bank', icon: 'account_balance' },
  { code: 'icici_bank', name: 'ICICI Bank', type: 'bank', icon: 'account_balance' },
  { code: 'sbi', name: 'State Bank of India', type: 'bank', icon: 'account_balance' },
  { code: 'axis_bank', name: 'Axis Bank', type: 'bank', icon: 'account_balance' },
  { code: 'kotak_bank', name: 'Kotak Mahindra Bank', type: 'bank', icon: 'account_balance' },
  { code: 'yes_bank', name: 'Yes Bank', type: 'bank', icon: 'account_balance' },
  { code: 'idfc_first_bank', name: 'IDFC First Bank', type: 'bank', icon: 'account_balance' },
  { code: 'indusind_bank', name: 'IndusInd Bank', type: 'bank', icon: 'account_balance' },
  { code: 'bank_of_baroda', name: 'Bank of Baroda', type: 'bank', icon: 'account_balance' },
  { code: 'pnb', name: 'Punjab National Bank', type: 'bank', icon: 'account_balance' },
  { code: 'canara_bank', name: 'Canara Bank', type: 'bank', icon: 'account_balance' },
  { code: 'union_bank', name: 'Union Bank of India', type: 'bank', icon: 'account_balance' },
  { code: 'google_pay', name: 'Google Pay', type: 'upi_app', icon: 'qr_code_2' },
  { code: 'phonepe', name: 'PhonePe', type: 'upi_app', icon: 'qr_code_2' },
  { code: 'paytm', name: 'Paytm', type: 'wallet', icon: 'account_balance_wallet' },
  { code: 'amazon_pay', name: 'Amazon Pay', type: 'wallet', icon: 'account_balance_wallet' },
];

const ensureDefaultProviders = async () => {
  await PaymentProvider.bulkWrite(
    defaultProviders.map((provider) => ({
      updateOne: {
        filter: { code: provider.code },
        update: { $setOnInsert: provider },
        upsert: true,
      },
    })),
    { ordered: false }
  );
};

const getPaymentProviders = async () => {
  await ensureDefaultProviders();
  return PaymentProvider.find({ isActive: true }).sort({ type: 1, name: 1 });
};

module.exports = { getPaymentProviders };
