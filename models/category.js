const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 25,
  },
});

module.exports = mongoose.model("category", categorySchema);
