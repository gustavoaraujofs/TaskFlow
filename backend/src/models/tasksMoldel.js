const connection = require("./connection");

const getTasksByUser = async (userId) => {
    const [tasks] = await connection.execute(`SELECT * FROM tarefas WHERE usuario_id = ${userId}`);
    return tasks;
};

module.exports = {
    getTasksByUser,
};
