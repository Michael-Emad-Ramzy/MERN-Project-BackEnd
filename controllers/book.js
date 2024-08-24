const book = require("../models/books");
const cloudinary = require("cloudinary").v2;

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

const addNewBook = function (req, res) {
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    try {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      const newBook = new book({
        title: req.body.title,
        image: result.secure_url,
        desc: req.body.desc,
        categoryId: req.body.categoryId,
        authorId: req.body.authorId,
        rating: req.body.rating,
      });
      await newBook.save();

      res.status(201).json({ status: "Success", data: { newBook } });
    } catch (e) {
      res
        .status(500)
        .json({ status: "Fail", data: "Null", message: e.message, code: 400 });
    }
  });
};

const updateBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    let updateData = { ...req.body };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;
    }

    const updatedBook = await book.updateOne(
      { _id: bookId },
      { $set: updateData }
    );
    return res.status(200).json({ status: "success", data: { updatedBook } });
  } catch (e) {
    return res
      .status(400)
      .json({ status: "Fail", data: "Null", message: e.message });
  }
};

const deleteBook = async (req, res) => {
  await book.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: "Success", data: "Null" });
};

const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewerName, rating, comment } = req.body;

    const newReview = {
      reviewerName,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };

    const updatedBook = await book.findByIdAndUpdate(
      id,
      {
        $push: {
          reviews: newReview,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res
        .status(404)
        .json({ status: "Fail", data: { book: "Book not found" } });
    }

    res.status(200).json({ status: "Success", data: newReview });
  } catch (e) {
    res.status(400).json({ status: "Fail", data: "Null", message: e.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addNewBook,
  updateBook,
  deleteBook,
  addReview,
};
