const connection = require("../database/connection");

const createCategory = async (category) => {
    const [newCategory] = await connection.execute(
        "INSERT INTO categorias (nome, usuario_id) VALUES (?, ?)",
        [category.nome, category.userId]
    );

    return { insertId: newCategory.insertId };
};

const getCategoriesByUser = async (userId) => {
    const [categories] = await connection.execute(
        "SELECT * FROM categorias WHERE usuario_id = ?",
        [userId]
    );
    return categories;
};

const getCategoryByName = async (category) => {
    const [result] = await connection.execute(
        "SELECT * FROM categorias WHERE nome = ? and usuario_id = ?",
        [category.nome, category.userId]
    );
    return result;
};

const getCategoryById = async (categoryId) => {
    const [result] = await connection.execute(
        "SELECT * FROM categorias WHERE id_categoria = ?",
        [categoryId]
    );
    return result;
};

const updateCategoryByUser = async (category) => {
    await connection.execute(
        "UPDATE categorias SET nome = ? WHERE id_categoria = ? AND usuario_id = ?",
        [category.nome, category.categoryId, category.userId]
    );
};

const deleteTasksByCategory = async (categoryId) => {
    await connection.execute("DELETE FROM tarefas WHERE categoria_id = ?", [
        categoryId,
    ]);
};

const deleteCategory = async (category) => {
    const [result] = await connection.execute(
        "DELETE FROM categorias WHERE id_categoria = ? AND usuario_id = ?",
        [category.categoryId, category.userId]
    );
    return result;
};

module.exports = {
    createCategory,
    getCategoriesByUser,
    getCategoryByName,
    getCategoryById,
    updateCategoryByUser,
    deleteTasksByCategory,
    deleteCategory,
};
