const express = require("express");
const app = express.Router();

require("./endpoints/Auth")(app);

module.exports = app;
