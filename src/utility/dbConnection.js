require("dotenv").config();
const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);

let db; // cache the db

async function connectDB() {
  if (db) return db; // reuse connection

  try {
    await client.connect();
    console.log("✅ MongoDB connected successfully");

    db = client.db(); // OR client.db("Event-mangement-system")
    console.log("Connected DB:", db.databaseName);

    return db; // ✅ THIS WAS MISSING
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

module.exports = { connectDB };
