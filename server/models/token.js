const mongoose = require("mongoose");

const UserTokenSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 1 * 86400, // 1 days
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const UserToken = mongoose.model("UserToken", UserTokenSchema);

module.exports = UserToken;
