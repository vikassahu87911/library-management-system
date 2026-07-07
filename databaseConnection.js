const mongoose = require("mongoose");

async function DbConnection() {
  try {
    const DB_URL = process.env.MONGO_URI;

    console.log("Connecting to MongoDB...");

    await mongoose.connect(DB_URL);

    console.log("DB Connected");
  } catch (error) {
    console.error("Connection Error:");
    console.error(error);
  }
}

module.exports = DbConnection;s = DbConnection;