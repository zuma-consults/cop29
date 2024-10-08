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
  getDelegateAndEventByCode,
  rescheduleEventById,
} = require("../../controllers/event-controller");
const { auth, authAdmin, authRole } = require("../../middlewares/middleware");
let routes = (app) => {
  app.post("/schedule", authAdmin, createEventByOrganization);
  app.post("/event/admin", authRole("Super Admin"), createEventByAdmin);
  app.get("/events", getAllEvents);
  app.get("/3events", getLatest3Events);
  app.get("/event/:id", getEventById);
  app.put("/event/:id", authAdmin, updateEventById);
  app.put("/reschedule/:id", authAdmin, rescheduleEventById);
  app.put("/comment/event/:id", authAdmin, addCommentToEventById);
  app.put("/status/event/:id", authAdmin, approveOrRejectEventById);
  app.post("/invoice/event/:id", authAdmin, sendEventInvoiceById);
  app.delete("/event/:id", authAdmin, deleteEventById);
  app.get("/invoices", authAdmin, getAllInvoices);
  app.get("/code", authAdmin, getDelegateAndEventByCode);
};

module.exports = routes;
