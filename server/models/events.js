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
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    externalLink: {
      type: String,
    },
    price: {
      type: String,
      default: "Free",
    },
    description: {
      type: String,
    },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slots" },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
    invoiceUrl: {
      type: String,
    },
    invoiceStatus: {
      type: String,
      enum: [
        "draft", // Invoice is not yet sent
        "proof-pending", // Awaiting proof of payment from the user
        "proof-received", // Proof of payment received
        "proof-confirmed", // Proof of payment confirmed
        "approved", // Payment has been approved
        "declined", // Payment has been declined
      ],
      default: "draft",
    },
    status: {
      type: String,
      enum: ["processing", "approved", "declined"],
      default: "processing",
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
    tags: {
      type: [String],
      default: [],
    },
    countId: {
      type: Number,
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
eventSchema.plugin(AutoIncrement, { inc_field: "id" });

const Event = mongoose.model("Events", eventSchema);

module.exports = Event;
