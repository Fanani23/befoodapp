const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/users");
const protect = require("../middlewares/user-auth");
const upload = require("../middlewares/upload");

router.post("/register", userController.insert);
router.post("/login", userController.login);
router.put("/", protect, upload, userController.updatePhoto);
router.get("/", protect, userController.getDetailUsers);
router.post("/verif", userController.auth);

module.exports = router;
