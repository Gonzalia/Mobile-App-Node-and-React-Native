import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("CONNECTIONSTRINGHERE");
    console.log(">>>>> DB is connected");
  } catch (error) {
    console.error(error);
  }
};
