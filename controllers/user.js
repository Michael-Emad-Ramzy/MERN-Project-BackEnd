const { get } = require("mongoose");
const User = require("../models/user");
const { query } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//generate JWT token function
const generateToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "5m",
  });
  return token;
};

/////////////////////////get all users///////////////////////////
const getAllUsers = async (req, res) => {
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  try {
    const users = await User.find({}, { __v: false, password: false })
      .limit(limit)
      .skip(skip);
    res.json({ status: "success", data: { users } });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};

////////////////////////register///////////////////////////
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(400).json({ errorMessage: "user already exist" });
    }
    //password hashing
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = await generateToken({
      email: newUser.email,
      _id: newUser._id,
    });
    newUser.token = token;

    await newUser.save();
    res.status(201).json({ status: "success", data: { user: newUser } });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};

////////////////////////login/////////////////////////
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(400)
        .json({ errorMessage: "Email and password are required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ errorMessage: "User not found" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (user && matchedPassword) {
      // "Logged in successfully"
      const token = await generateToken({ email: user.email, _id: user._id });

      return res.status(200).json({
        status: "success",
        meassage: "logged in successfully",
        data: { token: token },
      });
    } else {
      return res
        .status(400)
        .json({ errorMessage: "Email or password doesn't match" });
    }
  } catch (e) {
    return res.status(500).json({ errorMessage: e.message });
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
};
