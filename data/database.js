import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "asigndb",
    });
    console.log(`Database Connected with ${res.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
