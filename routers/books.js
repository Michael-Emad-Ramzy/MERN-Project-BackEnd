const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

router
  .route("/books")
  .get(bookController.getAllBooks)
  .post(bookController.addNewBook);

router.route("/books/:id").get(bookController.getSingleBook);

module.exports = router;
