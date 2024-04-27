const userService = require("../services/userService");

const createUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const createdUser = await userService.createUser({
            nome,
            email,
            senha,
        });
        return res.status(201).json(createdUser);
    } catch (erro) {
        return res.status(400).json({ error: erro.message });
    }
};

module.exports = {
    createUser,
};
