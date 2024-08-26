const express = require("express");
const router = express.Router();

const multer = require("multer");

const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5000"],
  })
);

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `user-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];
  if (fileType === "image") {
    return cb(null, true);
  } else {
    return cb(AppError.create("file must be an image", 400), false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter });

const userController = require("../controllers/user");
const verfiyToken = require("../middleware/verfiyToken");
const AppError = require("../utils/AppError");

router.route("/").get(
  // verfiyToken,
  userController.getAllUsers
);

router.route("/:id").get(userController.getUserById);
router
  .route("/register")
  .post(upload.single("avatar"), userController.register);

router.route("/login").post(userController.login);

router.route("/books/:id").post(verfiyToken, userController.addUSerBook);

router.route("/books/:id").post(verfiyToken, userController.updateBookShelve);

module.exports = router;
