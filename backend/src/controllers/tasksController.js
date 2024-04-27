const taskService = require("../services/tasksService");

const getTasksByUser = async (req, res) => {
    const tasks = await taskService.getTasksByUser(req.userId);
    return res.status(200).json(tasks);
};

const createTaskUser = async (req, res) => {
    const createdTask = await taskService.createTaskUser(
        req.body,
        req.params.userId
    );
    return res.status(201).json(createdTask);
};

const updateTaskUser = async (req, res) => {
    await taskService.updateTaskUser(req.params.taskId, req.body);
    return res.status(204).json();
};

const deleteTaskUser = async (req, res) => {
    await taskService.deleteTaskUser(req.params.taskId);
    return res.status(204).json();
};

module.exports = {
    getTasksByUser,
    createTaskUser,
    deleteTaskUser,
    updateTaskUser,
};
