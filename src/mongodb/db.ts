import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
