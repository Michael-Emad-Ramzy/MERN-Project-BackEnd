const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.js");
const {
  categoryNameValidation,
  validationresult,
} = require("../middleware/category-validation.js");

router
  .route("/categories")
  .get(categoryController.getAllCategory)
  .post(
    categoryNameValidation,
    validationresult,
    categoryController.createNewCategory
  );
router
  .route("/categories/:id")
  .get(categoryController.getSingleCategory)
  .patch(
    categoryNameValidation,
    validationresult,
    categoryController.updateCategory
  )
  .delete(categoryController.deleteCategory);

module.exports = router;
