const authService = require("../services/authService");

const loginUser = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);
        return res.status(200).json(result);
    } catch (erro) {
        return res.status(400).json({ message: erro.message });
    }
};

const validate = (req, res) => {
    return res.sendStatus(200).json;
};

module.exports = {
    loginUser,
    validate,
};
