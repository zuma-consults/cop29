const mongoose = require("mongoose");

const sideEventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
    },
    noOfSpeakers: {
      type: String,
      required: true,
    },
    date: { type: Date, required: true },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    description: {
      type: String,
    },
    pavillionSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pavillion-Slots",
    },
    preferredSlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pavillion-Slots",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    organizer: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          default: Date.now,
        },
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Staff",
        },
      },
    ],
    reportFile: {
      type: String,
    },
    reportStatus: {
      type: String,
      enum: ["Not Received", "Received"],
      default: "Not Received",
    },
    summaryFile: {
      type: String,
    },
    summaryStatus: {
      type: String,
      enum: ["Not Received", "Received"],
      default: "Not Received",
    },
    statusChangedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    proofOfPayment: [{
      type: String,
    }],
  },
  {
    toJSON: {
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

const SideEvent = mongoose.model("Side-Events", sideEventSchema);

module.exports = SideEvent;
