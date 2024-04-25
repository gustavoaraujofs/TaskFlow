const connection = require("./connection");

const getTasksByUser = async (userId) => {
    const [tasks] = await connection.execute(
        `SELECT * FROM tarefas WHERE usuario_id = ${userId}`
    );
    return tasks;
};

const createTaskUser = async (task, userId, categoryId = null) => {
    let { titulo, descricao, prioridade, prazo_final } = task;

    descricao = descricao || null;
    prioridade = prioridade || null;
    prazo_final = prazo_final || null;

    const [result] = await connection.execute(
        "INSERT INTO tarefas (titulo, descricao, prioridade, prazo_final, status, usuario_id, categoria_id) VALUES(?, ?, ?, ?, ?, ?, ?)",
        [
            titulo,
            descricao,
            prioridade,
            prazo_final,
            "Pendente",
            userId,
            categoryId,
        ]
    );

    return { insertId: result.insertId };
};

const updateTaskUser = async (taskId, task) => {
    let { titulo, descricao, prioridade, prazo_final, status, categoria_id } =
        task;

    descricao = descricao || null;
    prioridade = prioridade || null;
    prazo_final = prazo_final || null;
    categoria_id = categoria_id || null;

    const [result] = await connection.execute(
        `UPDATE tarefas SET titulo = ?, descricao = ?, prioridade = ?, prazo_final = ?, status = ?, categoria_id = ? WHERE id_tarefa = ${taskId}`,
        [titulo, descricao, prioridade, prazo_final, status, categoria_id]
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
