const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    description: {
      type: String,
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slots",
      required: true,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["processing", "approved", "declined"],
      default: "approved",
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
    countId: {
      type: Number,
      default: 1,
      unique: true,
    },
    objective: {
      type: String,
    },
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

// Apply the AutoIncrement plugin to the schema
eventSchema.plugin(AutoIncrement, { inc_field: "countId" });

const Event = mongoose.model("Events", eventSchema);

module.exports = Event;
