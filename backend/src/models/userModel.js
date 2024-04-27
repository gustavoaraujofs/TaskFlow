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

module.exports = {
    createUser,
    checkEmailExists,
};
