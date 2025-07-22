import mongoose from "mongoose";
import { IOrder } from "../types/interfaces";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: Number,
        priceAtPurchase: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentIntentId: String,
    shippingAddress: String,
    delivered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
