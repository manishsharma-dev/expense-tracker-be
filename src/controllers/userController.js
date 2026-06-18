const userService = require('../services/userService');
const { sendSuccess, sendError, sendNotFound } = require('../utils/apiResponse');

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers(req.query);
    sendSuccess(res, result, 'Users fetched');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    sendSuccess(res, { user }, 'User fetched');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    sendSuccess(res, { user }, 'User updated');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const updateMe = async (req, res) => {
  try {
    const user = await userService.updateOwnProfile(req.user._id, req.body);
    sendSuccess(res, { user: userService.toUserResponse(user) }, 'Profile updated');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const remindProfileLater = async (req, res) => {
  try {
    const user = await userService.dismissProfileReminder(req.user._id);
    sendSuccess(res, { user: userService.toUserResponse(user) }, 'Profile reminder postponed');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    sendSuccess(res, null, 'User deleted');
  } catch (err) {
    sendError(res, err.message, err.statusCode || 500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  updateMe,
  remindProfileLater,
  deleteUser,
};
