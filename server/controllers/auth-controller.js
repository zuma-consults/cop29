const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");
const User = require("../models/users");
const { generateTokens, createAccessToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const UserToken = require("../models/token");
const { upload, uploadToCloudinary } = require("../utils/upload");
const sendResetPassword = require("../utils/sendResetPassword");
const Admin = require("../models/admin");
const sendVerifyEmail = require("../utils/sendConfirmEmail");
const { CLIENT_URL, ADMIN_CLIENT_URL } = process.env;

module.exports = {
  createUser: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return errorHandler(res, err.code, 400);
      } else {
        try {
          const { body, files } = req;
          const { name, password, email, phone, designation, thematicArea } =
            req.body;
          if (
            !name ||
            !password ||
            !email ||
            !phone ||
            !designation ||
            !thematicArea
          ) {
            return errorHandler(
              res,
              "Please fill in all fields, one or more fields are empty!",
              400
            );
          }

          const findUser = await User.findOne({ email });

          if (findUser) {
            return errorHandler(res, "An account already exists.", 409);
          }

          if (!validatePassword(password)) {
            return errorHandler(
              res,
              "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
              400
            );
          }

          const passwordHash = await bcrypt.hash(password, 12);

          let _delegates = [];

          if (files) {
            for (const file of files) {
              const localFilePath = file.path;
              const localFileName = file.filename;

              const result = await uploadToCloudinary(
                localFilePath,
                localFileName,
                "COP29"
              );
              _delegates.push({
                passport: result.url,
                name,
                delegatedBy: "Self",
                email,
                designation,
              });
            }
          }
          // Update body with delegates
          body.delegates = _delegates.length > 0 ? _delegates : null;

          if (body.delegates === null)
            return errorHandler(
              res,
              "File upload failed. Please try again.",
              500
            );
          const newUser = new User({
            name,
            userType,
            email,
            image: _delegates[0].passport,
            ...req.body,
            password: passwordHash,
            delegates: _delegates,
          });

          await newUser.save();
          // Send success response
          const access_token = await createAccessToken({ id: newUser._id });
          const url = `${CLIENT_URL}/verify/${access_token}`;
          sendVerifyEmail(
            email,
            url,
            "Click to complete your application",
            name
          );
          return successHandler(
            res,
            "Your account has been created. Please check your email to verify your email address and complete your application for COP 29.",
            newUser
          );
        } catch (error) {
          return errorHandler(res, error.message, error.statusCode || 500);
        }
      }
    });
  },
  createOrganisationAsUser: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return errorHandler(res, err.code, 400);
      } else {
        try {
          const { body, files } = req;
          const {
            name,
            password,
            email,
            phone,
            designation,
            thematicArea,
            reasonForAttendance,
          } = req.body;
          if (
            !name ||
            !password ||
            !email ||
            !phone ||
            !designation ||
            !thematicArea ||
            !reasonForAttendance
          ) {
            return errorHandler(
              res,
              "Please fill in all fields, one or more fields are empty!",
              400
            );
          }

          const findUser = await User.findOne({ email });

          if (findUser) {
            return errorHandler(res, "An account already exists.", 409);
          }

          if (!validatePassword(password)) {
            return errorHandler(
              res,
              "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
              400
            );
          }

          const passwordHash = await bcrypt.hash(password, 12);

          if (files && files.length > 0) {
            const pdfFiles = files.filter((file) => file.fieldname === "files");
            if (pdfFiles.length > 0) {
              for (const file of pdfFiles) {
                const localFilePath = file.path;
                const localFileName = file.filename;

                const result = await uploadToCloudinary(
                  localFilePath,
                  localFileName,
                  "COP29"
                );
                body.letterProof = result.url;
              }
            }

            // Process orgImage (Logo)
            const imageFiles = files.filter(
              (file) => file.fieldname === "orgImage"
            );
            if (imageFiles.length > 0) {
              for (const file of imageFiles) {
                const localFilePath = file.path;
                const localFileName = file.filename;

                const result = await uploadToCloudinary(
                  localFilePath,
                  localFileName,
                  "COP29"
                );
                body.contactIdCard = result.url;
              }
            }

            // Process documentSupportingAttendance
            const attendanceDoc = files.filter(
              (file) => file.fieldname === "documentSupportingAttendance"
            );
            if (attendanceDoc.length > 0) {
              for (const file of attendanceDoc) {
                const localFilePath = file.path;
                const localFileName = file.filename;

                const result = await uploadToCloudinary(
                  localFilePath,
                  localFileName,
                  "COP29"
                );
                body.documentSupportingAttendance = result.url;
              }
            }
          }

          const newUser = new User({
            name,
            email,
            ...req.body,
            password: passwordHash,
          });

          await newUser.save();
          // Send success response

          const access_token = await createAccessToken({ id: newUser._id });
          const url = `${CLIENT_URL}/verify/${access_token}`;
          sendVerifyEmail(
            email,
            url,
            "Click to complete your application",
            name
          );

          return successHandler(
            res,
            "Your account has been created. Please check your email to verify your email address and complete your application for COP 29 by adding your delegates.",
            newUser
          );
        } catch (error) {
          return errorHandler(res, error.message, error.statusCode || 500);
        }
      }
    });
  },
  addDelegatesToOrganisation: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return errorHandler(res, err.code, 400);
      }

      try {
        const { body, files } = req;
        const { name, email, designation, phone } = body;
        const { id } = req.params;

        // Validate required fields
        if (!name || !email || !designation || !phone) {
          return errorHandler(
            res,
            "Please fill in all fields, one or more fields are empty!",
            400
          );
        }

        // Find the organization by ID
        const findUser = await User.findById(id);
        if (!findUser) {
          return errorHandler(
            res,
            "No account found for this organization.",
            409
          );
        }

        if (findUser.delegates.length >= 2) {
          return errorHandler(res, "You can only add two delegates.", 403);
        }

        let passport = "";

        // Process uploaded files
        if (files && files.length > 0) {
          const pdfFiles = files.filter((file) => file.fieldname === "files");
          if (pdfFiles.length > 0) {
            for (const file of pdfFiles) {
              const localFilePath = file.path;
              const localFileName = file.filename;

              const result = await uploadToCloudinary(
                localFilePath,
                localFileName,
                "COP29"
              );
              passport = result.url;
            }
          }
        }

        // Add delegate to the organization's delegates array
        const delegate = {
          name,
          email,
          delegatedBy: findUser.name,
          passport,
          designation,
          phone,
        };

        findUser.delegates.push(delegate);
        await findUser.save();

        return successHandler(res, "Delegate successfully added", findUser);
      } catch (error) {
        return errorHandler(res, error.message, error.statusCode || 500);
      }
    });
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return errorHandler(res, "Email or Password is incorrect.", 404);
      }
      if (user.status === "suspended") {
        return errorHandler(
          res,
          "Account not active. Please contact admin",
          403
        );
      }
      if (user.verifiedEmail === false) {
        return errorHandler(res, "Please verify your email.", 403);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return errorHandler(res, "Email or Password is incorrect.", 404);
      }
      const accessToken = await generateTokens(user);

      return successHandler(res, "Login successful", accessToken);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const { page = 1, limit = 50, userType } = req.query;

      const query = userType ? { userType } : {};

      const users = await User.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const totalUsers = await User.countDocuments(query);

      // Prepare the response with pagination info
      const response = {
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: parseInt(page),
        totalUsers,
        users,
      };

      const message = `All ${userType ? userType : "Users"} Found`;

      return successHandler(res, message, response);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getUserById: async (req, res) => {
    try {
      let id = req.params.id;
      let user = await User.findOne({ _id: id });
      if (!user) return errorHandler(res, "No User found with the ID", 404);
      return successHandler(res, "User Found", user);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getUserByToken: async (req, res) => {
    try {
      let id = req.user;
      let user = await User.findOne({ _id: id });
      if (!user) return errorHandler(res, "No User found", 404);
      return successHandler(res, "User Found", user);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  updateUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const _user = req.user;
      if (update.status === "suspended") {
        try {
          if (_user.toString() === id.toString()) {
            return errorHandler(
              res,
              "You cannot deactivate your own account. Please contact admin.",
              403
            );
          }
          await UserToken.findOneAndDelete({ userId: id });
        } catch (error) {
          console.error("Error deleting user token on deactivating", error);
          return errorHandler(res, "Request Not Completed", 500);
        }
      }

      delete update.password;

      const user = await User.findByIdAndUpdate(id, update, {
        new: true,
      });
      if (!user) return errorHandler(res, "No User found with the ID", 404);

      return successHandler(res, "User Updated", user);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  changeUserPasswordById: async (req, res) => {
    try {
      const id = req.user;
      const { oldPassword, newPassword, confirmPassword } = req.body;
      if (!oldPassword || !newPassword || !confirmPassword) {
        return errorHandler(
          res,
          "Please fill in all fields, one or more fields are empty!",
          400
        );
      }

      const _user = await User.findOne({ _id: id });

      if (!_user) return errorHandler(res, "No User found with the ID", 404);
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

      const user = await User.findByIdAndUpdate(
        id,
        { password: passwordHash },
        {
          new: true,
        }
      );

      return successHandler(res, "User Updated", user);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  deleteUserById: async (req, res) => {
    try {
      let id = req.params.id;
      const user = await User.findOne({ _id: id });
      if (!user) return errorHandler(res, "No User found with the ID", 404);
      await User.deleteOne({ _id: id });
      return successHandler(res, "User Deleted");
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  logout: async (req, res) => {
    try {
      let user = req.user;
      const userToken = await UserToken.findOneAndDelete({
        userId: user,
      });
      if (!userToken) {
        return successHandler(res, "Logged Out Successfully");
      }
      return successHandler(res, "Logged Out Successfully");
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getAllCopApplicants: async (req, res) => {
    try {
      const { copApproved } = req.query;

      // Create a query object for filtering based on copApproved
      const query = { verifiedEmail: true };

      // If copApproved is provided in the query parameters, add it to the query object
      if (copApproved !== undefined) {
        query["delegates.copApproved"] = copApproved === "true";
      }

      // Find all users sorted by creation date
      const users = await User.find(query).sort({ createdAt: -1 });

      // Extract delegates from each user and combine them into one array
      const delegates = users.reduce((acc, user) => {
        if (user.delegates && user.delegates.length > 0) {
          acc.push(
            ...user.delegates.filter(
              (delegate) => delegate.copApproved === (copApproved === "true")
            )
          );
        }
        return acc;
      }, []);

      // Set the message based on the copApproved filter
      let message;
      if (copApproved === "true") {
        message = "Approved COP 29 Applicants";
      } else if (copApproved === "false") {
        message = "Pending COP 29 Applicants";
      } else {
        message = "All COP 29 Applicants";
      }

      return successHandler(res, message, delegates);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  updateCopApproval: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the user that contains the delegate with the specified _id
      const user = await User.findOne({ "delegates._id": id });

      if (!user) {
        return errorHandler(res, "Delegate not found", 404);
      }

      // // Find the specific delegate and update their copApproved status
      const delegate = user.delegates.id(id);
      if (!delegate) {
        return errorHandler(res, "Delegate not found", 404);
      }
      if (delegate.copApproved === true) {
        return successHandler(res, "Application approved.", delegate);
      }

      delegate.copApproved = true;
      await user.save();

      return successHandler(res, "Application approved.", delegate);
    } catch (error) {
      return errorHandler(res, "Error Occurred", error.statusCode || 500);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return errorHandler(res, "This email does not exist.", 404);
      }
      const access_token = await createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/reset-password/${access_token}`;
      sendResetPassword(email, url, "Click to Reset your Password", user.name);
      return successHandler(
        res,
        "Please check your email to reset your password."
      );
    } catch (err) {
      return errorHandler(res, err.message, 500);
    }
  },
  forgotPasswordAdmin: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Admin.findOne({ email });
      if (!user) {
        return errorHandler(res, "This email does not exist.", 404);
      }
      const access_token = await createAccessToken({ id: user._id });
      const url = `${ADMIN_CLIENT_URL}/reset-password/${access_token}`;
      sendResetPassword(email, url, "Click to Reset your Password", user.name);
      return successHandler(
        res,
        "Please check your email to reset your password."
      );
    } catch (err) {
      return errorHandler(res, err.message, 500);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;

      // Check if the password meets the required criteria using the `validatePassword` function
      if (!validatePassword(password)) {
        return errorHandler(
          res,
          "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
          400
        );
      }

      // Hash the new password before saving it to the database
      const passwordHash = await bcrypt.hash(password, 12);

      // Find the user by their ID and update their password in the database
      await User.updateOne(
        { _id: req.user },
        { $set: { password: passwordHash } }
      );

      return successHandler(res, "Password changed successfully");
    } catch (err) {
      // Handle any errors that may occur during the password reset process
      return errorHandler(res, err.message, 500);
    }
  },
  resetAdminPassword: async (req, res) => {
    try {
      const { password } = req.body;

      // Check if the password meets the required criteria using the `validatePassword` function
      if (!validatePassword(password)) {
        return errorHandler(
          res,
          "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
          400
        );
      }

      // Hash the new password before saving it to the database
      const passwordHash = await bcrypt.hash(password, 12);

      // Find the user by their ID and update their password in the database
      await Admin.updateOne(
        { _id: req.admin },
        { $set: { password: passwordHash } }
      );

      return successHandler(res, "Password changed successfully");
    } catch (err) {
      // Handle any errors that may occur during the password reset process
      return errorHandler(res, err.message, 500);
    }
  },
  verifyEmail: async (req, res) => {
    try {
      // Find the user by their ID and update their verifiedEmail in the database
      await User.updateOne(
        { _id: req.user },
        { verifiedEmail: true, status: "approved" }
      );

      return successHandler(res, "Email Verified.");
    } catch (err) {
      // Handle any errors that may occur during the verify Email process
      return errorHandler(res, err.message, 500);
    }
  },
  resendActivationLink: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return errorHandler(res, "Please provide an email address", 400);
      }
      const user = await User.findOne({ email });
      if (!user) {
        return errorHandler(res, "This account does not exist.", 404);
      }

      if (user.verifiedEmail === true) {
        return errorHandler(
          res,
          "This account has been verified. Login to proceed.",
          403
        );
      }
      const access_token = await createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/verify/${access_token}`;
      sendVerifyEmail(
        email,
        url,
        "Click to complete your application",
        user.name
      );
      return successHandler(
        res,
        "Please check your inbox and spam to complete your application."
      );
    } catch (err) {
      return errorHandler(res, err.message, 500);
    }
  },
};

function validatePassword(password) {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
  return re.test(password);
}
