const express = require("express");
const router = express.Router();
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

//api/upload
router.post("/upload", upload.single("image"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    try {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      const newBook = new Book({
        title: req.body.title,
        image: result.secure_url,
        // categoryId: req.body.categoryId,
        // authorId: req.body.authorId,
      });
      await newBook.save();

      res.status(201).json({ status: "Success", data: { newBook } });
    } catch (e) {
      res
        .status(500)
        .json({ status: "Fail", data: "Null", message: e.message, code: 400 });
    }
  });
});

module.exports = router;
