import mongoose from "mongoose";
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION || "mongodb://127.0.0.1/cornidev";

mongoose.connect(MONGODB_CONNECTION, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
