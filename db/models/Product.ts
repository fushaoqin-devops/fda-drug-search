import mongoose from "mongoose";
import { v4 } from "uuid";

const ProductSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function genUUID() {
      return v4();
    },
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  review: {
    type: String,
  },
  ingredients: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema, "products");
