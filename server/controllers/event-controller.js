const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");
const Event = require("../models/events");
const Slot = require("../models/slot");
const PAGE_SIZE = 50;
const { upload, uploadToCloudinary } = require("../utils/upload");
const NodeCache = require("node-cache");
const User = require("../models/users");
const sendEmail = require("../utils/sendMail");
const Invoice = require("../models/invoice");
const myCache = new NodeCache();

module.exports = {
  createEventByOrganization: async (req, res) => {
    try {
      let id = req.admin;
      const { organizerId, slotId, title } = req.body;

      // Check if required fields are provided
      if (!organizerId || !slotId || !title) {
        return errorHandler(
          res,
          "Some fields are still blank. Could you please provide the missing details?",
          400
        );
      }

      const organizer = await User.findById(organizerId);
      if (!organizer) {
        return errorHandler(res, "Organizations Not Found.", 404);
      }

      // Check if the organization already has 2 events
      const eventCount = await Event.countDocuments({ organizerId });
      if (eventCount >= 2) {
        return errorHandler(
          res,
          "An organization can only have a maximum of 2 slots.",
          400
        );
      }

      const slot = await Slot.findById(slotId);
      if (!slot) {
        return errorHandler(res, "Slot not found.", 404);
      }

      // Check if the slot is open
      if (slot.bookingStatus !== "open") {
        return errorHandler(
          res,
          "Slot is not open. Please select a different slot.",
          409
        );
      }

      const { start, end, date } = slot;

      // Create new Event entry
      const newEvent = new Event({
        title,
        organizerId,
        organizer: organizer.name,
        start,
        end,
        slotId,
        ...req.body, // Spread remaining fields from the body, excluding the slotId
      });

      // Save newEvent
      await newEvent.save();

      // Update slot with booking details
      slot.bookingStatus = "booked";
      slot.adminBookingBy = id;
      slot.title = title;
      await slot.save();

      // Send email to all delegates of the organizer
      const { delegates } = organizer;
      const subject = "Meeting Scheduled";
      const message1 = `Dear Delegate, we are pleased to inform you that a meeting has been scheduled on behalf of ${organizer.name}. Your presence is kindly requested.`;
      const message2 = `The meeting is scheduled for ${slot.timeSpan} on ${slot.date}. Kindly ensure your timely arrival for accreditation prior to the meeting. We look forward to your participation.`;

      const approvedDelegates = delegates.filter(
        (delegate) => delegate.copApproved === "approved"
      );

      for (let delegate of approvedDelegates) {
        await sendEmail(
          delegate.email,
          delegate.name,
          "",
          subject,
          message1,
          message2
        );
      }

      // Send success response
      return successHandler(res, "Meeting Successfully Scheduled", newEvent);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  createEventByAdmin: async (req, res) => {
    let adminBookingBy = req.admin;
    upload(req, res, async (err) => {
      if (err) {
        return errorHandler(res, err.message || "File upload error", 400);
      }

      try {
        const { body, files } = req;
        const { title, slotId, organizer } = body;

        // Check if required fields are provided
        if (!title || !slotId) {
          return errorHandler(
            res,
            "Some fields are still blank. Could you please provide the missing details?",
            400
          );
        }

        const slot = await Slot.findById(slotId);
        if (!slot) {
          return errorHandler(res, "Slot not found.", 404);
        }

        // Check if the slot is open
        if (slot.bookingStatus !== "open") {
          return errorHandler(
            res,
            "Slot is not open. Please select a different slot.",
            409
          );
        }

        const { start, end } = slot;

        // Handle image uploads
        let image = "";
        if (files && files.length > 0) {
          const file = files[0];
          const uploadResult = await uploadToCloudinary(
            file.path,
            file.filename,
            "COP29 Events"
          );
          image = uploadResult.url;
        }

        // Create new Event entry
        const newEvent = new Event({
          title,
          organizer,
          // organizer: `${organizer.name}  ${organizer.state}`,
          start,
          end,
          slotId,
          ...body, // Spread remaining fields from the body, excluding the slotId
        });

        // Save newEvent
        await newEvent.save();

        // Update slot with booking details
        slot.bookingStatus = "booked";
        slot.adminBookingBy = adminBookingBy;
        slot.title = title;
        await slot.save();

        // Send success response
        return successHandler(res, "Meeting Successfully Scheduled.", newEvent);
      } catch (error) {
        return errorHandler(res, error.message, error.statusCode || 500);
      }
    });
  },
  getAllEvents: async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const searchTerm = req.query.search || "";
    const price = req.query.price || "";
    const location = req.query.location || "";
    const status = req.query.status || "";
    const invoiceStatus = req.query.invoiceStatus || "";
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;
    try {
      let cacheKey = `allEvents-${searchTerm}-${price}-${location}-${status}-${startDate}-${endDate}-${page}`;
      let query = {};

      // Add search term filtering
      if (searchTerm) {
        query.title = { $regex: new RegExp(searchTerm, "i") };
      }

      // Add price filtering
      if (price) {
        query.price = { $eq: price };
      }

      // Add location filtering
      if (location) {
        query.location = { $regex: new RegExp(location, "i") };
      }

      // Add status filtering
      if (status) {
        query.status = { $eq: status };
      }

      // Add invoiceStatus filtering
      if (invoiceStatus) {
        query.invoiceStatus = { $eq: invoiceStatus };
      }

      // Add date range filtering
      if (startDate && endDate) {
        query.date = { $gte: startDate, $lte: endDate };
      } else if (startDate) {
        query.date = { $gte: startDate };
      } else if (endDate) {
        query.date = { $lte: endDate };
      }

      let events;
      if (myCache.has(cacheKey)) {
        events = myCache.get(cacheKey).events;
      } else {
        events = await Event.find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * PAGE_SIZE)
          .limit(PAGE_SIZE);
        const totalItems = await Event.countDocuments(query);
        myCache.set(cacheKey, { events, totalItems }, 10);
      }

      const totalItems = myCache.get(cacheKey).totalItems;
      const totalPages = Math.ceil(totalItems / PAGE_SIZE);

      const response = {
        currentPage: page,
        totalPages,
        itemsPerPage: PAGE_SIZE,
        totalItems,
        events: events,
      };
      return successHandler(res, "Events Found", response);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  getLatest3Events: async (req, res) => {
    try {
      let event;
      if (myCache.has("allEvents3")) {
        event = myCache.get("allEvents3");
      } else {
        event = await Event.find().sort({ createdAt: -1 }).limit(3);
        myCache.set("allEvents3", event, 10);
      }
      const response = {
        events: event,
      };
      return successHandler(res, "Latest 3 Events Found", response);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getEventById: async (req, res) => {
    try {
      let id = req.params.id;
      let event = await Event.findOne({ countId: id });
      if (!event) return errorHandler(res, "No Event found with the ID", 404);
      return successHandler(res, "Event Found", event);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  updateEventById: async (req, res) => {
    try {
      const id = req.params.id;
      const { body } = req;
      let update = {
        features: featureArray,
        landmarks: landmarksArray,
        ...body,
      };

      const event = await Event.findOneAndUpdate({ _id: id }, update, {
        new: true,
      });

      if (!event) return errorHandler(res, "No Event found with the ID", 404);

      return successHandler(res, "Event Updated", event);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  rescheduleEventById: async (req, res) => {
    try {
      const { id } = req.params;
      const { slotId } = req.body;

      // Check if the new slotId is provided
      if (!slotId) {
        return errorHandler(
          res,
          "slotId is required to update the event.",
          400
        );
      }

      // Fetch the existing event by its ID
      const event = await Event.findById(id);
      if (!event) return errorHandler(res, "No Event found with the ID", 404);

      // Fetch the current slot associated with the event
      const currentSlot = await Slot.findById(event.slotId);
      if (!currentSlot) return errorHandler(res, "Current slot not found", 404);

      // Revert current slot details (set to open and clear booking details)
      currentSlot.bookingStatus = "open";
      currentSlot.adminBookingBy = "";
      currentSlot.title = "";

      // Fetch the new slot to be assigned
      const newSlot = await Slot.findById(slotId);
      if (!newSlot) return errorHandler(res, "New slot not found", 404);

      // Check if the new slot is open for booking
      if (newSlot.bookingStatus !== "open") {
        return errorHandler(res, "New slot is not open for booking", 409);
      }

      // Update event with the new slotId
      event.slotId = slotId;
      event.start = newSlot.start;
      event.end = newSlot.end;

      // Update the new slot with booking details
      newSlot.bookingStatus = "booked";
      newSlot.adminBookingBy = req.admin; // Assuming req.admin holds the admin ID
      newSlot.title = event.title;
      await newSlot.save();
      await currentSlot.save();
      await event.save();

      const organizer = await User.findById(event.organizerId);
      const { delegates } = organizer;
      const subject = "Meeting Rescheduled.";
      const message1 = `Dear Delegate, we would like to inform you that the meeting for ${organizer.name} has been rescheduled. Sorry for the inconvenience.`;
      const message2 = `The updated meeting is scheduled for ${newSlot.timeSpan} on ${newSlot.date}. Kindly ensure your timely arrival for accreditation prior to the meeting. We look forward to your participation.`;

      const approvedDelegates = delegates.filter(
        (delegate) => delegate.copApproved === "approved"
      );

      for (let delegate of approvedDelegates) {
        await sendEmail(
          delegate.email,
          delegate.name,
          "",
          subject,
          message1,
          message2
        );
      }

      return successHandler(res, "Meeting Successfully Rescheduled", event);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  addCommentToEventById: async (req, res) => {
    try {
      let by = req.admin;
      const id = req.params.id;
      const { comment } = req.body;

      if (!comment) {
        return errorHandler(res, "Please provide a comment to add.", 400);
      }

      const updatedEvent = await Event.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            comments: {
              comment: comment,
              time: Date.now(),
              by,
            },
          },
        },
        { new: true }
      );
      if (!updatedEvent) {
        return errorHandler(res, "No Event found with the ID", 404);
      }
      return successHandler(res, "Comment added successfully.", updatedEvent);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  deleteEventById: async (req, res) => {
    try {
      let id = req.params.id;

      // Find the event entry
      const event = await Event.findOne({ _id: id });
      if (!event) return errorHandler(res, "No Event found with the ID", 404);

      // Delete event entry
      await Event.deleteOne({ _id: id });

      return successHandler(res, "Event Deleted");
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  approveOrRejectEventById: async (req, res) => {
    try {
      let by = req.admin;
      const id = req.params.id;
      const { status } = req.body;

      if (!status) {
        return errorHandler(res, "Please select a valid status.", 400);
      }

      // Find the event first to check its current status
      const event = await Event.findById(id);
      if (!event) {
        return errorHandler(res, "No Event found with the ID", 404);
      }

      // Ensure the event is in "processing" state before updating
      if (event.status !== "processing") {
        return errorHandler(
          res,
          `Event status is not in processing state. Event has been ${event.status}. already`,
          400
        );
      }

      // Update the event status
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: id },
        {
          status,
          statusChangedBy: by,
        },
        { new: true }
      );

      // Update the slot based on the event status
      if (status === "approved" || status === "declined") {
        const slotUpdate =
          status === "approved"
            ? { bookingStatus: "booked" }
            : { bookingStatus: "open" };

        const slot = await Slot.findByIdAndUpdate(
          updatedEvent.slotId,
          slotUpdate,
          { new: true }
        );

        if (!slot) {
          return errorHandler(res, "No Slot found with the ID", 404);
        }
      }

      return successHandler(res, `Event ${status}.`, updatedEvent);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  sendEventInvoiceById: async (req, res) => {
    try {
      const id = req.params.id;
      const generatedBy = req.admin;

      // Find the event by countId and populate the organizer details
      const event = await Event.findOne({ countId: id }).populate(
        "organizerId"
      );
      if (!event) return errorHandler(res, "No Event found with the ID", 404);

      // Check if an invoice for this eventId already exists
      let invoice = await Invoice.findOne({ eventId: event._id });

      // If the invoice doesn't exist, create a new one
      if (!invoice) {
        invoice = await Invoice.create({
          amount: event.invoiceAmount,
          eventId: event._id,
          generatedBy,
        });
      }

      // Send the invoice email regardless of whether a new invoice was created
      sendEmail(
        event.organizerId.email,
        event.organizerId.name,
        event.invoiceAmount
      );

      return successHandler(res, "Invoice sent successfully.", event);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  getAllInvoices: async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const paid = req.query.paid || "";
    const startDate = req.query.startDate
      ? new Date(req.query.startDate)
      : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    try {
      // Construct the cache key
      let cacheKey = `allInvoices-${paid}-${startDate}-${endDate}-${page}`;
      let query = {};

      // Add paid status filtering
      if (paid) {
        query.paid = { $eq: paid === "true" };
      }

      // Add date range filtering
      if (startDate && endDate) {
        query.createdAt = { $gte: startDate, $lte: endDate };
      } else if (startDate) {
        query.createdAt = { $gte: startDate };
      } else if (endDate) {
        query.createdAt = { $lte: endDate };
      }

      let invoices;
      if (myCache.has(cacheKey)) {
        invoices = myCache.get(cacheKey).invoices;
      } else {
        invoices = await Invoice.find(query)
          .populate("eventId")
          .populate("generatedBy")
          .sort({ createdAt: -1 })
          .skip((page - 1) * PAGE_SIZE)
          .limit(PAGE_SIZE);

        const totalItems = await Invoice.countDocuments(query);
        myCache.set(cacheKey, { invoices, totalItems }, 10);
      }

      const totalItems = myCache.get(cacheKey).totalItems;
      const totalPages = Math.ceil(totalItems / PAGE_SIZE);

      const response = {
        currentPage: page,
        totalPages,
        itemsPerPage: PAGE_SIZE,
        totalItems,
        invoices: invoices,
      };
      return successHandler(res, "Invoices Found", response);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  getDelegateAndEventByCode: async (req, res) => {
    try {
      const { code } = req.query;

      // Step 1: Search for a delegate with the specified code
      const user = await User.findOne({
        "delegates.code": code,
      }).select(
        "name category state reasonForAttendance contactName contactDesignation phone delegates"
      );

      if (!user) {
        return errorHandler(res, "Delegate not found", 404);
      }

      // Find the matching delegate within the user's delegates array
      const delegate = user.delegates.find((del) => del.code === code);

      // Step 2: Get the event(s) by the organizerId (Main User's ID)
      const events = await Event.find({ organizerId: user._id }).select(
        "title start end description status"
      );

      // Prepare the response
      const response = {
        organization: {
          name: user.name,
          category: user.category,
          state: user.state,
          contactName: user.contactName,
          contactDesignation: user.contactDesignation,
          phone: user.phone,
        },
        delegate: {
          name: delegate.name,
          email: delegate.email,
          phone: delegate.phone,
          designation: delegate.designation,
          passport: delegate.passport,
          state: delegate.state,
          department: delegate.department,
        },
        events, // Return the found events
      };

      return successHandler(res, "Delegate and Events Found", response);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
};
