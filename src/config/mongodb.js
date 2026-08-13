import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGO_DB_URL = process.env.Mongo_Db_URI;
const connectDb = async () => {
  try {
    const mongo = await mongoose.connect(MONGO_DB_URL);
    console.log("mongodbconnected sucessfuly");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDb


// process.exit() accepts an exit code.

// process.exit(0) → program ended successfully
// process.exit(1) → program ended because of an error/failure