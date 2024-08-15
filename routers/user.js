const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const verfiyToken = require("../middleware/verfiyToken")

router
  .route("/")
  .get(verfiyToken,userController.getAllUsers)

  router
  .route("/register")
  .post(userController.register);

  router
  .route("/login")
  .post(userController.login);

module.exports = router;
