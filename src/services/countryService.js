const Country = require('../models/Country');

const getAllCountries = async () =>
  Country.find({ isActive: true })
    .select('name iso2 iso3 emoji currency')
    .sort({ name: 1 });

module.exports = { getAllCountries };
