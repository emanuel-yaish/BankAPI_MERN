const express = require("express");
const userController = require("./../controllers/accountController");

const router = express.Router();

router
  .route("")
  .get(userController.getAllAccounts)
  .post(userController.addAccount);

router
  .route("/:accountID")
  .get(userController.getAccount)
  .put(userController.handleAccountAction);

module.exports = router;
