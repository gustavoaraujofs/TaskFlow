const express = require("express");
const tasksController = require("../controllers/tasksController");
const tasksMiddleware = require("../middlewares/tasksMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/tasks", authMiddleware.checkToken, tasksController.getTasksByUser);

router.post(
    "/tasks/:id?",
    authMiddleware.checkToken,
    tasksMiddleware.validateRequiredFields,
    tasksController.createTaskUser
);

router.put(
    "/tasks/:taskId",
    authMiddleware.checkToken,
    tasksMiddleware.validateRequiredFields,
    tasksMiddleware.validateStatusField,
    tasksController.updateTaskUser
);

router.delete(
    "/tasks/:taskId",
    authMiddleware.checkToken,
    tasksController.deleteTaskUser
);

module.exports = router;
