import mongoose, { Schema } from "mongoose";

const roles = {
  values: ["USER", "ADMIN"],
  message: "{VALUE} role not valid",
};

const userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  date: { type: Date, default: Date.now },
  role: { type: String, default: "USER", enum: roles },
  active: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);

export default User;