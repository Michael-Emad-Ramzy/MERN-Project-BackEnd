const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.js");

const {
  authorInformationConfirmation,
  validationresult,
} = require("../middleware/author-validation");

router
  .route("/")
  .get(authorController.getAllAuthors)
  .post(
    authorInformationConfirmation,
    validationresult,
    authorController.addAuthor
  );

router
  .route("/:id")
  .get(authorController.getOneAuthor)
  .patch(
    authorInformationConfirmation,
    validationresult,
    authorController.updateAuthor
  )
  .delete(authorController.deleteAuthor);

module.exports = router;
