const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("🎉mongo db connected successfully", conn.connection.host);
  } catch (error) {
    console.error(`🌵 Connect db error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
