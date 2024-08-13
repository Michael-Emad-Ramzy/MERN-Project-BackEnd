const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.js");

router
  .route("/categories")
  .get(categoryController.getAllCategory)
  .post(categoryController.createNewCategory);
router
  .route("/categories/:id")
  .get(categoryController.getSingleCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
