const { query } = require("express");
const author = require("../models/author");

const getAllAuthors = async (req, res) => {
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const authors = await author.find({}, { __v: false }).limit(limit).skip(skip);

  res.json({status:"success",data:{authors}});
};
