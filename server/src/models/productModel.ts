import mongoose from "mongoose";
import { IProduct } from "../types/interfaces";

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [String],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    inStock: { type: Boolean, default: true },
    countInStock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
