require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bankRouter = require("./routes/bankRoutes");
const accountRouter = require("./routes/accountRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", bankRouter);
app.use("/accounts", accountRouter);

module.exports = app;
