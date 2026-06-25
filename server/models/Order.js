const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: Number, // MySQL ka integer id
      required: true,
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId, // MongoDB Product ke _id
        ref: "Product",
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
