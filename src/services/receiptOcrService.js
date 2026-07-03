const Tesseract = require('tesseract.js');
const { getAllPaymentMethods } = require('./paymentMethodService');

const moneyPattern = /(?:rs\.?|inr|usd|\$|\u20b9|\u00a5)?\s*((?:\d{1,3}(?:[, ]\d{3})+|\d+)(?:\.\d{1,2})?)/gi;

const normalizeText = (value = '') =>
  String(value)
    .replace(/\u00a5/g, '\u20b9')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const parseAmount = (text) => {
  const lines = normalizeText(text).split('\n').map((line) => line.trim()).filter(Boolean);

  const amountLabelIndex = lines.findIndex((line) => /^amount\b/i.test(line));
  if (amountLabelIndex >= 0) {
    for (const line of lines.slice(amountLabelIndex, amountLabelIndex + 3)) {
      const values = extractMoneyValues(line);
      if (values.length) return Math.max(...values);

      const wordsValue = parseAmountWords(line);
      if (wordsValue) return wordsValue;
    }
  }

  const wordsAmountLine = lines.find((line) => /\brupees?\b.+\bonly\b/i.test(line));
  const wordsAmount = parseAmountWords(wordsAmountLine);
  if (wordsAmount) return wordsAmount;

  const totalLinePatterns = [
    /\bgrand\s+total\b/i,
    /\btotal\s+amount\b/i,
    /\bamount\s+payable\b/i,
    /\bnet\s+amount\b/i,
    /\btotal\b/i,
  ];

  for (const pattern of totalLinePatterns) {
    const line = [...lines].reverse().find((item) => pattern.test(item) && extractMoneyValues(item).length);
    if (line) {
      const values = extractMoneyValues(line);
      if (values.length) return Math.max(...values);
    }
  }

  const amountContext = /\b(amount|total|payable)\b|[\u20b9$]/i;
  const ignoredAmountContext = /\b(utr|transaction\s+id|phonepe\s+transaction|upi\s+ref|at\s+\d{1,2}:\d{2}|date|time|mobile|phone|debited\s+from|paid\s+from|\bfrom\b|state\s+bank|bank\s+of|sbi)\b/i;
  const contextValues = lines
    .filter((line) => amountContext.test(line) && !ignoredAmountContext.test(line))
    .flatMap((line) => extractMoneyValues(line));
  if (contextValues.length) return Math.max(...contextValues);

  const allValues = extractMoneyValues(text).filter((value) => value < 1000000);
  return allValues.length ? Math.max(...allValues) : null;
};

const extractMoneyValues = (text = '') => {
  moneyPattern.lastIndex = 0;
  const values = [];
  let match;

  while ((match = moneyPattern.exec(text)) !== null) {
    const value = Number(match[1].replace(/[, ]/g, ''));
    if (Number.isFinite(value) && value > 0) values.push(value);
  }

  return values;
};

const parseAmountWords = (text = '') => {
  const normalized = String(text)
    .toLowerCase()
    .replace(/rupees?|rs\.?|inr|only|and/g, ' ')
    .replace(/[^a-z\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return null;

  const units = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
  };
  const tens = {
    twenty: 20,
    thirty: 30,
    forty: 40,
    fourty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };
  const multipliers = {
    hundred: 100,
    thousand: 1000,
    lakh: 100000,
    lac: 100000,
    million: 1000000,
  };

  let total = 0;
  let current = 0;
  let matched = false;

  for (const token of normalized.split(/\s+/)) {
    if (units[token] !== undefined) {
      current += units[token];
      matched = true;
    } else if (tens[token] !== undefined) {
      current += tens[token];
      matched = true;
    } else if (multipliers[token]) {
      current = Math.max(current, 1) * multipliers[token];
      if (multipliers[token] >= 1000) {
        total += current;
        current = 0;
      }
      matched = true;
    }
  }

  const value = total + current;
  return matched && value > 0 ? value : null;
};

const parseDate = (text) => {
  const normalized = normalizeText(text);
  const numericDate = normalized.match(/\b(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})\b/);
  if (numericDate) {
    const first = Number(numericDate[1]);
    const second = Number(numericDate[2]);
    const year = Number(numericDate[3].length === 2 ? `20${numericDate[3]}` : numericDate[3]);
    const day = first > 12 ? first : second > 12 ? second : first;
    const month = first > 12 ? second : second > 12 ? first : second;
    return formatDate(year, month, day);
  }

  const isoDate = normalized.match(/\b(20\d{2})[/-](\d{1,2})[/-](\d{1,2})\b/);
  if (isoDate) return formatDate(Number(isoDate[1]), Number(isoDate[2]), Number(isoDate[3]));

  const namedDate = normalized.match(/\b(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s+(20\d{2}|\d{2})\b/i);
  if (namedDate) {
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
      .indexOf(namedDate[2].toLowerCase().slice(0, 3)) + 1;
    const year = Number(namedDate[3].length === 2 ? `20${namedDate[3]}` : namedDate[3]);
    return formatDate(year, month, Number(namedDate[1]));
  }

  return null;
};

const formatDate = (year, month, day) => {
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const parseMerchant = (text) => {
  const lines = normalizeText(text)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

  const paidToIndex = lines.findIndex((item) => /\bpaid\s+to\b/i.test(item));
  if (paidToIndex >= 0) {
    const paidToLine = sanitizeMerchantLine(lines[paidToIndex].replace(/\bpaid\s+to\b/i, ''));
    if (paidToLine) return paidToLine;

    for (const line of lines.slice(paidToIndex + 1, paidToIndex + 4)) {
      const merchant = sanitizeMerchantLine(line);
      if (merchant) return merchant;
    }
  }

  const toIndex = lines.findIndex((item) => /^to$/i.test(item) || /\btransfer(?:s)?\s+to\b/i.test(item));
  if (toIndex >= 0) {
    for (const line of lines.slice(toIndex + 1, toIndex + 4)) {
      const merchant = sanitizeMerchantLine(line);
      if (merchant) return merchant;
    }
  }

  const bankingName = lines
    .map((item) => item.match(/\bbanking\s+name\s*:?\s*(.+)$/i)?.[1])
    .find(Boolean);
  if (bankingName) return sanitizeMerchantLine(bankingName);

  const ignored = /\b(invoice|receipt|tax|gst|date|time|cashier|bill|phone|mobile|email|total|amount|transaction|successful|payment|details|debited|utr|sent|share|help)\b/i;
  const line = lines
    .filter((item) => item.length >= 3 && item.length <= 80)
    .find((item) => !ignored.test(item) && /[a-z]/i.test(item));

  return sanitizeMerchantLine(line) || '';
};

const parsePaymentSourceText = (text) => {
  const lines = normalizeText(text)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
  const sourceIndex = lines.findIndex((line) => /\b(debited\s+from|paid\s+from|from)\b/i.test(line));

  if (sourceIndex < 0) return '';

  return lines
    .slice(sourceIndex, sourceIndex + 5)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const extractMaskedSuffixes = (text) => {
  const suffixes = new Set();
  const patterns = [
    /[xX*#]{2,}\s*(\d{2,4})\b/g,
    /-\s*(\d{2,4})\b/g,
    /\b(?:ending|ends|xx|x)\s*(?:with|in)?\s*(\d{2,4})\b/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      suffixes.add(match[1]);
    }
  }

  return [...suffixes];
};

const normalizeComparable = (value = '') =>
  String(value).toLowerCase().replace(/[^a-z0-9]/g, '');

const providerAliases = {
  sbi: ['sbi', 'statebankofindia', 'statebank', 'ptsbi', 'oksbi'],
  hdfc_bank: ['hdfc', 'hdfcbank', 'okhdfcbank'],
  icici_bank: ['icici', 'icicibank'],
  axis_bank: ['axis', 'axisbank', 'okaxis'],
  kotak_bank: ['kotak', 'kotakmahindra', 'kotakmahindrabank'],
  yes_bank: ['yesbank', 'yes'],
  idfc_first_bank: ['idfc', 'idfcfirst', 'idfcfirstbank'],
  indusind_bank: ['indusind', 'indusindbank'],
  bank_of_baroda: ['bob', 'bankofbaroda'],
  pnb: ['pnb', 'punjabnationalbank'],
  canara_bank: ['canara', 'canarabank'],
  union_bank: ['unionbank', 'unionbankofindia'],
  paytm: ['paytm'],
  phonepe: ['phonepe'],
  google_pay: ['googlepay', 'gpay'],
};

const getProviderAliasTokens = (method) => {
  const code = normalizeComparable(method.provider?.code);
  const name = normalizeComparable(method.provider?.name);
  const methodName = normalizeComparable(method.name);
  const nickname = normalizeComparable(method.nickname);

  return [
    code,
    name,
    methodName,
    nickname,
    ...(providerAliases[method.provider?.code] ?? []),
  ].filter((value) => value && value.length >= 3);
};

const extractUpiHandles = (text = '') => {
  const handles = new Set();
  const pattern = /\b[\w.-]+@[\w.-]+\b/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    handles.add(match[0].toLowerCase());
  }

  return [...handles];
};

const getUpiHandleTokens = (handles) =>
  handles.flatMap((handle) => {
    const [, suffix = ''] = handle.split('@');
    return [normalizeComparable(handle), normalizeComparable(suffix)];
  }).filter((value) => value && value.length >= 3);

const findPaymentMethodMatch = (scanText, paymentMethods = []) => {
  const sourceText = parsePaymentSourceText(scanText);
  const searchableText = normalizeComparable(scanText);
  const searchableSourceText = normalizeComparable(sourceText || scanText);
  const maskedSuffixes = extractMaskedSuffixes(sourceText || scanText);
  const upiHandles = extractUpiHandles(sourceText || scanText);
  const upiHandleTokens = getUpiHandleTokens(upiHandles);
  let bestMatch = null;

  for (const method of paymentMethods) {
    const candidates = [];

    if (method.upiId) {
      const normalizedUpiId = normalizeComparable(method.upiId);
      candidates.push({
        matched: searchableText.includes(normalizedUpiId),
        score: 100,
        reason: 'upiId',
      });

      const methodUpiSuffix = normalizeComparable(String(method.upiId).split('@')[1] ?? '');
      if (methodUpiSuffix) {
        candidates.push({
          matched: upiHandleTokens.includes(methodUpiSuffix),
          score: 82,
          reason: 'upiBankHandle',
        });
      }
    }

    if (method.lastFour) {
      const lastFour = String(method.lastFour);
      candidates.push({
        matched: maskedSuffixes.some((suffix) => lastFour.endsWith(suffix)),
        score: maskedSuffixes.some((suffix) => suffix.length >= 4 && lastFour === suffix) ? 95 : 80,
        reason: 'lastFour',
      });
    }

    for (const value of [method.name, method.nickname, method.provider?.name, method.provider?.code]) {
      const normalized = normalizeComparable(value);
      if (normalized.length >= 3) {
        candidates.push({
          matched: searchableSourceText.includes(normalized),
          score: method.provider?.name === value || method.provider?.code === value ? 72 : 78,
          reason: 'name',
        });
      }
    }

    const aliasTokens = getProviderAliasTokens(method);
    const matchedAlias = aliasTokens.find((token) =>
      searchableSourceText.includes(token) || upiHandleTokens.includes(token)
    );
    if (matchedAlias) {
      candidates.push({
        matched: true,
        score: 86,
        reason: 'providerAlias',
      });
    }

    const match = candidates.filter((candidate) => candidate.matched).sort((a, b) => b.score - a.score)[0];
    if (match && (!bestMatch || match.score > bestMatch.score)) {
      bestMatch = { paymentMethod: method, score: match.score, reason: match.reason, sourceText };
    }
  }

  return bestMatch;
};

const sanitizeMerchantLine = (line = '') => {
  const cleaned = String(line)
    .replace(moneyPattern, ' ')
    .replace(/\b[\w.-]+@[\w.-]+\b/g, ' ')
    .replace(/\b\d{8,}\b/g, ' ')
    .replace(/[\u20b9$#@:\u2713<>]+/g, ' ')
    .replace(/\bon\s+paytm\b/i, ' ')
    .replace(/[^\p{L}\p{N}\s&.-]/gu, ' ')
    .replace(/\b\d+\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned || cleaned.length < 3 || !/[a-z]/i.test(cleaned)) return '';
  return cleaned.slice(0, 80);
};

const scanReceipt = async (file, userId) => {
  if (!file) {
    throw Object.assign(new Error('Receipt file is required'), { statusCode: 400 });
  }

  if (file.mimetype === 'application/pdf') {
    throw Object.assign(new Error('PDF OCR is not supported yet. Please upload a receipt image or screenshot.'), {
      statusCode: 400,
    });
  }

  const result = await Tesseract.recognize(file.buffer, 'eng');
  const text = normalizeText(result.data?.text || '');
  const paymentMethods = userId ? await getAllPaymentMethods(userId) : [];
  const paymentMethodMatch = findPaymentMethodMatch(text, paymentMethods);

  return {
    ...parseReceiptText(text),
    paymentMethod: paymentMethodMatch?.paymentMethod ?? null,
    paymentMethodMatch: paymentMethodMatch
      ? {
          score: paymentMethodMatch.score,
          reason: paymentMethodMatch.reason,
          sourceText: paymentMethodMatch.sourceText,
        }
      : null,
    confidence: Math.round(result.data?.confidence || 0),
    rawText: text.slice(0, 4000),
  };
};

const parseReceiptText = (text) => ({
  description: parseMerchant(text),
  amount: parseAmount(text),
  date: parseDate(text),
});

module.exports = { findPaymentMethodMatch, parseReceiptText, scanReceipt };
