const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function connectDb() {
  try {
    const connectPP = await mongoose.connect(process.env.Db_URI);
    console.log(connectPP)
    console.log("Connected to db")
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDb;