const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

console.log("process.env.DATABASE", process.env.DATABASE);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT;

app.listen(PORT || 8080, () =>
  console.log(`Server is up and runing on port ${PORT || 8080}`)
);
