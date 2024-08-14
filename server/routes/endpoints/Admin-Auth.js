const {
  createAdmin,
  login,
  getAllAdmins,
  getAdminById,
  getAdminByToken,
  updateAdminById,
  changeAdminPasswordById,
  deleteAdminById,
} = require("../../controllers/admin-auth-controller");
const { authAdmin } = require("../../middlewares/middleware");
let routes = (app) => {
  app.post("/staff", createAdmin);
  app.get("/staff", getAllAdmins);
  app.get("/staff/:id", getAdminById);
  app.get("/token/staff", authAdmin, getAdminByToken);
  app.put("/staff/:id", updateAdminById);
  app.put("/password/staff/", changeAdminPasswordById);
  app.delete("/staff/:id", deleteAdminById);
  app.post("/login/staff", login);
  app.post("/logout/staff", authAdmin, logout);
};

module.exports = routes;