const {
  sendInternationalMessage,
  sendContactMessage,
} = require("../../controllers/message-controller");
let routes = (app) => {
  app.post("/international", sendInternationalMessage);
  app.post("/contact", sendContactMessage);
};

module.exports = routes;
