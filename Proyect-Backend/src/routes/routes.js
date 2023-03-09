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
  buddy_request,
  buddyAccepted,
  buddyRejected,
} = require("../controllers/controllers");

const router = Router();

router.get("/users", authenticate, getAll);

router.get("/users/:id", authenticate, getById);

router.post("/sign-up", createUser);

router.post("/sign-in", login);

router.put("/users/:id", authenticate, edit);

router.delete("/users/:id", authenticate, delete_user);

router.post("/auth", authenticate, auth);

router.post("/request", buddy_request);

router.post("/request_Accepted", buddyAccepted);

router.post("/request_Rejected", buddyRejected);

// router.post("/request", emailRequest);

https: module.exports = router;
