const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");
const multer = require("multer");
const path = require("path");
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

router
  .route("/books")
  .get(bookController.getAllBooks)
  .post(upload.single("image"), bookController.addNewBook);

router
  .route("/books/:id")
  .get(bookController.getSingleBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
