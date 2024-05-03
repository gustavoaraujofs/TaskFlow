const categoryService = require("../services/categoryService");

const createCategory = async (req, res) => {
    try {
        const { nome } = req.body;
        const userId = req.userId;

        const result = await categoryService.createCategory({ nome, userId });

        return res.status(201).json(result);
    } catch (erro) {
        return res.status(400).json({ message: erro.message });
    }
};

const getCategoriesByUser = async (req, res) => {
    try {
        const userId = req.userId;

        const categories = await categoryService.getCategoriesByUser(userId);

        return res.status(200).json(categories);
    } catch (erro) {
        return res.status(400).json({ message: erro.message });
    }
};

const updateCategoryByUser = async (req, res) => {
    try {
        const { nome } = req.body;
        const userId = req.userId;
        const categoryId = req.params.id;

        await categoryService.updateCategoryByUser({
            nome,
            userId,
            categoryId,
        });
        return res.status(204).send();
    } catch (erro) {
        return res.status(400).json({ message: erro.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const userId = req.userId;

        await categoryService.deleteCategory({ categoryId, userId });

        return res.status(204).json();
    } catch (erro) {
        if (erro.message === "Categoria não encontrada!") {
            return res.status(404).json({ message: erro.message });
        } else {
            return res.status(400).json({ message: erro.message });
        }
    }
};

module.exports = {
    createCategory,
    getCategoriesByUser,
    updateCategoryByUser,
    deleteCategory,
};
