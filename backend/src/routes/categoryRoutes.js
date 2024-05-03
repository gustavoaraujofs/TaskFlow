const express = require("express");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");
const categoryMiddleware = require("../middlewares/categoryMiddleware");

const router = express.Router();

router.post(
    "/categories",
    authMiddleware.checkToken,
    categoryMiddleware.validateRequiredFields,
    categoryController.createCategory
);

router.get(
    "/categories",
    authMiddleware.checkToken,
    categoryController.getCategoriesByUser
);

router.put(
    "/categories/:id",
    authMiddleware.checkToken,
    categoryMiddleware.checkEmptyNameField,
    categoryController.updateCategoryByUser
);

router.delete(
    "/categories/:id",
    authMiddleware.checkToken,
    categoryController.deleteCategory
);

module.exports = router;
