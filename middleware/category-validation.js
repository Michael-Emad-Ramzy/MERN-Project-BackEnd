const { check, validationResult } = require("express-validator");

exports.categoryNameValidation = [
  check("categoryName")
    .not()
    .isEmpty()
    .withMessage("categoryName is required")
    .isLength({ min: 3 })
    .withMessage("the categoryName must be at least 3 char")
    .isLength({ max: 15 })
    .withMessage("the categoryName must be 15 char at most"),
];

exports.validationresult = (req, res, next) => {
  const result = validationResult(req);
  const haserror = !result.isEmpty();

  if (haserror) {
    const firsterror = result.array()[0].msg;
    return res.status(400).json({
      errorMessage: firsterror,
    });
  }
  next();
};
