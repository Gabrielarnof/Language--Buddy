const authenticate = require("../middleware/authenticate");
const { Router } = require("express");

const {
  getAll,
  getById,
  createUser,
  login,
  edit,
  delete_user,
  auth,
  connections,
  createConnection,
  updateConnection,
  deleteConnection,
  resetPassword,
} = require("../controllers/controllers");

const router = Router();

router.get("/users", authenticate, getAll);

router.get("/users/:id", authenticate, getById);

router.post("/sign-up", createUser);

router.post("/sign-in", login);

router.put("/users/:id", authenticate, edit);

router.delete("/users/:id", authenticate, delete_user);

router.post("/auth", authenticate, auth);

router.get("/connections", authenticate, connections);

router.post("/connections", authenticate, createConnection);

router.put("/connections/:id", authenticate, updateConnection);

router.put("/password", resetPassword);

router.delete("/connections/:id", authenticate, deleteConnection);

module.exports = router;
