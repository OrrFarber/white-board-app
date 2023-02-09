const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authController = require("./Controllers/authController");
const roomController = require("./Controllers/roomController");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("connected successfully"))
  .catch((err) => {
    console.log("connection to database unsuccessfully");
    console.log(err);
  });

app.post("/register", authController.register);
app.post("/login", authController.login);

app.post("/add", roomController.add);
app.post("/list", roomController.list);
app.post("/edit", roomController.edit);
app.post("/delete", roomController.delete);

app.listen(8008, () => console.log("listening on port 8008"));
