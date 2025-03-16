const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function main() {
  try {
    await mongoose.connect(process.env.Db_URI);
  } catch (err) {
    console.log(err);
  }
}
