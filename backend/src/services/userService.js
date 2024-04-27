const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
    const { nome, email, senha } = user;

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

module.exports = {
    createUser,
};
