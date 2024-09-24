const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    messageType: {
      type: String,
      enum: ["international", "contact"],
      default: "international",
    },
    reasonForMeeting: { type: String, required: true },
    preferredDateTime: { type: Date },
    isRead: {
      type: Boolean,
      default: false,
    },
    readBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id?.toString();
        delete ret.__v;
        delete ret._id;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
