const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI);
    console.log("****** MongoDB connecté ******".magenta);
  } catch (err) {
    console.log("err");
    process.exit();
  }
};

module.exports = connectDB;
