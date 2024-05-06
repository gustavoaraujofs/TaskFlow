const validateRequiredFields = (req, res, next) => {
    const { nome, email, senha, confirmeSenha } = req.body;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nome) {
        return res.status(400).json({ message: "O campo nome é obrigatório." });
    }

    if (!email) {
        return res.status(400).json({ message: "O campo email é obrigatório." });
    }

    if (!regex.test(email)) {
        return res.status(400).json({ message: "Email inválido!" });
    }

    if (!senha) {
        return res.status(400).json({ message: "O campo senha é obrigatório." });
    }

    if (senha.length < 4) {
        return res
            .status(400)
            .json({ message: "A senha deve ter no mínimo 4 caracteres." });
    }

    if (senha.includes(" ")) {
        return res
            .status(400)
            .json({ message: "A senha não pode conter espacos em branco." });
    }

    if (senha !== confirmeSenha) {
        return res.status(400).json({ message: "As senhas não conferem." });
    }

    next();
};

module.exports = {
    validateRequiredFields,
};
