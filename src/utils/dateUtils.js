const defaultTimeZone = 'UTC';

const getUserTimeZone = (user) => user?.country?.timezones?.[0]?.name || defaultTimeZone;

const getZonedParts = (date, timeZone) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
};

const getTimeZoneOffset = (date, timeZone) => {
  const parts = getZonedParts(date, timeZone);
  const zonedAsUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return zonedAsUtc - date.getTime();
};

const zonedDateTimeToUtc = (year, month, day, hour, minute, second, timeZone) => {
  let utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  let offset = getTimeZoneOffset(utcDate, timeZone);
  utcDate = new Date(utcDate.getTime() - offset);
  offset = getTimeZoneOffset(utcDate, timeZone);
  return new Date(Date.UTC(year, month - 1, day, hour, minute, second) - offset);
};

const getMonthKey = (date, timeZone = defaultTimeZone) => {
  const parts = getZonedParts(date, timeZone);
  return `${parts.year}-${parts.month}`;
};

const getMonthRange = (month, timeZone = defaultTimeZone) => {
  const [year, monthIndex] = month.split('-').map(Number);
  return {
    start: zonedDateTimeToUtc(year, monthIndex, 1, 0, 0, 0, timeZone),
    end: zonedDateTimeToUtc(year, monthIndex + 1, 1, 0, 0, 0, timeZone),
  };
};

const getMonthLabel = (month, options = { month: 'short' }) => {
  const [year, monthIndex] = month.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', options).format(new Date(Date.UTC(year, monthIndex - 1, 1, 12)));
};

const getRecentMonths = (month, count = 6) => {
  const [year, monthIndex] = month.split('-').map(Number);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(Date.UTC(year, monthIndex - count + index, 1, 12));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
  });
};

const normalizeCalendarDate = (value) => {
  if (!value) return value;
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day, 12));
  }
  return value;
};

module.exports = {
  getMonthKey,
  getMonthLabel,
  getMonthRange,
  getRecentMonths,
  getUserTimeZone,
  normalizeCalendarDate,
};
