const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/my_contacts");
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Database connection failed", err);
  }
};

module.exports = databaseConnection;