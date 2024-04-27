const express = require("express");
const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMiddleware");

const router = express.Router();

router.post(
    "/register",
    userMiddleware.validateRequiredFields,
    userController.createUser
);

module.exports = router;
