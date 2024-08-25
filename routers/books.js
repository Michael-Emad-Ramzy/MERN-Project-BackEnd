const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const multer = require("multer");
const path = require("path");
const verfiyToken = require("../middleware/verfiyToken");
const allowedTo = require("../middleware/allowedTo");
const cloudinary = require("cloudinary").v2;

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

router.route("/books").get(bookController.getAllBooks).post(
  // verfiyToken,
  // allowedTo("ADMIN"),
  upload.single("image"),
  bookController.addNewBook
);

router
  .route("/books/:id")
  .get(bookController.getSingleBook)
  .post(bookController.addReview)
  .patch(verfiyToken, allowedTo("ADMIN"), bookController.updateBook)
  .delete(verfiyToken, allowedTo("ADMIN"), bookController.deleteBook);

module.exports = router;
