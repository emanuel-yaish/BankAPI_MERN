const Account = require("../models/accountModel");

const getAccountById = async (accountId) =>
  Account.findOne({ passportID: accountId });

const updateAccountById = async (filter, update) =>
  Account.findOneAndUpdate(filter, update, { new: true });

module.exports = { getAccountById, updateAccountById };
