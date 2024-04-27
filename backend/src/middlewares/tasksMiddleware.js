const validateRequiredFields = (req, res, next) => {
    const { body } = req;

    if (!body.titulo) {
        return res.status(400).json({ error: "O campo titulo é obrigatório." });
    }

    next();
};

const validateStatusField = (req, res, next) => {
    const { body } = req;

    if (!body.status) {
        return res.status(400).json({ error: "O campo status é obrigatório." });
    }

    next();
};

module.exports = {
    validateRequiredFields,
    validateStatusField,
};
