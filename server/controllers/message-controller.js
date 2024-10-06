const Message = require("../models/message");
const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");
const sendMessageEmail = require("../utils/sendMessageEmail");
const moment = require("moment");

module.exports = {
  sendInternationalMessage: async (req, res) => {
    try {
      const { name, phone, reasonForMeeting, email, preferredDateTime } =
        req.body;
      if (
        !name ||
        !phone ||
        !email ||
        !reasonForMeeting ||
        !preferredDateTime
      ) {
        return errorHandler(
          res,
          "Please fill in all fields, one or more fields are empty!",
          400
        );
      }
      let dateTime = formattedDateTime(preferredDateTime);
      // const findMessage = await Message.findOne({ email });

      // if (findMessage) {
      //   return errorHandler(res, "Organization has sent a Message.", 409);
      // }

      const newMessage = new Message({
        name,
        email,
        messageType: "international",
        phone,
        reasonForMeeting,
        preferredDateTime,
      });
      await newMessage.save();
      let subject = "International Organization Meeting Request";
      sendMessageEmail(name, phone, reasonForMeeting, email, subject, dateTime);
      return successHandler(res, "Meeting Request Sent.");
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  sendContactMessage: async (req, res) => {
    try {
      const { name, phone, message, email } = req.body;
      if (!name || !phone || !email || !message) {
        return errorHandler(
          res,
          "Please fill in all fields, one or more fields are empty!",
          400
        );
      }

      // const findMessage = await Message.findOne({ email });

      // if (findMessage) {
      //   return errorHandler(res, "Message Sent.", 409);
      // }

      const newMessage = new Message({
        name,
        email,
        messageType: "contact",
        phone,
        reasonForMeeting: message,
      });
      await newMessage.save();
      let subject = "Contact Us Message";
      sendMessageEmail(name, phone, message, email, subject);
      return successHandler(res, "Message Sent.");
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getAllMessages: async (req, res) => {
    try {
      const { page = 1, limit = 5, messageType } = req.query;

      const messages = await Message.find({ messageType: messageType })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const totalMessages = await Message.countDocuments({
        messageType: messageType,
      });

      // Prepare the response with pagination info
      const response = {
        itemsPerPage: 5,
        totalPages: Math.ceil(totalMessages / limit),
        currentPage: parseInt(page),
        totalMessages,
        messages,
      };

      const message = `All ${messageType ? messageType : "Messages"} Found`;

      return successHandler(res, message, response);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
};

function formattedDateTime(timestamp) {
  const formattedDateTime = moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
  return formattedDateTime;
}
