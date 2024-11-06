const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const {
      username,
      password,
      address = null,
      phone,
      email,
      answer,
    } = req.body;
    if (!username || !password || !phone || !email || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User already registered",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({
      username,
      password: hashedPassword,
      address,
      phone,
      email,
      answer,
    });
    user.password = undefined;
    res.status(201).send({
      success: true,
      message: "User successfully registered",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      err,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      err,
    });
  }
};

module.exports = { registerController, loginController };
