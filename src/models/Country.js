const mongoose = require('mongoose');

const timezoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },

    offset: {
      type: String,
      trim: true
    },

    abbreviation: {
      type: String,
      trim: true
    },

    tzName: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

const currencySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      uppercase: true,
      trim: true
    },

    name: {
      type: String,
      trim: true
    },

    symbol: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

const coordinatesSchema = new mongoose.Schema(
  {
    latitude: Number,
    longitude: Number
  },
  { _id: false }
);

const postalCodeSchema = new mongoose.Schema(
  {
    format: String,
    regex: String
  },
  { _id: false }
);

const countrySchema = new mongoose.Schema(
  {
    // ISO Codes
    iso2: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
      set: (v) => v?.toUpperCase(),
      trim: true
    },

    iso3: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      minlength: 3,
      maxlength: 3,
      set: (v) => v?.toUpperCase(),
      trim: true
    },

    numericCode: {
      type: String,
      trim: true
    },

    // Country Names
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    officialName: {
      type: String,
      trim: true
    },

    nativeName: {
      type: String,
      trim: true
    },

    // Phone
    phoneCode: {
      type: String,
      trim: true,
      index: true
    },

    // Capital
    capital: {
      type: String,
      trim: true
    },

    // Currency
    currency: currencySchema,

    // Geography
    region: {
      type: String,
      trim: true,
      index: true
    },

    subRegion: {
      type: String,
      trim: true
    },

    nationality: {
      type: String,
      trim: true
    },

    coordinates: coordinatesSchema,

    // Postal Code
    postalCode: postalCodeSchema,

    // Timezones
    timezones: [timezoneSchema],

    // Localization
    translations: {
      type: Map,
      of: String,
      default: {}
    },

    // Additional Info
    population: Number,

    gdp: Number,

    areaSqKm: Number,

    tld: {
      type: String,
      trim: true
    },

    emoji: String,

    emojiUnicode: String,

    wikiDataId: {
      type: String,
      trim: true
    },

    // Status
    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'countries'
  }
);

// Export
module.exports = mongoose.model('Country', countrySchema);