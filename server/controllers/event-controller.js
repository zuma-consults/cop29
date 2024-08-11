const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");
const Event = require("../models/events");
const Slot = require("../models/slot");
const PAGE_SIZE = 12;
const { upload, uploadToCloudinary } = require("../utils/upload");
const NodeCache = require("node-cache");
const User = require("../models/users");
const myCache = new NodeCache();

module.exports = {
  createEventByOrganization: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return errorHandler(res, err.code, 400);
      } else {
        try {
          const { body, files } = req;
          let { title, date, slotId, start, end } = body;
          const organizerId = req.user;
          // Check if required fields are provided
          if (!title || !date) {
            return errorHandler(
              res,
              "Some fields are still blank. Could you please provide the missing details?",
              400
            );
          }

          if ((start, end)) {
            const existingEvent = await Event.findOne({ start, end, date });
            if (existingEvent) {
              return errorHandler(
                res,
                "An event exists with for the same time and date.",
                400
              );
            }
          }

          let organizer = await User.findOne({ _id: organizerId });

          // If slotId is present, get start and end times from the slot
          if (slotId) {
            const existingEvent = await Event.findOne({ slotId, date });
            if (existingEvent) {
              return errorHandler(
                res,
                "An event for the same slot and date already exists.",
                400
              );
            }
            const slot = await Slot.findOne({ _id: slotId });
            if (slot) {
              const result = getStartAndEndTime(slot.timeSpan);
              if (result) {
                start = result.start;
                end = result.end;
              } else {
                return errorHandler(
                  res,
                  "The provided slot ID does not correspond to a valid time span.",
                  400
                );
              }
            } else {
              return errorHandler(res, "Invalid slot ID provided.", 400);
            }
          }

          // Handle image uploads
          let image = "";
          if (files) {
            for (const file of files) {
              const localFilePath = file.path;
              const localFileName = file.filename;

              const uploadResult = await uploadToCloudinary(
                localFilePath,
                localFileName,
                "COP29 Events"
              );
              image = uploadResult.url;
            }
          }

          // Update body with image URL and the resolved start and end times
          body.image = image;
          body.start = start;
          body.end = end;

          // Create new Event entry
          const newEvent = new Event({
            title,
            date,
            organizerId,
            organizer,
            ...body,
          });

          // Save newEvent
          await newEvent.save();

          // Send success response
          return successHandler(res, "Event Successfully Added.", newEvent);
        } catch (error) {
          return errorHandler(res, error.message, error.statusCode || 500);
        }
      }
    });
  },
  createEventByAdmin: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return errorHandler(res, err.code, 400);
      } else {
        try {
          const { body, files } = req;
          let { title, date, slotId, start, end } = body;
          // Check if required fields are provided
          if (!title || !date) {
            return errorHandler(
              res,
              "Some fields are still blank. Could you please provide the missing details?",
              400
            );
          }

          if ((start, end)) {
            const existingEvent = await Event.findOne({ start, end, date });
            if (existingEvent) {
              return errorHandler(
                res,
                "An event exists with for the same time and date.",
                400
              );
            }
          }

          // If slotId is present, get start and end times from the slot
          if (slotId) {
            const existingEvent = await Event.findOne({ slotId, date });
            if (existingEvent) {
              return errorHandler(
                res,
                "An event for the same slot and date already exists.",
                400
              );
            }
            const slot = await Slot.findOne({ _id: slotId });
            if (slot) {
              const result = getStartAndEndTime(slot.timeSpan);
              if (result) {
                start = result.start;
                end = result.end;
              } else {
                return errorHandler(
                  res,
                  "The provided slot ID does not correspond to a valid time span.",
                  400
                );
              }
            } else {
              return errorHandler(res, "Invalid slot ID provided.", 400);
            }
          }

          // Handle image uploads
          let image = "";
          if (files) {
            for (const file of files) {
              const localFilePath = file.path;
              const localFileName = file.filename;

              const uploadResult = await uploadToCloudinary(
                localFilePath,
                localFileName,
                "COP29 Events"
              );
              image = uploadResult.url;
            }
          }

          // Update body with image URL and the resolved start and end times
          body.image = image;
          body.start = start;
          body.end = end;

          // Create new Event entry
          const newEvent = new Event({
            title,
            date,
            ...body,
          });

          // Save newEvent
          await newEvent.save();

          // Send success response
          return successHandler(res, "Event Successfully Added.", newEvent);
        } catch (error) {
          return errorHandler(res, error.message, error.statusCode || 500);
        }
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
      let cacheKey = `allEvents-${searchTerm}-${price}-${location}-${status}-${startDate}-${endDate}`;
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
        events = myCache.get(cacheKey);
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
    upload(req, res, async (err) => {
      if (err) {
        return errorHandler(res, err.code, 400);
      } else {
        try {
          const id = req.params.id;
          const { body, files } = req;

          // Handle file uploads
          let reqFiles = [];
          if (files) {
            reqFiles = await Promise.all(
              files.map(async (file) => {
                const localFilePath = file.path;
                const localFileName = file.filename;
                const result = await uploadToCloudinary(
                  localFilePath,
                  localFileName,
                  "COP29 Events"
                );
                return result.url;
              })
            );
          }

          // Add uploaded file URLs to req.body
          body.image = reqFiles[0] || [process.env.DEFAULT_IMAGE];
          // reqFiles.length > 0 ? reqFiles : [process.env.DEFAULT_IMAGE];

          let update = {
            features: featureArray,
            landmarks: landmarksArray,
            ...body,
          };

          const event = await Event.findOneAndUpdate({ _id: id }, update, {
            new: true,
          });

          if (!event)
            return errorHandler(res, "No Event found with the ID", 404);

          return successHandler(res, "Event Updated", event);
        } catch (error) {
          return errorHandler(res, error.message, error.statusCode || 500);
        }
      }
    });
  },
  addCommentToEventById: async (req, res) => {
    try {
      let by = req.user;
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
};

const getStartAndEndTime = (timeSpan) => {
  const slot = timeSlots.find((slot) => slot.timeSpan === timeSpan);

  if (!slot) {
    return null;
  }

  const [start, end] = slot.timeSpan.split(" to ").map((time) => time.trim());
  return { start, end };
};
