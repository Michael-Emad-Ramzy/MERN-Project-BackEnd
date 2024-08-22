const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.js");
const {
  categoryNameValidation,
  validationresult,
} = require("../middleware/category-validation.js");
const verfiyToken = require("../middleware/verfiyToken.js");
const allowedTo = require("../middleware/allowedTo.js");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage });

router
  .route("/categories")
  .get(categoryController.getAllCategory)
  .post(
    upload.single("image"),
    categoryNameValidation,
    validationresult,
    verfiyToken,
    allowedTo("ADMIN"),
    categoryController.createNewCategory
  );
router
  .route("/categories/:id")
  .get(categoryController.getSingleCategory)
  .patch(
    upload.single("image"),
    categoryNameValidation,
    validationresult,
    verfiyToken,
    allowedTo("ADMIN"),
    categoryController.updateCategory
  )
  .delete(verfiyToken, allowedTo("ADMIN"), categoryController.deleteCategory);

router.get("/categories/:id/books", categoryController.getBooksByCategory);

module.exports = router;
