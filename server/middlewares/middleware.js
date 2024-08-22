const jwt = require("jsonwebtoken");
const Role = require("../models/role.js");
const Token = require("../models/token.js");
const User = require("../models/users.js");
const Admin = require("../models/admin.js");
const { errorHandler } = require("../utils/errorHandler.js");
const fs = require("fs");
const path = require("path");
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const geoip = require("geoip-lite");

const auth = async (req, res, next) => {
  try {
    const token = req.header("poc-client-token");

    if (!token) {
      return errorHandler(res, "Access Denied: No token provided.", 403);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userToken = await Token.findOne({ userId: decoded.id, token });

    if (!userToken) {
      return errorHandler(
        res,
        "Access Denied: Invalid or expired token. Please login again",
        403
      );
    }

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return errorHandler(res, "Access Denied: User not found.", 404);
    }

    req.user = user._id;
    next();
  } catch (err) {
    return errorHandler(res, "Access Denied: Invalid Token.", 403);
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header("poc-admin-token");

    if (!token) {
      return errorHandler(res, "Access Denied: No token provided.", 403);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const adminToken = await Token.findOne({ userId: decoded.id, token });

    if (!adminToken) {
      return errorHandler(
        res,
        "Access Denied: Invalid or expired token. Please login again",
        403
      );
    }

    const admin = await Admin.findOne({ _id: decoded.id });

    if (!admin) {
      return errorHandler(res, "Access Denied: Admin not found.", 404);
    }

    req.admin = admin._id;
    next();
  } catch (err) {
    return errorHandler(res, "Access Denied: Invalid Token.", 403);
  }
};

const adminVerifyPasswordToken = async (req, res, next) => {
  try {
    const token = req.header("poc-admin-token");

    if (!token) {
      return errorHandler(res, "Access Denied: No token provided.", 403);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const admin = await Admin.findOne({ _id: decoded.id });

    if (!admin) {
      return errorHandler(res, "Access Denied: Admin not found.", 404);
    }

    req.admin = admin._id;
    next();
  } catch (err) {
    return errorHandler(
      res,
      "This link has expired. Please request a new one to continue.",
      403
    );
  }
};

const verifyPasswordToken = async (req, res, next) => {
  try {
    const token = req.header("poc-client-token");
    if (!token) {
      return errorHandler(res, "Access Denied: No token provided.", 403);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return errorHandler(res, "Access Denied: User not found.", 404);
    }

    req.user = user._id;
    next();
  } catch (err) {
    return errorHandler(
      res,
      "This link has expired. Please request a new one to continue.",
      403
    );
  }
};

// Ensure the logs directory exists
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configure Winston logger with daily rotation
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(), // Log as JSON for structured logging
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: path.join(logDir, "request-%DATE%.log"), // Use the logs directory
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d", // Keep logs for 30 days
    }),
    new winston.transports.Console(), // Log to console
  ],
});

const logRequestDuration = async (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    // Get IP address and geolocation
    const ip = req.ip || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    const location = geo
      ? `${geo.city}, ${geo.region}, ${geo.country}`
      : "Unknown location";

    // Determine user type
    const userType = req.user ? "user" : req.admin ? "admin" : "none";

    // Create the log message
    const logMessage = `[${new Date().toISOString()}] ${
      req.method
    } request to ${
      req.originalUrl
    } from IP ${ip} (${location}) completed in ${duration}ms with status ${
      res.statusCode
    }. User-Agent: ${
      req.headers["user-agent"]
    }, UserType: ${userType}, UserId: ${
      req.user || req.admin || "Not logged in"
    }`;

    // Log to file and console
    logger.info(logMessage);
  });

  next();
};

module.exports = {
  auth,
  authAdmin,
  logRequestDuration,
  adminVerifyPasswordToken,
  verifyPasswordToken,
};
