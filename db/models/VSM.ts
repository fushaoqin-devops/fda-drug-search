import mongoose from "mongoose";

const VSMSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxlength: 100,
  },
  magnitude: {
    type: Number,
    required: true,
  },
  products: {
    type: String,
    required: true,
  },
});

export default mongoose.models.VSM || mongoose.model("VSM", VSMSchema, "vsm");
