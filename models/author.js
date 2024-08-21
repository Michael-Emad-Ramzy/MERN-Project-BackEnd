const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "No Photo",
  },
  dateOfBirth: {
    type: Date,
  },
  disc: {
    type: String,
  },
});

module.exports = mongoose.model("author", authorSchema);
