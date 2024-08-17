const {
  createEventByOrganization,
  createEventByAdmin,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getLatest3Events,
  addCommentToEventById,
  approveOrRejectEventById,
  sendEventInvoiceById,
  getAllInvoices,
} = require("../../controllers/event-controller");
const { auth, authAdmin } = require("../../middlewares/middleware");
let routes = (app) => {
  app.post("/event", auth, createEventByOrganization);
  app.post("/event/admin", authAdmin, createEventByAdmin);
  app.get("/events", getAllEvents);
  app.get("/3events", getLatest3Events);
  app.get("/event/:id", getEventById);
  app.put("/event/:id", authAdmin, updateEventById);
  app.put("/comment/event/:id", authAdmin, addCommentToEventById);
  app.put("/status/event/:id", authAdmin, approveOrRejectEventById);
  app.post("/invoice/event/:id", authAdmin, sendEventInvoiceById);
  app.delete("/event/:id", authAdmin, deleteEventById);
  app.get("/invoices", authAdmin, getAllInvoices);
};

module.exports = routes;
