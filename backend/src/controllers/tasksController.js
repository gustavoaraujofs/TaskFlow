const tasksMoldel = require("../models/tasksMoldel");

const getTasksByUser = async (req, res) => {
    const { userId } = req.params;
    const tasks = await tasksMoldel.getTasksByUser(userId);
    return res.status(200).json(tasks);
};

const createTaskUser = async (req, res) => {
    const createdTask = await tasksMoldel.createTaskUser(
        req.body,
        req.params.userId
    );
    return res.status(201).json(createdTask);
};

const updateTaskUser = async (req, res) => {
    await tasksMoldel.updateTaskUser(req.params.taskId, req.body);
    return res.status(204).json();
};

const deleteTaskUser = async (req, res) => {
    await tasksMoldel.deleteTaskUser(req.params.taskId);
    return res.status(204).json();
};

module.exports = {
    getTasksByUser,
    createTaskUser,
    deleteTaskUser,
    updateTaskUser,
};
