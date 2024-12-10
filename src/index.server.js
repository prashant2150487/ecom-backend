const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/user"); // Import the user router

const app = express();
dotenv.config(); // Load environment variables

// Middleware
app.use(bodyParser.json()); // Parse JSON requests

// Routes
app.use("/api/user", userRouter); // Mount user routes

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true, // Optional but recommended for older MongoDB versions
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Start the server
app.get("/api", (req, res) => res.send("Express on Vercel"));
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
