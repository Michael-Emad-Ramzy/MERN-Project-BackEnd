const { check, validationResult } = require("express-validator");

exports.authorInformationConfirmation = [
  check("firstName").not().isEmpty().withMessage("firstName is reqired"),
  check("lastName").not().isEmpty().withMessage("lastName is reqired"),
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
