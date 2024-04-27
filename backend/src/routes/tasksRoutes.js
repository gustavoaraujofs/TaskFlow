const express = require("express");
const tasksController = require("../controllers/tasksController");
const tasksMiddleware = require("../middlewares/tasksMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/tasks",
    authMiddleware.checkToken,
    tasksController.getTasksByUser
);

router.post(
    "/tasks/:userId",
    tasksMiddleware.validateRequiredFields,
    tasksController.createTaskUser
);

router.put(
    "/tasks/:taskId",
    tasksMiddleware.validateRequiredFields,
    tasksMiddleware.validateStatusField,
    tasksController.updateTaskUser
);

router.delete("/tasks/:taskId", tasksController.deleteTaskUser);

module.exports = router;