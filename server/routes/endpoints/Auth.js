const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
  getUserByToken,
  logout,
  changeUserPasswordById,
  createOrganisationAsUser,
  addDelegatesToOrganisation,
  getAllCopApplicants,
  forgotPassword,
  forgotPasswordAdmin,
  resetPassword,
  resetAdminPassword,
  verifyEmail,
  resendActivationLink,
  updateCopApproval,
  createOrganisationAsNegotiator,
  getAllNegotiators,
  getDataOverview,
  getAllApprovedOrganizations,
  getAllUsersNoDelegates,
  updateAttendance,
} = require("../../controllers/auth-controller");
const {
  auth,
  authAdmin,
  adminVerifyPasswordToken,
  verifyPasswordToken,
} = require("../../middlewares/middleware");
let routes = (app) => {
  // app.post("/register", createUser);
  // app.post("/org/register", createOrganisationAsUser);
  // app.post("/negotiator/register", createOrganisationAsNegotiator);
  app.get("/users", authAdmin, getAllUsers);
  app.get("/negotiators", authAdmin, getAllNegotiators);
  app.get("/user/:id", authAdmin, getUserById);
  app.get("/token", auth, getUserByToken);
  app.put("/user/:id", authAdmin, updateUserById);
  app.put("/add-delegate/:id", auth, addDelegatesToOrganisation);
  app.put("/password/user/", auth, changeUserPasswordById);
  // app.delete("/user/:id", deleteUserById);
  app.post("/login", login);
  app.post("/logout", auth, logout);
  app.get("/applicants", authAdmin, getAllCopApplicants);
  app.put("/approve/:id", authAdmin, updateCopApproval);
  app.put("/present/:id", authAdmin, updateAttendance);
  app.post("/forgot-password", forgotPassword);
  app.post("/admin-forgot-password", forgotPasswordAdmin);
  app.post("/reset-password", verifyPasswordToken, resetPassword);
  app.put("/verify", verifyPasswordToken, verifyEmail);
  app.post("/resend", resendActivationLink);
  app.post(
    "/admin-reset-password",
    adminVerifyPasswordToken,
    resetAdminPassword
  );
  app.get("/overview", getDataOverview);
  app.get("/organizations", authAdmin, getAllApprovedOrganizations);
  // app.get("/no", getAllUsersNoDelegates);
};

module.exports = routes;
