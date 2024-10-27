const mongoose = require("mongoose");

const PavillionSlotSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    date: { type: Date, required: true },
    timeSpan: { type: String, required: true },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    bookingStatus: {
      type: String,
      default: "open",
      enum: ["pending", "booked", "open"],
    },
    bookedBy: {
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

module.exports = mongoose.model("Pavillion-Slots", PavillionSlotSchema);
