const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "category",
  },
  authorId: {
    type: mongoose.Schema.ObjectId,
    ref: "author",
  },
});

module.exports = mongoose.model("Book", bookSchema);
