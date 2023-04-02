const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoute");

app.use(express.json());

const PORT = 3001;
const MONGO_URI =
  "mongodb+srv://guruprasath7702:GPguru5502@cluster0.urhbd1y.mongodb.net/test";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.get("/", (req, res) => {
      res.send("HELLO");
     });
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/users", userRoutes);
