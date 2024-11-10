const express = require("express");
const app = express.Router();

require("./endpoints/Auth")(app);
require("./endpoints/Admin-Auth")(app);
require("./endpoints/Event")(app);
require("./endpoints/Slots")(app);
require("./endpoints/Message")(app);
require("./endpoints/PavillionSlots")(app);
require("./endpoints/SideEvent")(app);

module.exports = app;
