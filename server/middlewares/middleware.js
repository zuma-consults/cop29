const jwt = require("jsonwebtoken");
const Role = require("../models/role.js");
const Token = require("../models/token.js");
const User = require("../models/users.js");
const Admin = require("../models/admin.js");
const { errorHandler } = require("../utils/errorHandler.js");

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
    const adminToken = await Admin.findOne({ _id: decoded.id });

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

const verifyPasswordToken = async (req, res, next) => {
  try {
    const token = req.header("poc-client-token");

    if (!token) {
      return errorHandler(res, "Access Denied: No token provided.", 403);
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userToken = await User.findOne({ _id: decoded.id });

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

const logRequestDuration = async (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} request to 
    ${req.originalUrl} completed in ${duration}ms with status ${
      res.statusCode
    }`);
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
