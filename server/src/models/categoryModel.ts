import mongoose from "mongoose";
import { ICategory } from "../types/interfaces";

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("category", categorySchema);
