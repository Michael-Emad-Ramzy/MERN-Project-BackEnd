const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.js");
const {
  categoryNameValidation,
  validationresult,
} = require("../middleware/category-validation.js");
const verfiyToken = require("../middleware/verfiyToken.js");
const allowedTo = require("../middleware/allowedTo.js");

router
  .route("/categories")
  .get(categoryController.getAllCategory)
  .post(
    categoryNameValidation,
    validationresult,verfiyToken,allowedTo("ADMIN"),
    categoryController.createNewCategory
  );
router
  .route("/categories/:id")
  .get(categoryController.getSingleCategory)
  .patch(
    categoryNameValidation,
    validationresult,verfiyToken,allowedTo("ADMIN"),
    categoryController.updateCategory
  )
  .delete(verfiyToken,allowedTo("ADMIN"),categoryController.deleteCategory);

module.exports = router;
