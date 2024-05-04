const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const removeSpaces = (str) => {
    return str.trim();
};

const createUser = async (user) => {
    const { email, senha } = user;
    let { nome } = user;

    nome = removeSpaces(nome);

    try {
        const result = await userModel.checkEmailExists(email);

        if (result.length > 0) {
            throw new Error("O e-mail fornecido já está registrado.");
        }

        const passwordHash = await bcrypt.hash(senha, 10);

        return await userModel.createUser({ nome, email, senha: passwordHash });
    } catch (erro) {
        throw erro;
    }
};

const deleteUser = async (userId) => {
    try {
        await userModel.deleteTasksByUser(userId);

        await userModel.deleteCategoriesByUser(userId);

        await userModel.deleteUser(userId);
    } catch (erro) {
        throw erro;
    }
};

module.exports = {
    createUser,
    deleteUser,
};
