const taskService = require("../services/tasksService");

const getUserId = (req) => {
    return req.userId;
};

const handleErrors = (res, erro) => {
    if (erro.message === "Tarefa não encontrada!") {
        return res.status(404).json({ message: erro.message });
    } else {
        return res.status(400).json({ message: erro.message });
    }
};

const getTasksByUser = async (req, res) => {
    try {
        const userId = getUserId(req);

        const tasks = await taskService.getTasksByUser(userId);

        return res.status(200).json(tasks);
    } catch (erro) {
        return handleErrors(res, erro);
    }
};

const createTaskUser = async (req, res) => {
    try {
        const task = req.body;
        const userId = getUserId(req);
        const categoryId = req.params.id;

        const createdTask = await taskService.createTaskUser(
            task,
            userId,
            categoryId
        );

        return res.status(201).json(createdTask);
    } catch (erro) {
        return handleErrors(res, erro);
    }
};

const updateTaskUser = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const task = req.body;
        const userId = getUserId(req);

        await taskService.updateTaskUser(taskId, userId, task);

        return res.status(204).json();
    } catch (erro) {
        return handleErrors(res, erro);
    }
};

const deleteTaskUser = async (req, res) => {
    try {
        const userId = getUserId(req);
        const taskId = req.params.taskId;

        await taskService.deleteTaskUser({ userId, taskId });

        return res.status(204).json();
    } catch (erro) {
        return handleErrors(res, erro);
    }
};

module.exports = {
    getTasksByUser,
    createTaskUser,
    deleteTaskUser,
    updateTaskUser,
};
