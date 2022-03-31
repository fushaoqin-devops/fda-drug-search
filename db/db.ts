import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (!MONGODB_URI) {
      throw new Error("Please define the db connection variable");
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((db) => {
      return db;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
