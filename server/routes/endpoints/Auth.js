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
} = require("../../controllers/auth-controller");
const {
  auth,
  authAdmin,
  adminVerifyPasswordToken,
} = require("../../middlewares/middleware");
let routes = (app) => {
  app.post("/register", createUser);
  app.post("/org/register", createOrganisationAsUser);
  app.get("/users", getAllUsers);
  app.get("/user/:id", getUserById);
  app.get("/token", auth, getUserByToken);
  app.put("/user/:id", updateUserById);
  app.put("/add-delegate/:id", addDelegatesToOrganisation);
  app.put("/password/user/", changeUserPasswordById);
  app.delete("/user/:id", deleteUserById);
  app.post("/login", login);
  app.post("/logout", auth, logout);
  app.get("/applicants", authAdmin, getAllCopApplicants);
  app.post("/forgot-password", forgotPassword);
  app.post("/admin-forgot-password", forgotPasswordAdmin);
  app.post("/reset-password", auth, resetPassword);
  app.post(
    "/admin-reset-password",
    adminVerifyPasswordToken,
    resetAdminPassword
  );
};

module.exports = routes;
