const {
  sendInternationalMessage,
  sendContactMessage,
  getAllMessages,
} = require("../../controllers/message-controller");
const {  authAdmin,  } = require("../../middlewares/middleware");
let routes = (app) => {
  app.post("/international", sendInternationalMessage);
  app.post("/contact", sendContactMessage);
  app.get("/meeting", authAdmin, getAllMessages);
};

module.exports = routes;
