const validateRequiredFields = (req, res, next) => {
    const { nome, email, senha, confirmeSenha } = req.body;

    if (!nome) {
        return res.status(400).json({ error: "O campo nome é obrigatório." });
    }

    if (!email) {
        return res.status(400).json({ error: "O campo email é obrigatório." });
    }

    if (!senha) {
        return res.status(400).json({ error: "O campo senha é obrigatório." });
    }

    if (senha !== confirmeSenha) {
        return res.status(400).json({ error: "As senhas não conferem." });
    }

    next();
};

module.exports = {
    validateRequiredFields,
};
