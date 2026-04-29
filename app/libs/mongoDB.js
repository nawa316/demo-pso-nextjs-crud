import mongoose from "mongoose";

const connectMongoDB = async () => {
  const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URL or MONGODB_URI is not set");
  }
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};

export default connectMongoDB;
