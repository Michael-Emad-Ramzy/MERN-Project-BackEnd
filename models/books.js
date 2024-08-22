const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "category",
    required: true,
  },
  authorId: {
    type: mongoose.Schema.ObjectId,
    ref: "author",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  desc: {
    type: String,
  },
});

module.exports = mongoose.model("Book", bookSchema);
