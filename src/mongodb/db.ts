import mongoose from "mongoose";

const db = mongoose.connection;

db.on("error", (err) => console.error("There was an error with MongoDB: ", err));

try {
  mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  console.error("Could not connect to MongoDB: ", err);
}
