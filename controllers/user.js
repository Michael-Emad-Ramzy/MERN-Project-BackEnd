const { get } = require("mongoose");

const User = require("../models/user");
const Book = require("../models/books");

const { query } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateJWT.js");
const AppError = require("../utils/AppError.js");

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
    const { firstName, lastName, email, password, role } = req.body;

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
      role,
      avatar: req.file.filename,
    });

    const token = await generateToken({
      email: newUser.email,
      _id: newUser._id,
      role: newUser.role,
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
      const token = await generateToken({
        email: user.email,
        _id: user._id,
        role: user.role,
      });

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
/////////////////////////add a book to the user//////////////////////////
const addUSerBook = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    const newBook = user.books.find(
      (book) => book.bookId == req.params.id ?? book.book
    );
    if (newBook) throw new Error("Already added book!, choose another!");
    const book = await Book.findById(req.params.id);
    if (!book) throw new Error("Unknown book!");

    user.books.push({
      bookId: book._id,
      rate: 0,
    });
    user.save();
    res.status(200).json(user);
  } catch (error) {
    AppError.create(error.meassage, 400)
  }
};

////////////////////////get one user book////////////////////////
const getUserOneBook = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    const targetBook = user.books.find(
      (book) => book.book._id == req.params.id ?? book.book
    );
    res.status(200).json(targetBook);
  } catch (error) {
    AppError.create(error.meassage, 400)
  }
};


//////////////////update the user book shelve//////////////////////
const updateBookShelve = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    const shelve = req.body.shelve;

    const targetBook = user.books.find(
      (book) => book.bookId == req.params.id ?? book.book
    );
    if (!targetBook) throw new Error("Unknown book!");

    targetBook.shelve = shelve;
    await user.save();

    return res.status(200).json({
      successMessage: "Book shelve updated successfully",
      updatedBook: targetBook,
    });
  } catch (error) {
    AppError.create(error.meassage, 400)
  }
};


module.exports = {
  getAllUsers,
  register,
  login,
  addUSerBook,
  getUserOneBook,
  updateBookShelve,
};
