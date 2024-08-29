const Message = require("../models/message");
const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");

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

      const findMessage = await Message.findOne({ email });

      if (findMessage) {
        return errorHandler(res, "Organization has sent a Message.", 409);
      }

      const newMessage = new Message({
        name,
        email,
        messageType: "international",
        phone,
        reasonForMeeting,
        preferredDateTime,
      });
      await newMessage.save();
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

      const findMessage = await Message.findOne({ email });

      if (findMessage) {
        return errorHandler(res, "Message Sent.", 409);
      }

      const newMessage = new Message({
        name,
        email,
        messageType: "contact",
        phone,
        reasonForMeeting: message,
      });
      await newMessage.save();
      return successHandler(res, "Message Sent.");
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
};
