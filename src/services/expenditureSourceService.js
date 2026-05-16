const ExpenditureSource = require('../models/expenditureSource');

const getAllSources = async () => {
  return await ExpenditureSource.find({ isDeleted: false , isActive: true }).sort({ createdAt: -1 });
};

const getSourceById = async (sourceId) => {
  const source = await ExpenditureSource.findById(sourceId);
  if (!source) throw Object.assign(new Error('Source not found'), { statusCode: 404 });
  return source;
}

const createSource = async ({ name, color, icon }) => {
  const source = await ExpenditureSource.create({ name, color, icon });
  return source;
}

const updateSource = async (sourceId, updates) => {
  const source = await ExpenditureSource.findByIdAndUpdate(sourceId, updates, {
    new: true,
    runValidators: true,
  });
  if (!source) throw Object.assign(new Error('Source not found'), { statusCode: 404 });
  return source;
};

module.exports = { getAllSources, getSourceById, createSource, updateSource };