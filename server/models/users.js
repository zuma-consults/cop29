const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
    category: {
      type: String,
    },
    state: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "suspended"],
      default: "approved",
    },
    userType: {
      type: String,
      enum: ["delegate", "organization"],
      default: "delegate",
    },
    organizationType: {
      type: String,
      enum: ["CSO", "MDA", "NGO"],
    },
    countId: {
      type: Number,
      unique: true,
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

userSchema.plugin(AutoIncrement, { inc_field: "countId" });

const User = mongoose.model("Users", userSchema);

module.exports = User;
