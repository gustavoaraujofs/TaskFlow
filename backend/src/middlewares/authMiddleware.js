const jwt = require("jsonwebtoken");

const validateRequiredFields = (req, res, next) => {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(400).json({ error: "O campo email é obrigatório." });
    }
    if (!senha) {
        return res.status(400).json({ error: "O campo senha é obrigatório." });
    }
    next();
};

const checkToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Não autorizado" });
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (erro) {
        return res.status(401).json({ error: "Token inválido!" });
    }
};

module.exports = {
    validateRequiredFields,
    checkToken,
};
