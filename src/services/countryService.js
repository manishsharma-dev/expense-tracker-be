const Country = require('../models/Country');

const getAllCountries = async () =>
  Country.find({ isActive: true })
    .select('name iso2 iso3 emoji phoneCode currency')
    .sort({ name: 1 });

const getUniqueCurrencyCountries = async () =>
  Country.aggregate([
    {
      $match: {
        isActive: true,
        'currency.code': { $exists: true, $ne: '' },
      },
    },
    { $sort: { 'currency.code': 1, name: 1 } },
    {
      $group: {
        _id: '$currency.code',
        countryId: { $first: '$_id' },
        name: { $first: '$name' },
        currency: { $first: '$currency' },
        iso2: { $first: '$iso2' },
      },
    },
    {
      $project: {
        _id: '$countryId',
        name: 1,
        currency: 1,
        iso2: 1,
      },
    },
    { $sort: { 'currency.code': 1, name: 1 } },
  ]);

module.exports = { getAllCountries, getUniqueCurrencyCountries };
