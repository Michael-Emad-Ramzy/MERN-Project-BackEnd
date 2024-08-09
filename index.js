require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const url = process.env.mongo_url;
const book = require("./models/books");
//connect to database
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error("could not connect to MongoDB", err);
  });

app.use(cors());
app.use(express.json());

// app.get("/home", async (req, res) => {
//   const books = await book.find();
//   res.json({ status: "success", data: { books } });
// });

//middel ware for not find routes
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: "ERROR", message: "No route defined for this :(" });
});

app.listen(process.env.port, () => {
  console.log(`port ${process.env.port} listen`);
});
