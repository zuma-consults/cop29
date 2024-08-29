// Import required modules
require("dotenv").config();
const routes = require("./routes");
const express = require("express");
const app = express();
const connectDb = require("./config/config");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const port = process.env.PORT || 7070;
const { logRequestDuration } = require("./middlewares/middleware");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
const helmet = require("helmet");

app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "trusted-cdn.com"],
//       // Additional policies...
//     },
//   })
// );

// app.use(
//   session({
//     secret: 'your-secret',
//     cookie: {
//       secure: true, // Requires HTTPS
//       httpOnly: true,
//       sameSite: 'strict', // or 'lax'
//     },
//   })
// );

app.use(limiter);
app.disable("x-powered-by");
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
