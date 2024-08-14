const express = require("express");
const app = express.Router();

require("./endpoints/Auth")(app);
require("./endpoints/Admin-Auth")(app);
require("./endpoints/Event")(app);

module.exports = app;
