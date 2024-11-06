const mongoose = require("mongoose");

//mongodb connection function
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to DB ${mongoose.connection.host}`.bgWhite);
  } catch (error) {
    console.error("DB Error", error);
  }
};

module.exports = { connectDb };
