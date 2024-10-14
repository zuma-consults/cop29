const { successHandler } = require("../utils/core");
const { errorHandler } = require("../utils/errorHandler");
const User = require("../models/users");
const Event = require("../models/events");
const { generateTokens, createAccessToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const UserToken = require("../models/token");
const { upload, uploadToCloudinary } = require("../utils/upload");
const sendResetPassword = require("../utils/sendResetPassword");
const Admin = require("../models/admin");
const sendVerifyEmail = require("../utils/sendConfirmEmail");
const { CLIENT_URL, ADMIN_CLIENT_URL } = process.env;
const crypto = require("crypto");
const QRCode = require("qrcode");
const Slot = require("../models/slot");
const sendEmail = require("../utils/sendMail");
const NodeCache = require("node-cache");
const sendEmailNoDelegates = require("../utils/sendMailNoDelegates");
const myCache = new NodeCache();

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
          sendVerifyEmail(email, url, "Click to verify your email", name);
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
            preferredDateTime,
            contactDesignation,
            contactName,
          } = req.body;
          if (
            !name ||
            !password ||
            !email ||
            !phone ||
            !contactDesignation ||
            !preferredDateTime ||
            !contactName
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
            } else {
              return errorHandler(res, "Please attach Letter of Proof", 400);
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
            } else {
              return errorHandler(
                res,
                "Please attach Contact Person's Scanned ID",
                400
              );
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
            } else {
              return errorHandler(
                res,
                "Please Attach Document Supporting Attendance",
                400
              );
            }
          } else {
            return errorHandler(res, "Please Attach Documents", 400);
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
          sendVerifyEmail(email, url, "Click to verify your email", name);

          return successHandler(
            res,
            "Your account has been created. Please check your email to verify your email address and complete your application for COP 29 by adding your delegates."
            // newUser
          );
        } catch (error) {
          return errorHandler(res, error.message, error.statusCode || 500);
        }
      }
    });
  },
  createOrganisationAsNegotiator: async (req, res) => {
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
            thematicArea,
            contactDesignation,
            contactName,
          } = req.body;
          if (
            !name ||
            !password ||
            !email ||
            !phone ||
            !contactDesignation ||
            !thematicArea ||
            !contactName
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
            } else {
              return errorHandler(res, "Please attach Letter of Proof", 400);
            }
          } else {
            return errorHandler(res, "Please Attach Documents", 400);
          }

          const newUser = new User({
            name,
            email,
            ...req.body,
            category: "Negotiator",
            password: passwordHash,
          });
          await newUser.save();
          // Send success response

          const access_token = await createAccessToken({ id: newUser._id });
          const url = `${CLIENT_URL}/verify/${access_token}`;
          sendVerifyEmail(email, url, "Click to verify your email", name);

          return successHandler(
            res,
            "Your account has been created. Please check your email to verify your email address and complete your application for COP 29 by adding your delegates."
            // newUser
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
        const { body, files, user } = req;
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

        // Check if passport is provided
        if (!passport) {
          return errorHandler(res, "Passport data page is required.", 400);
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

        if (
          findUser._id.toString() !== user.toString() ||
          findUser.category === "Negotiator"
        ) {
          return errorHandler(res, "Not authorized", 409);
        }

        if (
          findUser.delegates.length >= 3 &&
          findUser.email !== "bodunoye@gmail.com"
        ) {
          return errorHandler(res, "You can only add two delegates.", 403);
        }

        // Add delegate to the organization's delegates array
        const delegate = {
          name,
          email,
          delegatedBy: findUser.name,
          passport,
          designation,
          phone,
          ...body,
        };

        findUser.delegates.push(delegate);
        await findUser.save();

        return successHandler(
          res,
          "Delegate added successfully. Please await an email with the status of your request.",
          findUser
        );
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
      const { page = 1, limit = 200, userType } = req.query;

      const query = userType
        ? { userType, verifiedEmail: true, category: { $ne: "Negotiator" } }
        : { verifiedEmail: true, category: { $ne: "Negotiator" } };

      const users = await User.find(query)
        .sort({ createdAt: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const totalUsers = await User.countDocuments(query);

      // Iterate over users and check file extensions
      const updatedUsers = users.map((user) => {
        // Define a helper function to replace file extensions and update the protocol
        const processFilePath = (filePath) => {
          if (filePath) {
            // Replace .pdf with .jpg
            filePath = filePath.replace(/\.(pdf)$/i, ".jpg");

            // Check if the file ends with .doc or .docx and update protocol if needed
            if (/\.(doc|docx)$/i.test(filePath)) {
              if (filePath.startsWith("http:")) {
                filePath = filePath.replace(/^http:/i, "https:");
              }
            }
          }
          return filePath;
        };

        // Update the fields
        user.documentSupportingAttendance = processFilePath(
          user.documentSupportingAttendance
        );
        user.letterProof = processFilePath(user.letterProof);
        user.contactIdCard = processFilePath(user.contactIdCard);

        return user;
      });

      // Prepare the response with pagination info
      const response = {
        itemsPerPage: 5,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: parseInt(page),
        totalUsers,
        itemsPerPage: 50,
        users: updatedUsers, // Use the updated users here
      };

      const message = `All ${userType ? userType : "Users"} Found`;

      return successHandler(res, message, response);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getAllNegotiators: async (req, res) => {
    try {
      const { page = 1, limit = 200 } = req.query;

      const query = { verifiedEmail: true, category: "Negotiator" };

      const users = await User.find(query)
        .sort({ createdAt: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

      const totalUsers = await User.countDocuments(query);

      // Iterate over users and check file extensions
      const updatedUsers = users.map((user) => {
        // Define a helper function to replace file extensions
        const replaceFileExtension = (filePath) => {
          if (filePath) {
            return filePath.replace(/\.(pdf)$/i, ".jpg");
          }
          return filePath;
        };

        // Update the fields if they end with .pdf, .doc, or .docx
        user.documentSupportingAttendance = replaceFileExtension(
          user.documentSupportingAttendance
        );
        user.letterProof = replaceFileExtension(user.letterProof);
        user.contactIdCard = replaceFileExtension(user.contactIdCard);

        return user;
      });

      // Prepare the response with pagination info
      const response = {
        itemsPerPage: 5,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: parseInt(page),
        totalUsers,
        users: updatedUsers, // Use the updated users here
      };

      const message = `All Negotiators Found`;

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
      let user = await User.findOne({ _id: id }).select(
        "name email phone state userType status category thematicArea contactDesignation delegates"
      );
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

      // Ensure the status is part of the request body
      if (update.status === "suspended") {
        try {
          if (_user.toString() === id.toString()) {
            return errorHandler(
              res,
              "You cannot deactivate your own account. Please contact admin.",
              403
            );
          }

          // Delete the user's token when status is suspended
          await UserToken.findOneAndDelete({ userId: id });
        } catch (error) {
          return errorHandler(res, "Request Not Completed", 500);
        }
      }

      // Prevent updating the password directly
      delete update.password;

      // Find and update the user by ID
      const user = await User.findByIdAndUpdate(id, update, {
        new: true, // Returns the updated document
      });

      // If the user is not found, throw an error
      if (!user) return errorHandler(res, "No User Found.", 404);

      // Check if status is present and handle sending the email
      if (
        update.status === "approved" ||
        update.status === "rejected" ||
        update.status === "suspended"
      ) {
        let subject = "COP 29 ORGANIZATION REQUEST STATUS";
        let message;
        let emailFooter;

        if (update.status === "approved") {
          message =
            "We are pleased to inform you that your accreditation request has been successfully processed and approved. Kindly notify your delegates to check their emails for further instructions regarding the next steps.";
          emailFooter =
            "Thank you for your participation, and we look forward to welcoming you to the event.";
        } else if (update.status === "rejected") {
          message =
            "We regret to inform you that your accreditation request has been declined.";
          emailFooter =
            "Should you have any questions or require further clarification, please use the contact us button on the resgistration portal.";
        } else if (update.status === "suspended") {
          message =
            "Your account has been suspended. Please contact support for assistance.";
          emailFooter =
            "We appreciate your cooperation in resolving this matter.";
        }

        // Send the email with the appropriate message
        sendEmail(user.email, user.name, "", subject, message, emailFooter);
      }

      // Success handler if no status or just updating the user
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
      const query = { verifiedEmail: true, status: "approved" };

      // If copApproved is provided in the query parameters, add it to the query object
      if (copApproved !== undefined) {
        query["delegates.copApproved"] = copApproved;
      }

      // Find all users sorted by creation date
      const users = await User.find(query).sort({ createdAt: 1 });

      // Define a helper function to replace file extensions
      const replaceFileExtension = (filePath) => {
        if (filePath) {
          return filePath.replace(/\.(pdf)$/i, ".jpg");
        }
        return filePath;
      };

      // Extract delegates from each user and combine them into one array
      const delegates = users.reduce((acc, user) => {
        if (user.delegates && user.delegates.length > 0) {
          // Filter delegates based on copApproved status, if provided
          const filteredDelegates = user.delegates.filter((delegate) => {
            if (copApproved !== undefined) {
              return String(delegate.copApproved) === copApproved;
            }
            return true;
          });

          // Replace passport file extensions for each delegate
          filteredDelegates.forEach((delegate) => {
            delegate.passport = replaceFileExtension(delegate.passport);
          });

          acc.push(...filteredDelegates);
        }
        return acc;
      }, []);

      // Set the message based on the copApproved filter
      let message;
      if (copApproved !== undefined) {
        message = `${capitalize(copApproved)} COP 29 Applicants`;
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
      let { copApproved } = req.body;
      // Find the user that contains the delegate with the specified _id
      const user = await User.findOne({ "delegates._id": id });
      if (!user) {
        return errorHandler(res, "Delegate not found", 404);
      }

      // let event = await Event.findOne({ organizerId: user._id });
      // if (!event) {
      //   return errorHandler(
      //     res,
      //     "Organization is yet to schedule a meeting",
      //     404
      //   );
      // }

      // if (event.status !== "approved") {
      //   return errorHandler(
      //     res,
      //     "Organization does not appear to have an approved meeting.",
      //     403
      //   );
      // }

      // // Find the specific delegate and update their copApproved status
      const delegate = user.delegates.id(id);
      if (!delegate) {
        return errorHandler(res, "Delegate not found", 404);
      }
      if (delegate.copApproved !== "pending") {
        return errorHandler(
          res,
          `Delegate's request has already been processed.`,
          403
        );
      }

      if (copApproved === "approved") {
        let code = generateCode(delegate.name);
        delegate.code = code;

        try {
          let url = await QRCode.toDataURL(code);
          sendEmail(
            delegate.email,
            delegate.name,
            url,
            "COP 29 DELEGATE STATUS",
            "We are pleased to inform you that your application has been successfully processed and approved. Please find your unique QR code as an attachment, which you are required to keep securely. This QR code will be essential for marking your attendance at COP 29.",
            "Thank you for your participation, and we look forward to welcoming you to the event."
          );
        } catch (err) {
          console.error("Error generating or uploading QR Code:", err);
        }
      } else {
        sendEmail(
          delegate.email,
          delegate.name,
          "",
          "COP 29 DELEGATE STATUS",
          "We regret to inform you that your application has not been approved. Unfortunately, you will not be able to attend COP 29 at this time. Should you have any questions or require further clarification, please use the contact us button on the resgistration portal.",
          "Thank you for your interest."
        );
      }

      delegate.copApproved = copApproved;
      await user.save();

      return successHandler(res, `Application ${copApproved}.`, delegate);
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
        // { verifiedEmail: true, status: "approved" }
        { verifiedEmail: true }
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
      sendVerifyEmail(email, url, "Click to verify your email", user.name);
      return successHandler(
        res,
        "Please check your inbox and spam to complete your application."
      );
    } catch (err) {
      return errorHandler(res, err.message, 500);
    }
  },
  getDataOverview: async (req, res) => {
    try {
      // Check if overview data is in cache
      if (myCache.has("overview")) {
        const cachedOverview = myCache.get("overview");
        return successHandler(res, "Data Overview", cachedOverview);
      }

      // Create a query object for filtering verified users with approved status
      const query = { verifiedEmail: true, status: "approved" };

      // Find all users sorted by creation date
      const users = await User.find(query).sort({ createdAt: 1 });

      // Initialize counts for users and delegates
      let totalOrganizations = 0;
      let totalDelegates = 0;

      // Extract delegates from each user and count only those with copApproved === 'approved'
      users.forEach((user) => {
        if (user.delegates && user.delegates.length > 0) {
          totalDelegates += user.delegates.filter(
            (delegate) => delegate.copApproved === "approved"
          ).length;
        }
      });

      // Set the total number of organizations
      totalOrganizations = users.length;

      // Find all booked slots
      const slots = await Slot.find({ bookingStatus: "booked" });
      const bookedSlots = slots.length;

      // Prepare the result
      const result = {
        totalOrganizations,
        totalDelegates,
        bookedSlots,
      };

      // Cache the result for 10 minutes (600 seconds)
      myCache.set("overview", result, 600);

      // Return the result
      return successHandler(res, "Data Overview", result);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
  getAllApprovedOrganizations: async (req, res) => {
    try {
      const query = {
        verifiedEmail: true,
        category: { $ne: "Negotiator" },
        status: "approved",
      };

      const organizations = await User.find(query).sort({ name: 1 });

      const totalOrganizations = await User.countDocuments(query);

      const response = {
        totalOrganizations,
        organizations,
      };

      const message = `All Approved Organizations`;

      return successHandler(res, message, response);
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode);
    }
  },
  getAllUsersNoDelegates: async (req, res) => {
    try {
      const query = {
        verifiedEmail: true,
        category: { $ne: "Negotiator" },
        // delegates: [],
      };

      // Fetch users matching the query
      const users = await User.find(query)
        .sort({ createdAt: 1 })
        .select("name email phone state");
      console.log(users.length);

      const msg1 = `Congratulations on successfully creating an account for your organization on our platform. 
          <br></br>
          <br></br>
          We observed that your organisation is yet to add delegates. Kindly proceed to complete the process by:
          <ol>
          <li style="color: #336633; font-size: 15px;">Logging into your account and visiting your profile page.</li>
          <li style="color: #336633; font-size: 15px;">Click the 'add delegate(s)/nominee(s)' button.</li>
          <li style="color: #336633; font-size: 15px;">Fill out the form and upload the required documents for each delegate.</li>
          </ol>
          `;
      const msg2 = `For more information on how to add delegates and manage your organization’s profile,
           visit the 'How it Works' section of the portal.  <br></br> <br></br> If you have any questions or need further assistance, reach out to us using the 'contact us' form on the portal.`;

      // Send emails concurrently
      // await Promise.all(
      //   users.map(async (element) => {
      //     try {
      //       await sendEmailNoDelegates(
      //         element.email,
      //         element.name,
      //         "Reminder",
      //         msg1,
      //         msg2
      //       );
      //     } catch (emailError) {
      //       console.error(
      //         `Failed to send email to ${element.email}:`,
      //         emailError
      //       );
      //     }
      //   })
      // );

      // Return success response
      return successHandler(
        res,
        "Verified email users with no delegates",
        users
      );
    } catch (error) {
      return errorHandler(res, error.message, error.statusCode || 500);
    }
  },
};

function validatePassword(password) {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
  return re.test(password);
}

function capitalize(str) {
  if (str === null || str === undefined || str.length === 0) {
    return str; // Return the original string if it's empty or null
  }
  return str[0].toUpperCase() + str.slice(1);
}

function generateCode(sentence) {
  const timestamp = Date.now().toString();
  const combinedString = sentence + timestamp;
  const hash = crypto.createHash("sha256").update(combinedString).digest("hex");
  return hash.slice(0, 6).toUpperCase();
}
