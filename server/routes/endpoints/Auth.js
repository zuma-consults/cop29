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
} = require("../../controllers/auth-controller");
const { auth } = require("../../middlewares/middleware");
let routes = (app) => {
  app.post("/register", createUser);
  app.get("/users", getAllUsers);
  app.get("/user/:id", getUserById);
  app.get("/token", auth, getUserByToken);
  app.put("/user/:id", updateUserById);
  app.put("/password/user/", changeUserPasswordById);
  app.delete("/user/:id", deleteUserById);
  app.post("/login", login);
  app.post("/logout", auth, logout);
};

module.exports = routes;
