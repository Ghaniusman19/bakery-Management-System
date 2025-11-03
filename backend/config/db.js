import mongoose from "mongoose";
const MONGO_URL =
  "mongodb+srv://meanapp:meanapp123@cluster00.xid37zr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster00";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.log("mongo db is not connected !", error);
  }
};

export default connectDB;
