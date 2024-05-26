const express = require("express");
const authControler = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/login",
    authMiddleware.validateRequiredFields,
    authControler.loginUser
);

router.post("/validate", authMiddleware.checkToken, authControler.validate);

module.exports = router;
