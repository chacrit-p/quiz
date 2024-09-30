import mongoose from "mongoose";

export const connectToMongoDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 0) {
      console.log("Already connected to MongoDB");
      return;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
};
