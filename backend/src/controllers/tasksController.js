const tasksMoldel = require("../models/tasksMoldel");

const getTasksByUser = async (req, res) => {
    const { id } = req.params;
    const tasks = await tasksMoldel.getTasksByUser(id);
    return res.status(200).json(tasks);
};

module.exports = {
    getTasksByUser,
};
