const Slot = require("../models/slot");

module.exports = {
  getAllSlots: async (req, res) => {
    const bookingStatus = req.query.bookingStatus || "";
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    try {
      let query = {};

      // Add bookingStatus filtering
      if (bookingStatus) {
        query.bookingStatus = { $eq: bookingStatus };
      }

      // Add date range filtering
      if (startDate && endDate) {
        query.date = { $gte: startDate, $lte: endDate };
      } else if (startDate) {
        query.date = { $gte: startDate };
      } else if (endDate) {
        query.date = { $lte: endDate };
      }

      const slots = await Slot.find(query).sort({ date: 1 });

      if (!slots || slots.length === 0) {
        return errorHandler(res, "No slots found.", 404);
      }

      return successHandler(res, "Slots found", slots);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
};
