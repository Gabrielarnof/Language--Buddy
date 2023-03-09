const authenticate = require("../middleware/authenticate");
const { Router } = require("express");

const {
  getAll,
  getById,
  createUser,
  // emailRequest,
  login,
  edit,
  delete_user,
  auth,
} = require("../controllers/controllers");

const router = Router();

router.get("/users", authenticate, getAll);

router.get("/users/:id", authenticate, getById);

router.post("/sign-up", createUser);

router.post("/sign-in", login);

router.put("/users/:id", authenticate, edit);

router.delete("/users/:id", authenticate, delete_user);

router.post("/auth", authenticate, auth);

// router.post("/request", emailRequest);

https: module.exports = router;
