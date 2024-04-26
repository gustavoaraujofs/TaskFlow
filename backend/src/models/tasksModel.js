const connection = require("../database/connection");

const getTasksByUser = async (userId) => {
    const [tasks] = await connection.execute(
        `SELECT * FROM tarefas WHERE usuario_id = ${userId}`
    );
    return tasks;
};

const createTaskUser = async (task) => {
    const [result] = await connection.execute(
        "INSERT INTO tarefas (titulo, descricao, prioridade, prazo_final, status, usuario_id, categoria_id) VALUES(?, ?, ?, ?, ?, ?, ?)",
        [
            task.titulo,
            task.descricao,
            task.prioridade,
            task.prazo_final,
            task.status,
            task.usuario_id,
            task.categoria_id,
        ]
    );

    return { insertId: result.insertId };
};

const updateTaskUser = async (taskId, task) => {
    const [result] = await connection.execute(
        `UPDATE tarefas SET titulo = ?, descricao = ?, prioridade = ?, prazo_final = ?, status = ?, categoria_id = ? WHERE id_tarefa = ${taskId}`,
        [
            task.titulo,
            task.descricao,
            task.prioridade,
            task.prazo_final,
            task.status,
            task.categoria_id,
        ]
    );
    return result;
};

const deleteTaskUser = async (taskId) => {
    const [result] = await connection.execute(
        `DELETE FROM tarefas WHERE id_tarefa = ${taskId}`
    );
    return result;
};

module.exports = {
    getTasksByUser,
    createTaskUser,
    deleteTaskUser,
    updateTaskUser,
};
