const fs = require("fs");
const Account = require("../models/accountModel");
const { getAccountById, updateAccountById } = require("../utils/utils");

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();

    res.status(200).send({
      status: "success",
      results: accounts.length,
      data: {
        accounts,
      },
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const addAccount = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);

    res.status(200).send({
      status: "success",
      results: "new account created",
      data: {
        newAccount,
      },
    });
  } catch (err) {
    res.status(400).send({ status: "fail", message: err.message });
  }
};

const deposit = async (accountId, depositAmount, res) => {
  let account = await getAccountById(accountId);
  const newBalance = { cash: (+account.cash + +depositAmount).toString() };
  account = await updateAccountById({ passportID: accountId }, newBalance);

  res.status(200).json({
    status: "success",
    results: `deposit ${depositAmount} to account`,
    data: {
      account,
    },
  });
};

const updateCredit = async (accountId, newCreditAmmount, res) => {
  const account = await Account.findOneAndUpdate(
    { passportID: accountId },
    { credit: newCreditAmmount },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    results: `the new credit is ${newCreditAmmount}`,
    data: {
      account,
    },
  });
};

const withdraw = async (accountId, withdrowAmount, res) => {
  let account = await getAccountById(accountId);

  if (+account.credit + +account.cash < +withdrowAmount)
    throw Error("insufficient funds!");

  const newBalance = { cash: (+account.cash - +withdrowAmount).toString() };
  account = await updateAccountById({ passportID: accountId }, newBalance);

  res.status(200).json({
    status: "success",
    results: `withdraw ${withdrowAmount} from account`,
    data: {
      account,
    },
  });
};

const transfer = async (accountId, reciverAccontID, transferAmmount, res) => {
  let account = await getAccountById(accountId);
  if (!account) throw Error("Account not found!");
  let reciverAccount = await getAccountById(reciverAccontID);
  if (!reciverAccount) throw Error("Account not found!");

  if (+account.credit + +account.cash < +transferAmmount)
    throw Error("insufficient funds for transferring!");

  const newBalance = { cash: (+account.cash - +transferAmmount).toString() };
  const reciverNewBalance = {
    cash: (+reciverAccount.cash + +transferAmmount).toString(),
  };

  account = await updateAccountById({ passportID: accountId }, newBalance);
  reciverAccount = await updateAccountById(
    { passportID: reciverAccontID },
    reciverNewBalance
  );

  res.status(200).json({
    status: "success",
    results: `transfer ${transferAmmount} from account:${accountId} to account:${reciverAccontID}`,
    data: {
      account,
      reciverAccount,
    },
  });
};

const handleAccountAction = (req, res) => {
  try {
    const accountId = req.params.accountID;
    if (!accountId || accountId === "") throw Error("missing account Id");

    const { action, actionData } = req.body;

    switch (action) {
      case "deposit":
        const depositAmount = actionData.depositAmount;
        if (!depositAmount || depositAmount <= 0)
          throw Error(`invalid deposit ammount - ${depositAmount}`);
        deposit(accountId, depositAmount, res);
        break;

      case "updateCredit":
        const newCreditAmmount = actionData.newCreditAmmount;
        if (!newCreditAmmount || newCreditAmmount < 0)
          throw Error(`invalid new credit ammount - ${newCreditAmmount}`);
        updateCredit(accountId, newCreditAmmount, res);
        break;

      case "withdraw":
        const withdrawAmmount = actionData.withdrawAmmount;
        if (!withdrawAmmount || withdrawAmmount <= 0)
          throw Error(`invalid withdraw ammount - ${withdrawAmmount}`);
        withdraw(accountId, withdrawAmmount, res);
        break;

      case "transfer":
        const transferAmmount = actionData.transferAmmount;
        if (!transferAmmount || transferAmmount <= 0)
          throw Error(`invalid transfer ammount - ${transferAmmount}`);

        const reciverAccontID = actionData.reciverAccontID;
        if (!reciverAccontID || reciverAccontID === "")
          throw Error("missing reciver account Id");

        transfer(accountId, reciverAccontID, transferAmmount, res);
        break;

      default:
        throw Error("invalid action");
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const getAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ passportID: req.params.accountID });

    res.status(200).json({
      status: "success",
      results: "Account details:",
      data: {
        account,
      },
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  getAllAccounts,
  addAccount,
  handleAccountAction,
  getAccount,
};
