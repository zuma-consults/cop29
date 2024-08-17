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
  addDelegatesToOrganisation
} = require("../../controllers/auth-controller");
const { auth } = require("../../middlewares/middleware");
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
};

module.exports = routes;
