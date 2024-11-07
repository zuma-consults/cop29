const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    amount: { type: String },
    paid: { type: Boolean, default: false },
    eventIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Side-Events",
    }],
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

module.exports = mongoose.model("Invoice", InvoiceSchema);
