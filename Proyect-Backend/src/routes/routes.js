const authenticate = require("../middleware/authenticate");
const {
  Router
} = require("express");

const {
  getAll,
  getById,
  createUser,
  // emailRequest,
  login,
  edit,
  delete_user,
  auth,
    buddyAccepted,
  buddyRejected,
  buddy_Request,

  connections,
  createConnection,
  updateConnection,
  deleteConnection

} = require("../controllers/controllers");

const router = Router();

router.get("/users", authenticate, getAll);

router.get("/users/:id", authenticate, getById);

router.post("/sign-up", createUser);

router.post("/sign-in", login);

router.put("/users/:id", authenticate, edit);

router.delete("/users/:id", authenticate, delete_user);

router.post("/auth", authenticate, auth);


router.post("/request", buddy_Request);

router.post("/accepted", buddyAccepted);

router.post("/rejected", buddyRejected);

router.get("/connections", authenticate, connections);

router.post("/connections", authenticate, createConnection);

router.put("/connections/:id", authenticate, updateConnection);

router.delete("/connections/:id", authenticate, deleteConnection);

module.exports = router;

