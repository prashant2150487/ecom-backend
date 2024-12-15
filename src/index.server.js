const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.js");
const adminRouter = require("./routes/admin/auth.js");

const app = express();
dotenv.config();

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", adminRouter);
app.get("/api", (req, res) => {
  res.send("Hello, World! Welcome to my Node.js server.");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
 