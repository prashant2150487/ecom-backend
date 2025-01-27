const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//routes

const authRouter = require("./routes/auth.js");
const adminRouter = require("./routes/admin/auth.js");
const categoryRouter = require("./routes/category.js");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Middleware
app.use(express.json());

// Routes

app.use("/api", authRouter);
app.use("/api", adminRouter);
app.use("/api", categoryRouter);
app.use("/api", categoryRouter);
app.get("/api", (req, res) => {
  res.send("Hello, World! Welcome to my Node.js server.");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
