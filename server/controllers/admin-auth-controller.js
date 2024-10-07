const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");
const Admin = require("../models/admin");
const { generateTokens } = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const UserToken = require("../models/token");
const Role = require("../models/role");

module.exports = {
  createAdmin: async (req, res) => {
    try {
      const { firstName, lastName, password, username } = req.body;
      if (!firstName || !lastName || !username || !password) {
        return errorHandler(
          res,
          "Please fill in all fields, one or more fields are empty!",
          400
        );
      }

      const findAdmin = await Admin.findOne({ username });

      if (findAdmin) {
        return errorHandler(res, "The admin already has an account", 409);
      }

      if (!validatePassword(password)) {
        return errorHandler(
          res,
          "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
          400
        );
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const newAdmin = new Admin({
        name: `${firstName} ${lastName}`,
        username,
        ...req.body,
        password: passwordHash,
      });
      await newAdmin.save();
      return successHandler(res, "Account has been created!", newAdmin);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return errorHandler(res, "Username or Password is incorrect.", 400);
      }
      if (admin.suspended) {
        return errorHandler(
          res,
          "Account not active. Please contact admin",
          403
        );
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return errorHandler(res, "Username or Password is incorrect.", 400);
      }
      const accessToken = await generateTokens(admin);

      return successHandler(res, "Login successful", accessToken);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getAllAdmins: async (req, res) => {
    try {
      const { page = 1, limit = 150 } = req.query;

      const excludedRoleId = "66e98036056837ca119e6868"; // The roleId to exclude

      const admins = await Admin.find({ role: { $ne: excludedRoleId } }) // Exclude users with this roleId
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("role", "name");

      const totalAdmins = await Admin.countDocuments({
        role: { $ne: excludedRoleId },
      });

      // Prepare the response with pagination info
      const response = {
        itemsPerPage: 5,
        totalPages: Math.ceil(totalAdmins / limit),
        currentPage: parseInt(page),
        totalAdmins,
        admins,
      };

      const message = `All Admins Found`;

      return successHandler(res, message, response);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getAdminById: async (req, res) => {
    try {
      let id = req.params.id;
      let admin = await Admin.findOne({ _id: id });
      if (!admin) return errorHandler(res, "No Admin found with the ID", 404);
      return successHandler(res, "Admin Found", admin);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getAdminByToken: async (req, res) => {
    try {
      let id = req.admin;
      let admin = await Admin.findOne({ _id: id }).populate(
        "role",
        "name modules"
      );
      if (!admin) return errorHandler(res, "No Admin found", 404);
      return successHandler(res, "Admin Found", admin);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  updateAdminById: async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const _user = req.admin;
      if (update.suspended) {
        try {
          if (_user.toString() === id.toString()) {
            return errorHandler(
              res,
              "You cannot deactivate your own account. Please contact admin.",
              403
            );
          }
          await AdminToken.findOneAndDelete({ userId: id });
        } catch (error) {
          console.error("Error deleting admin token on deactivating", error);
          return errorHandler(res, "Request Not Completed", 500);
        }
      }

      delete update.password;

      const admin = await Admin.findByIdAndUpdate(id, update, {
        new: true,
      });
      if (!admin) return errorHandler(res, "No Admin found with the ID", 404);

      return successHandler(res, "Admin Updated", admin);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  changeAdminPasswordById: async (req, res) => {
    try {
      const id = req.admin;
      const { oldPassword, newPassword, confirmPassword } = req.body;
      if (!oldPassword || !newPassword || !confirmPassword) {
        return errorHandler(
          res,
          "Please fill in all fields, one or more fields are empty!",
          400
        );
      }

      const _user = await Admin.findOne({ _id: id });

      if (!_user) return errorHandler(res, "No Admin found with the ID", 404);
      const isMatch = await bcrypt.compare(oldPassword, _user.password);
      if (!isMatch) {
        return errorHandler(res, "Old Password is incorrect.", 403);
      }

      let passwordHash;
      if (!validatePassword(newPassword)) {
        return errorHandler(
          res,
          "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
          400
        );
      }
      passwordHash = await bcrypt.hash(newPassword, 12);

      const admin = await Admin.findByIdAndUpdate(
        id,
        { password: passwordHash },
        {
          new: true,
        }
      );

      return successHandler(res, "Admin Updated", admin);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  deleteAdminById: async (req, res) => {
    try {
      let id = req.params.id;
      const admin = await Admin.findOne({ _id: id });
      if (!admin) return errorHandler(res, "No Admin found with the ID", 404);
      await Admin.deleteOne({ _id: id });
      return successHandler(res, "Admin Deleted");
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  logout: async (req, res) => {
    try {
      let admin = req.admin;
      const userToken = await UserToken.findOneAndDelete({
        userId: admin,
      });
      if (!userToken) {
        return successHandler(res, "Logged Out Successfully");
      }
      return successHandler(res, "Logged Out Successfully");
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getAllRoles: async (req, res) => {
    try {
      const roles = await Role.find({ name: { $ne: "Ghost" } }).sort({
        name: 1,
      });

      const message = `All Roles Found`;

      return successHandler(res, message, roles);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
};

function validatePassword(password) {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
  return re.test(password);
}
