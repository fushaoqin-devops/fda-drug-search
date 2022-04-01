import mongoose from "mongoose";
import { v4 } from "uuid";

const IngredientSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function genUUID() {
      return v4();
    },
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  products: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Ingredient ||
  mongoose.model("Ingredient", IngredientSchema, "ingredients");
