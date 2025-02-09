import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URL);
    console.log("Databse connected ");
  } catch (error) {
    console.log("Database connecting error", error);
  }
};
