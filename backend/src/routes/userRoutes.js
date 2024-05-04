const express = require("express");
const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/register",
    userMiddleware.validateRequiredFields,
    userController.createUser
);

router.delete("/users", authMiddleware.checkToken, userController.deleteUser);

module.exports = router;
