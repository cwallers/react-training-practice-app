import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  complete: { type: Boolean, required: true },
  userEmail: { type: String, required: true }
});

export default mongoose.model("Todo", schema);
