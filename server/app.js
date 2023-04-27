const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");

const app = express();
const PORT = config.get("port");

app.listen(PORT, () =>
  console.log(chalk.green(`Server has been started on port: ${PORT}...`))
);
