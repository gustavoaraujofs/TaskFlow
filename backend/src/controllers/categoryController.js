const categoryService = require("../services/categoryService");

const getUserId = (req) => {
    return req.userId;
};

const handleErrors = (res, erro) => {
    if (erro.message === "Categoria não encontrada!") {
        return res.status(404).json({ message: erro.message });
    } else {
        return res.status(400).json({ message: erro.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const { nome } = req.body;
        const userId = getUserId(req);

        const result = await categoryService.createCategory({ nome, userId });

        return res.status(201).json(result);
    } catch (erro) {
        return handleErrors(res, erro);
    }
};

const getCategoriesByUser = async (req, res) => {
    try {
        const userId = getUserId(req);

        const categories = await categoryService.getCategoriesByUser(userId);

        return res.status(200).json(categories);
    } catch (erro) {
        return handleErrors(res, erro);
    }
};

const updateCategoryByUser = async (req, res) => {
    try {
        const { nome } = req.body;
        const userId = getUserId(req);
        const categoryId = req.params.id;

        await categoryService.updateCategoryByUser({
            nome,
            userId,
            categoryId,
        });
        return res.status(204).send();
    } catch (erro) {
        return handleErrors(res, erro);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const userId = getUserId(req);

        await categoryService.deleteCategory({ categoryId, userId });

        return res.status(204).json();
    } catch (erro) {
        return handleErrors(res, erro);
    }
};

module.exports = {
    createCategory,
    getCategoriesByUser,
    updateCategoryByUser,
    deleteCategory,
};
