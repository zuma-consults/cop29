const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");
const Event = require("../models/side-event");
const Slot = require("../models/pavillion-slot");
const PAGE_SIZE = 50;
const { upload, uploadToCloudinary } = require("../utils/upload");
const NodeCache = require("node-cache");
const User = require("../models/users");
const sendEmail = require("../utils/sendMail");
const Invoice = require("../models/invoice");
const sendInvoiceEmail = require("../utils/sendInvoice");
const myCache = new NodeCache();

module.exports = {
  createSideEventByOrganization: async (req, res) => {
    try {
      const organizerId = req.user;
      const { slotArray, title, description, noOfSpeakers } = req.body;

      // Check if all required fields are provided
      if (!description || !slotArray || !title || !noOfSpeakers) {
        return errorHandler(
          res,
          "Some fields are still blank. Could you please provide the missing details?",
          400
        );
      }

      // Ensure only 2 slots are allowed per organization
      if (slotArray.length > 2) {
        return errorHandler(
          res,
          "An organization can only request a maximum of 2 slots.",
          400
        );
      }

      // Check if the organizer exists and is in an accepted state
      const organizer = await User.findById(organizerId);
      if (!organizer) {
        return errorHandler(res, "Organization not found.", 404);
      }

      if (organizer.status === "decline") {
        return errorHandler(
          res,
          "Organization accreditation was rejected.",
          403
        );
      }

      // Check how many events the organizer has created and calculate available slots
      const existingEventCount = await Event.countDocuments({ organizerId });
      const remainingSlots = 2 - existingEventCount;

      if (remainingSlots <= 0) {
        return errorHandler(
          res,
          "An organization can only have a maximum of 2 slots.",
          400
        );
      }

      if (slotArray.length > remainingSlots) {
        return errorHandler(
          res,
          `You have ${existingEventCount} events already. You can only book ${remainingSlots} more slot(s).`,
          400
        );
      }

      // Initialize an array to hold the events to be created
      let eventsToCreate = [];

      // Loop through the slots in the slotArray
      for (let slotId of slotArray) {
        const slot = await Slot.findById(slotId);
        if (!slot) {
          return errorHandler(res, `Slot with id ${slotId} not found.`, 404);
        }

        // Ensure the slot is available for booking
        if (slot.bookingStatus !== "open") {
          return errorHandler(
            res,
            `Slot with details ${slot.date}, ${slot.timeSpan} is not open. Please select a different slot.`,
            409
          );
        }

        // Create a new event object
        const newEvent = new Event({
          organizerId,
          organizer: organizer.name,
          title,
          description,
          noOfSpeakers,
          preferredSlotId: slotId,
          pavillionSlotId: slotId,
          start: slot.start,
          end: slot.end,
          date: slot.date,
          ...req.body,
        });

        // Add the new event to the eventsToCreate array
        eventsToCreate.push(newEvent);
      }

      // Save events and slots only if all events are successfully created
      let savedEvents = [];
      for (let event of eventsToCreate) {
        const savedEvent = await event.save(); // Save event
        const slot = await Slot.findById(savedEvent.pavillionSlotId); // Retrieve the slot by pavillionSlotId

        // Update the slot's status and title
        if (slot) {
          slot.bookingStatus = "pending"; // Update slot status
          slot.title = title; // Update slot title
          await slot.save(); // Save the updated slot
        }

        savedEvents.push(savedEvent);
      }

      // Calculate the total amount for the invoice
      const amount = savedEvents.length * 1000000;

      // Prepare event details for the email and invoice
      // const eventDetails = savedEvents.map((event) => ({
      //   title: event.title,
      //   date: event.date,
      //   start: event.start,
      //   end: event.end,
      // }));

      // Check if an invoice already exists for these events
      let invoice = await Invoice.findOne({
        eventIds: { $in: savedEvents.map((event) => event._id) },
      });

      // If no invoice exists, create a new one
      if (!invoice) {
        invoice = await Invoice.create({
          amount,
          eventIds: savedEvents.map((event) => event._id),
        });
      }

      // Send an email with the invoice details
      await sendInvoiceEmail(
        organizer.email,
        organizer.name,
        amount.toLocaleString(),
        savedEvents
      );

      // Respond with success message and saved events
      return successHandler(
        res,
        "Your request has been successfully submitted. An invoice has been sent to your email. Kindly review the details and complete the payment within 24 hours to secure your slot. Failure to do so will result in the cancellation of your request.",
        savedEvents
      );
    } catch (error) {
      console.log(error);
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  createEventByAdminNew: async (req, res) => {
    try {
      const { slotArray, title, description, noOfSpeakers, organizer, email } =
        req.body;

      // Check if all required fields are provided
      if (
        !description ||
        !slotArray ||
        !title ||
        !noOfSpeakers ||
        !organizer ||
        !email
      ) {
        return errorHandler(
          res,
          "Some fields are still blank. Could you please provide the missing details?",
          400
        );
      }

      // Initialize an array to hold the events to be created
      let eventsToCreate = [];

      // Loop through the slots in the slotArray
      for (let slotId of slotArray) {
        const slot = await Slot.findById(slotId);
        if (!slot) {
          return errorHandler(res, `Slot with id ${slotId} not found.`, 404);
        }

        // Ensure the slot is available for booking
        if (slot.bookingStatus !== "open") {
          return errorHandler(
            res,
            `Slot with details ${slot.date}, ${slot.timeSpan} is not open. Please select a different slot.`,
            409
          );
        }

        // Create a new event object
        const newEvent = new Event({
          organizer,
          title,
          description,
          noOfSpeakers,
          preferredSlotId: slotId,
          pavillionSlotId: slotId,
          start: slot.start,
          end: slot.end,
          date: slot.date,
          ...req.body,
        });

        // Add the new event to the eventsToCreate array
        eventsToCreate.push(newEvent);
      }

      // Save events and slots only if all events are successfully created
      let savedEvents = [];
      for (let event of eventsToCreate) {
        const savedEvent = await event.save(); // Save event
        const slot = await Slot.findById(savedEvent.pavillionSlotId); // Retrieve the slot by pavillionSlotId

        // Update the slot's status and title
        if (slot) {
          slot.bookingStatus = "pending"; // Update slot status
          slot.title = title; // Update slot title
          await slot.save(); // Save the updated slot
        }

        savedEvents.push(savedEvent);
      }

      // Calculate the total amount for the invoice
      const amount = savedEvents.length * 1000000;

      await Invoice.create({
        amount,
        eventIds: savedEvents.map((event) => event._id),
      });

      // Send an email with the invoice details
      await sendInvoiceEmail(
        email,
        organizer,
        amount.toLocaleString(),
        savedEvents
      );

      // Respond with success message and saved events
      return successHandler(
        res,
        "Your request has been successfully submitted. An invoice has been sent to your email. Kindly review the details and complete the payment within 24 hours to secure your slot. Failure to do so will result in the cancellation of your request.",
        savedEvents
      );
    } catch (error) {
      console.log(error);
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  createEventByAdmin: async (req, res) => {
    let bookedBy = req.admin;
    try {
      const { title, pavillionSlotId, organizer } = req.body;

      // Check if required fields are provided
      if (!title || !pavillionSlotId || !organizer) {
        return errorHandler(
          res,
          "Some fields are still blank. Could you please provide the missing details?",
          400
        );
      }

      const slot = await Slot.findById(pavillionSlotId);
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
      slot.bookedBy = bookedBy;
      slot.title = title;
      await slot.save();

      // Send success response
      return successHandler(res, "Meeting Successfully Scheduled.", newEvent);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
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
          .sort({ createdAt: 1 })
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
  getOrganizationSideEvent: async (req, res) => {
    try {
      const organizerId = req.user;
      let event = await Event.find({ organizerId })
        .populate("preferredSlotId")
        .populate("pavillionSlotId")
        .sort({ dat: 1 });

      const response = event;
      return successHandler(res, "Organization Side Events Found", response);
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
      let update = req.body;

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
      currentSlot.bookedBy = null;
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
      newSlot.bookedBy = req.admin; // Assuming req.admin holds the admin ID
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

      // await Promise.all(
      //   approvedDelegates.map(async (delegate) => {
      //     try {
      //       await sendEmail(
      //         delegate.email,
      //         delegate.name,
      //         "",
      //         subject,
      //         message1,
      //         message2
      //       );
      //     } catch (emailError) {
      //       console.error(
      //         `Failed to send email to ${element.email}:`,
      //         emailError
      //       );
      //     }
      //   })
      // );

      return successHandler(res, "Side Event Successfully Rescheduled", event);
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
      if (!event) {
        return errorHandler(res, "No Event found with the ID", 404);
      }

      // Find the associated Slot by pavillionSlotId
      const slot = await Slot.findById(event.pavillionSlotId);
      if (!slot) {
        return errorHandler(res, "No Slot found for the event.", 404);
      }

      // Update the slot status and title
      slot.bookingStatus = "open"; // Set the slot's booking status to 'open'
      slot.title = ""; // Clear the slot's title

      // Save the updated slot
      await slot.save();

      // Delete the event entry
      await Event.deleteOne({ _id: id });

      return successHandler(
        res,
        "Event Deleted and Slot status updated to open"
      );
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
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
  uploadProof: async (req, res) => {
    const organizerId = req.user;

    upload(req, res, async (err) => {
      if (err) {
        return errorHandler(res, err.message || "File upload error", 400);
      }

      try {
        const { files } = req;

        // Find all events for the organizer
        const events = await Event.find({ organizerId });
        if (!events || events.length === 0) {
          return errorHandler(res, "No events found.", 404);
        }

        // Handle image uploads
        let image;
        if (files && files.length > 0) {
          const file = files[0];

          // Upload to Cloudinary
          const uploadResult = await uploadToCloudinary(
            file.path,
            file.filename,
            "COP29 Events"
          );
          image = uploadResult.url;
        }

        // If there's an image, update all events with proof of payment
        if (image) {
          const updatedEvents = await Promise.all(
            events.map(async (event) => {
              if (!Array.isArray(event.proofOfPayment)) {
                event.proofOfPayment = [];
              }
              event.proofOfPayment.push(image);
              return event.save();
            })
          );

          // Send success response with updated events
          return successHandler(res, "Proof of Payment successfully added.");
        } else {
          return errorHandler(res, "No proof of payment file uploaded.", 400);
        }
      } catch (error) {
        return errorHandler(res, error.message, error.statusCode || 500);
      }
    });
  },
  uploadProofByAdmin: async (req, res) => {
    const { id } = req.params;

    upload(req, res, async (err) => {
      if (err) {
        return errorHandler(res, err.message || "File upload error", 400);
      }

      try {
        const { files } = req;

        // Find all events for the organizer
        const events = await Event.find({ _id: id });
        if (!events || events.length === 0) {
          return errorHandler(res, "No events found.", 404);
        }

        // Handle image uploads
        let image;
        if (files && files.length > 0) {
          const file = files[0];

          // Upload to Cloudinary
          const uploadResult = await uploadToCloudinary(
            file.path,
            file.filename,
            "COP29 Events"
          );
          image = uploadResult.url;
        }

        // If there's an image, update all events with proof of payment
        if (image) {
          const updatedEvents = await Promise.all(
            events.map(async (event) => {
              if (!Array.isArray(event.proofOfPayment)) {
                event.proofOfPayment = [];
              }
              event.proofOfPayment.push(image);
              return event.save();
            })
          );

          // Send success response with updated events
          return successHandler(res, "Proof of Payment successfully added.");
        } else {
          return errorHandler(res, "No proof of payment file uploaded.", 400);
        }
      } catch (error) {
        return errorHandler(res, error.message, error.statusCode || 500);
      }
    });
  },
};
