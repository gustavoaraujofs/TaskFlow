const categoryModel = require("../models/categoryModel");

const removeSpaces = (str) => {
    return str.trim();
};

const checkCategoryNameExist = async (nome, userId) => {
    let novoNome = removeSpaces(nome);
    let cont = 1;

    let result = await categoryModel.getCategoryByName({
        nome: novoNome,
        userId,
    });

    while (result.length > 0) {
        novoNome = removeSpaces(nome);
        novoNome = `${novoNome} (${cont})`;

        result = await categoryModel.getCategoryByName({
            nome: novoNome,
            userId,
        });

        cont++;
    }

    return novoNome;
};

const createCategory = async (category) => {
    const { nome, userId } = category;

    try {
        const novoNome = await checkCategoryNameExist(nome, userId);

        return await categoryModel.createCategory({
            nome: novoNome,
            userId,
        });
    } catch (erro) {
        throw erro;
    }
};

const getCategoriesByUser = async (userId) => {
    return await categoryModel.getCategoriesByUser(userId);
};

const updateCategoryByUser = async (category) => {
    const { nome, userId, categoryId } = category;
    let novoName = removeSpaces(nome);

    try {
        let result = await categoryModel.getCategoryByName({
            nome: novoName,
            userId,
        });

        if (
            !(
                result.length > 0 &&
                result[0].nome === novoName &&
                result[0].id_categoria == categoryId
            )
        ) {
            const novoNome = await checkCategoryNameExist(nome, userId);

            return await categoryModel.updateCategoryByUser({
                nome: novoNome,
                categoryId,
                userId,
            });
        }
    } catch (erro) {
        throw erro;
    }
};

const deleteCategory = async (category) => {
    try {
        await categoryModel.deleteTasksByCategory(category.categoryId);

        const retorno = await categoryModel.deleteCategory(category);

        if (!retorno.affectedRows) {
            throw new Error("Categoria não encontrada!");
        }
    } catch (erro) {
        throw erro;
    }
};

module.exports = {
    createCategory,
    getCategoriesByUser,
    updateCategoryByUser,
    deleteCategory,
};
