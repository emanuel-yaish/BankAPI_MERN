const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  passportID: {
    type: String,
    required: [true, "A account must have a passport id"],
    unique: true,
  },
  cash: {
    type: String,
    default: 0,
  },
  credit: {
    type: String,
    default: 0,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
