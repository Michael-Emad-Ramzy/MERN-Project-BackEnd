const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.js");
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
const {
  authorInformationConfirmation,
  validationresult,
} = require("../middleware/author-validation");
const verfiyToken = require("../middleware/verfiyToken.js");
const allowedTo = require("../middleware/allowedTo.js");

router
  .route("/")
  .get(authorController.getAllAuthors)
  .post(
    upload.single("image"),
    authorInformationConfirmation,
    validationresult,
    verfiyToken,
    allowedTo("ADMIN"),
    authorController.addAuthor
  );

router
  .route("/:id")
  .get(authorController.getOneAuthor)
  .patch(
    upload.single("image"),
    authorInformationConfirmation,
    validationresult,
    verfiyToken,
    allowedTo("ADMIN"),
    authorController.updateAuthor
  )
  .delete(verfiyToken, allowedTo("ADMIN"), authorController.deleteAuthor);

module.exports = router;
