const book = require("../models/books");

const getAllBooks = async (req, res) => {
  const books = await book.find({}, { __v: false });
  res.json({ status: "success", data: { books } });
};

const getSingleBook = async (req, res) => {
  try {
    const Book = await book.findById(req.params.id);
    if (!Book) {
      return res
        .status(404)
        .json({ status: "Fail", data: { book: "book not found" } });
    }
    return res.json({ status: "Success", data: { Book } });
  } catch (e) {
    return res
      .status(400)
      .json({ status: "Fail", data: "Null", message: e.message, code: 400 });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBook = book(req.body);
    await newBook.save();
    res.status(201).json({ status: "Success", data: { newBook } });
  } catch (e) {
    res
      .status(500)
      .json({ status: "Fail", data: "Null", message: e.message, code: 400 });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addNewBook,
};
