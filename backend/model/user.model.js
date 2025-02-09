import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    createdOn: { type: Date, default: new Date().getTime() },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
