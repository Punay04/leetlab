import mongoose from "mongoose";

async function coonectDb() {
  const mongodbUrl = process.env.MONGODB_URI;

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

export default coonectDb;
