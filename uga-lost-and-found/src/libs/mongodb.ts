import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    if (mongoose.connection.readyState === 0) {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(uri);
      console.log("Connected to MongoDB.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Propagate error to the API
  }
};

export default connectMongoDB;
