const connection = require("../database/connection");

const getTasksByUser = async (userId) => {
    const [tasks] = await connection.execute(
        "SELECT * FROM tarefas WHERE usuario_id = ?",
        [userId]
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

const updateTaskUser = async (fields, valores) => {
    const [result] = await connection.execute(fields, valores);
    return result;
};

const deleteTaskUser = async (task) => {
    const [result] = await connection.execute(
        "DELETE FROM tarefas WHERE id_tarefa = ? AND usuario_id = ?",
        [task.taskId, task.userId]
    );
    return result;
};

module.exports = {
    getTasksByUser,
    createTaskUser,
    deleteTaskUser,
    updateTaskUser,
};
