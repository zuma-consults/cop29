const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    state: {
      type: String,
    },
    contactIdCard: {
      type: String,
      required: true,
    },
    workStream: {
      type: String,
    },
    thematicArea: {
      type: String,
      required: true,
    },
    reasonForAttendance: {
      type: String,
    },
    documentSupportingAttendance: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "suspended", "rejected"],
      default: "pending",
    },
    userType: {
      type: String,
      enum: ["organization"],
      default: "organization",
    },
    organizationType: {
      type: String,
    },
    contactDesignation: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    delegates: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          phone: {
            type: String,
            required: true,
          },
          designation: {
            type: String,
            required: true,
          },
          passport: {
            type: String,
            required: true,
          },
          delegatedBy: {
            type: String,
            required: true,
          },
          copApproved: {
            type: Boolean,
            default: false,
          },
          copRejected: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    letterProof: {
      type: String,
    },
    terms: {
      type: Boolean,
      default: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
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

const User = mongoose.model("Users", userSchema);

module.exports = User;
