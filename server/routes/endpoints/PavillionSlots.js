const { getAllPavillionSlots } = require("../../controllers/pavilion-slot-controller");
let routes = (app) => {
  app.get("/pavillion-slots", getAllPavillionSlots);
};

module.exports = routes;
