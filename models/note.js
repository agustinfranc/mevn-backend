import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  description: String,
  user_id: String,
  date: { type: Date, default: Date.now },
  disabled: { type: Boolean, default: false },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
