const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author.js");

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
    verfiyToken,
    allowedTo("ADMIN"),
    authorController.updateAuthor
  )
  .delete(verfiyToken, allowedTo("ADMIN"), authorController.deleteAuthor);

module.exports = router;
