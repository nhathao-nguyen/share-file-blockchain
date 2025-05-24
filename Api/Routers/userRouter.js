const express = require("express");
const authController = require("../Controllers/authController");
const router = express.Router();

router.route("/").get(authController.getAllusers);
router.route("/:id").delete(authController.deleteUser);
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;