const express = require("express");
const bankController = require("./../controllers/bankController");

const router = express.Router();

router.route("").get(bankController.welcome);

module.exports = router;
