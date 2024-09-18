const {
  createAdmin,
  login,
  getAllAdmins,
  getAdminById,
  getAdminByToken,
  updateAdminById,
  changeAdminPasswordById,
  deleteAdminById,
  logout,
  getAllRoles,
} = require("../../controllers/admin-auth-controller");
const { authAdmin } = require("../../middlewares/middleware");
let routes = (app) => {
  app.post("/staff", createAdmin);
  app.get("/staff", getAllAdmins);
  app.get("/staff/:id", authAdmin, getAdminById);
  app.get("/token/staff", authAdmin, getAdminByToken);
  app.put("/staff/:id", authAdmin, updateAdminById);
  app.put("/password/staff", authAdmin, changeAdminPasswordById);
  app.delete("/staff/:id", deleteAdminById);
  app.post("/login/staff", login);
  app.post("/logout/staff", authAdmin, logout);
  app.get("/roles", getAllRoles);
};

module.exports = routes;
