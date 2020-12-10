const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "config.env") });
const { config } = require("./configuration/config");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Request recieved");
});

app.listen(config.PORT, () => {
  console.log(`Server started on http://localhost:${config.PORT}/`);
});
