require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bankRouter = require("./routes/bankRoutes");
const accountRouter = require("./routes/accountRoutes");
const app = express();
const path = require("path");

// const publicPath = path.join(__dirname, "client/build");
// app.use(express.static(publicPath));

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/bank", bankRouter);
app.use("/accounts", accountRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
