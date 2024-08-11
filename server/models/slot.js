const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    timeSpan: { type: String, required: true, unique: true },
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

module.exports = mongoose.model("Slots", SlotSchema);
