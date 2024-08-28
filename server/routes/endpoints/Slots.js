const { getAllSlots } = require("../../controllers/slot-controller");
const { auth, authRole } = require("../../middlewares/middleware");
let routes = (app) => {
  app.get("/slots", authRole("Super Admin"), getAllSlots);
};

module.exports = routes;
