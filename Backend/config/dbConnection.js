const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function connectDb() {
  try {
    await mongoose.connect(process.env.Db_URI);
    console.log("Connected to db")
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

module.exports = connectDb;