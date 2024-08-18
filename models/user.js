const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last Name is required"],
  },
  email: {
    type: String,
    required: true,
    required: [true, "email is required"],
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    validate: [validator.isStrongPassword, "please enter a strong password"],
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  avatar: {
    type: String,
    default:'uploads/profile.png'
  },
  books: [
    {
      bookId: {
        type: mongoose.Schema.ObjectId,
        ref: "books",
      },
      rate: {
        type: Number,
        default: 0,
        max: 5,
      },
      reviews: {
        type: [String],
      },
      shelve: {
        type: String,
        default: "want to read",
        enum: ["read", "reading", "want to read"],
      },
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
