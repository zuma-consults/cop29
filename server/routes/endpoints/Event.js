const {
  createEventByOrganization,
  createEventByAdmin,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getLatest3Events,
  addCommentToEventById,
} = require("../../controllers/event-controller");
const { auth, authAdmin } = require("../../middlewares/middleware");
let routes = (app) => {
  app.post("/event", auth, createEventByOrganization);
  app.post("/event/admin", auth, createEventByAdmin);
  app.get("/events", getAllEvents);
  app.get("/3events", getLatest3Events);
  app.get("/event/:id", getEventById);
  app.put("/event/:id", authAdmin, updateEventById);
  app.put("/comment/event/:id", authAdmin, addCommentToEventById);
  app.delete("/event/:id", authAdmin, deleteEventById);
};

module.exports = routes;