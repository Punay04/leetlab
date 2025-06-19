import mongoose from "mongoose";

async function connectDb() {
  const mongodbUrl = process.env.NEXT_PUBLIC_MONGODB_URL;

  if (!mongodbUrl) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  try {
    await mongoose.connect(mongodbUrl);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default connectDb;
