const { getAllSlots } = require("../../controllers/slot-controller");
const { auth } = require("../../middlewares/middleware");
let routes = (app) => {
  app.get("/slots",  getAllSlots);
};

module.exports = routes;
