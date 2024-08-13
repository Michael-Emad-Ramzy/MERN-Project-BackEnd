const category = require("../models/category");

const getAllCategory = async (req, res) => {
  const categories = await category.find({}, { __v: false });
  res.json({ status: "Success", data: { categories } });
};

const getSingleCategory = async (req, res) => {
  try {
    const Category = await category.findById(req.params.id);
    if (!Category) {
      return res
        .status(404)
        .json({ status: "Success", data: { category: "category not found" } });
    }
    return res.json({
      status: "Success",
      data: { Category },
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: "Fail", data: "Null", message: e.message, code: 400 });
  }
};

const createNewCategory = async (req, res) => {
  try {
    const newCategory = category(req.body);
    await newCategory.save();
    res.status(201).json({ status: "success", data: { newCategory } });
  } catch (e) {
    res
      .status(500)
      .json({ status: "Fail", data: "Null", message: e.message, code: 400 });
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const updatedcategory = await category.updateOne(
      { _id: categoryId },
      { $set: { ...req.body } }
    );
    return res
      .status(200)
      .json({ status: "Success", data: { updatedcategory } });
  } catch (e) {
    return res
      .status(400)
      .json({ status: "Fail", data: "Null", message: e.message });
  }
};

const deleteCategory = async (req, res) => {
  await category.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: "Success", data: "Null" });
};

module.exports = {
  getAllCategory,
  getSingleCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
