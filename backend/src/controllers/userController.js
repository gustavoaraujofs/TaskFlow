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
        return res.status(400).json({ message: erro.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.userId;
        
        await userService.deleteUser(userId);

        return res.status(204).json();
    } catch (erro) {
        return res.status(400).json({ message: erro.message });
    }
};

module.exports = {
    createUser,
    deleteUser,
};
