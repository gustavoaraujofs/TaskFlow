const validateRequiredFields = (req, res, next) => {
    const { nome } = req.body;

    if (!nome) {
        req.body.nome = "Categoria sem título";
    }

    next();
};

const checkEmptyNameField = (req, res, next) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ error: "O campo nome é obrigatório." });
    }

    next();
};

module.exports = {
    validateRequiredFields,
    checkEmptyNameField,
};
