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

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your frontend's origin
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//   })
// );
const allowedOrigins = [
  "http://localhost:5173",
  // Add other allowed origins here
  "https://goodreadfdm.vercel.app",
  "https://goodreaditi.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json());

//routers
app.use("/", require("./routers/books"));
app.use("/", require("./routers/upload"));
app.use("/", require("./routers/category"));
app.use("/authors", require("./routers/author"));
app.use("/users", require("./routers/user"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin", require("./routers/admin"));

// middel ware for not find routes
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: "ERROR", message: "No route defined for this :(" });
});

app.listen(process.env.port || 3000, () => {
  console.log(`port ${process.env.port} listen`);
});
