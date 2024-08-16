const { query } = require("express");
const author = require("../models/author");

const getAllAuthors = async (req, res) => {
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  try {
    //     let authors;
    //     if (req.author.name) {
    //       authors = await author
    //         .find({ firstName: { $regex: req.author.name, $option: "i" } })
    //         .limit(limit)
    //         .skip(skip);
    //     } else {
    const authors = await author
      .find({}, { __v: false })
      .limit(limit)
      .skip(skip);
    // }
    res.json({ status: "success", data: { authors } });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};

const getOneAuthor = async (req, res) => {
  try {
    const oneAuthor = await author.findById(req.params.authorId);
    if (!oneAuthor) {
      return res
        .status(404)
        .json({ status: "Fail", data: { author: "Author not found" } });
    }
    return res.status(200).json({ status: "success", data: { oneAuthor } });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};

const addAuthor = async (req, res) => {
  try {
    const newAuthor = new author(req.body);
    await newAuthor.save();
    res.status(201).json({ status: "success", data: { newAuthor } });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await author.updateOne(
      { _id: req.params.authorId },
      { $set: { ...req.body } }
    );
    return res.status(200).json({ status: "success", data: { updatedAuthor } });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    await author.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: "Success", data: "Null" });
  } catch (e) {
    res.status(500).json({ errorMessage: e.message });
  }
};

module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
