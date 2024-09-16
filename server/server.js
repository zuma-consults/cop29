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
// const { errorHandler, systemError } = require("./utils/errorHandler");

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://admin-cop29.vercel.app",
      "https://cop29-okike.vercel.app",
      "https://nigccdelegation.natccc.gov.ng",
    ];
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // methods: ['GET','POST'], // Only allow GET and POST requests
  // allowedHeaders: ['Content-Type', 'Authorization'], // Only allow specific headers
  // exposedHeaders: ['Content-Length', 'X-Response-Time'], // Headers you want the client to see
  // credentials: true, // Allow credentials (cookies, authorization headers)
  // optionsSuccessStatus: 200, // Response status for preflight requests
  // maxAge: 86400, // Cache preflight response for 24 hours
};

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

app.use(limiter);
app.disable("x-powered-by");
// Middleware setup
app.use(cors(corsOptions)); // Enable CORS for all routes
// app.use(cors()); // Enable CORS for all routes
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
