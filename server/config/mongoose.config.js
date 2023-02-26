import mongoose from "mongoose";
import { logEvents } from "../middleware/logger.js";

const connectDB = async (DB) => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `\nMongoDB Connected: ${conn.connection.host} with database "${conn.connection.name}"`
    );
  } catch (error) {
    console.error("\nERROR:", error, "\n");
  }
};

mongoose.connection.on("error", (err) => {
  console.error("\nERROR:", err);
  logEvents(
    `\n${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

export default connectDB;
