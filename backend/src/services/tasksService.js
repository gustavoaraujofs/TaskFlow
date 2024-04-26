const tasksModel = require("../models/tasksModel");

const getTasksByUser = async (userId) => {
    return await tasksModel.getTasksByUser(userId);
};

const createTaskUser = async (task, userId, categoryId = null) => {
    let { titulo, descricao, prioridade, prazo_final } = task;

    descricao = descricao || null;
    prioridade = prioridade || null;
    prazo_final = prazo_final || null;

    return await tasksModel.createTaskUser({
        titulo,
        descricao,
        prioridade,
        prazo_final,
        status: "Pendente",
        usuario_id: userId,
        categoria_id: categoryId,
    });
};

const updateTaskUser = async (taskId, task) => {
    let { titulo, descricao, prioridade, prazo_final, status, categoria_id } =
        task;

    descricao = descricao || null;
    prioridade = prioridade || null;
    prazo_final = prazo_final || null;
    categoria_id = categoria_id || null;

    return await tasksModel.updateTaskUser(taskId, {
        titulo,
        descricao,
        prioridade,
        prazo_final,
        status,
        categoria_id,
    });
};

const deleteTaskUser = async (taskId) => {
    return await tasksModel.deleteTaskUser(taskId);
};

module.exports = {
    getTasksByUser,
    createTaskUser,
    updateTaskUser,
    deleteTaskUser,
};
