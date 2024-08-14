require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const url = process.env.mongo_url;
const path = require("path");

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

//routers
app.use("/", require("./routers/books"));
app.use("/", require("./routers/upload"));
app.use("/", require("./routers/category"));
app.use("/", require("./routers/author"));

// middel ware for not find routes
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: "ERROR", message: "No route defined for this :(" });
});

app.listen(process.env.port || 3000, () => {
  console.log(`port ${process.env.port} listen`);
});
