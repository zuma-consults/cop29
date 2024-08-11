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
      default: "+234",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    suspended: {
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

const Admin = mongoose.model("Staff", userSchema);

module.exports = Admin;
