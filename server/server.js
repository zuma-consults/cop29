// Import required modules
require("dotenv").config();
const routes = require("./routes");
const express = require("express");
const app = express();
const connectDb = require("./config/config");
const cors = require("cors");

const port = process.env.PORT || 7070;
const { logRequestDuration } = require("./middlewares/middleware");

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logRequestDuration);

// Define API routes
app.use("/api/v1", routes);

// Define a default route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the index route for endpoints of the COP29 App project."
  );
});

// Connect to the database
connectDb();

// Start the Express app and listen on the specified port
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = app;
