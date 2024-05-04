const connection = require("../database/connection");

const createUser = async (user) => {
    const [newUser] = await connection.execute(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [user.nome, user.email, user.senha]
    );
    return { insertId: newUser.insertId };
};

const checkEmailExists = async (email) => {
    const [result] = await connection.execute(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
    );
    return result;
};

const deleteTasksByUser = async (userId) => {
    await connection.execute("DELETE FROM tarefas WHERE usuario_id = ?", [
        userId,
    ]);
};

const deleteCategoriesByUser = async (userId) => {
    await connection.execute("DELETE FROM categorias WHERE usuario_id = ?", [
        userId,
    ]);
};

const deleteUser = async (userId) => {
    await connection.execute("DELETE FROM usuarios WHERE id_usuario = ?", [
        userId,
    ]);
};

module.exports = {
    createUser,
    checkEmailExists,
    deleteTasksByUser,
    deleteCategoriesByUser,
    deleteUser,
};
