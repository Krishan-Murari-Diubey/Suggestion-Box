import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(
      (process.env.MONGODB_URI as string) || ""
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("DB is connected succesfully");
  } catch (error) {
    console.log(error);
  }
}
export default dbConnect;
