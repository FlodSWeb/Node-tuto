const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/post.routes"));

app.listen(PORT, () => {
  console.log("****** SERVEUR CONNECTÉ ******".blue);
});
