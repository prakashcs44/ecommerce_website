require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user.js");
const { prompt } = require("enquirer");



mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    createAdmin();
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

async function createAdmin() {
  try {
    const response = await prompt([
      { type: "input", name: "email", message: "Please enter your email:" },
      { type: "password", name: "password", message: "Please enter your password:" },
      { type: "input", name: "name", message: "Please enter your name:" },
    ]);

    const admin = new User({
      email: response.email,
      password: response.password,
      name: response.name,
      role:"admin",
    });

    await admin.save();
    console.log("Admin user created successfully.");
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
}
