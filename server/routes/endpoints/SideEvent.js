const {
  createSideEventByOrganization,
  getOrganizationSideEvent,
  deleteEventById,
  getAllEvents,
  uploadProof,
  createEventByAdminNew,
} = require("../../controllers/pavillion-controller");
const { auth, authAdmin, authRole } = require("../../middlewares/middleware");
let routes = (app) => {
  app.post("/side-event", auth, createSideEventByOrganization);
  app.get("/side-event", auth, getOrganizationSideEvent);
  // app.delete("/side/:id", deleteEventById);
  app.post("/admin/side-event", authAdmin, createEventByAdminNew);
  app.get("/side-events", authAdmin, getAllEvents);
  // app.get("/3events", getLatest3Events);
  // app.get("/event/:id", getEventById);
  // app.put("/event/:id", authAdmin, updateEventById);
  // app.put("/reschedule/:id", authAdmin, rescheduleEventById);
  // app.put("/comment/event/:id", authAdmin, addCommentToEventById);
  // app.put("/status/event/:id", authAdmin, approveOrRejectEventById);
  // app.post("/invoice/event/:id", authAdmin, sendEventInvoiceById);
  // app.delete("/event/:id", authAdmin, deleteEventById);
  // app.get("/invoices", authAdmin, getAllInvoices);
  app.put("/proof", auth, uploadProof);
};

module.exports = routes;
