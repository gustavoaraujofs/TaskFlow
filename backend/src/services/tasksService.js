const tasksModel = require("../models/tasksModel");
const categoryModel = require("../models/categoryModel");

const getTasksByUser = async (userId) => {
    return await tasksModel.getTasksByUser(userId);
};

const checkCategoryByUser = async (categoryId, userId) => {
    const result = await categoryModel.getCategoryById(categoryId);
    if (result.length > 0) {
        if (result[0].usuario_id === userId) {
            return true;
        } else {
            return false;
        }
    }
    return false;
};

const createTaskUser = async (task, userId, categoryId = null) => {
    let { titulo, descricao, prioridade, prazo_final } = task;

    try {
        if (categoryId) {
            const result = await checkCategoryByUser(categoryId, userId);

            if (!result) {
                categoryId = null;
            }
        }

        descricao = descricao || null;
        prioridade = prioridade || null;
        prazo_final = prazo_final || null;

        return await tasksModel.createTaskUser({
            titulo,
            descricao,
            prioridade,
            prazo_final,
            status: "Pendente",
            usuario_id: userId,
            categoria_id: categoryId,
        });
    } catch (erro) {
        throw erro;
    }
};

const updateTaskUser = async (taskId, userId, task) => {
    let { titulo, descricao, prioridade, prazo_final, status, categoria_id } =
        task;
    let fields = [];
    let valores = [];

    try {
        fields.push("titulo = ?");
        valores.push(titulo);

        fields.push("status = ?");
        valores.push(status);

        if (descricao) {
            fields.push("descricao = ?");
            valores.push(descricao);
        }

        if (prioridade) {
            fields.push("prioridade = ?");
            valores.push(prioridade);
        }

        if (prazo_final) {
            fields.push("prazo_final = ?");
            valores.push(prazo_final);
        }

        if (categoria_id) {
            const result = await checkCategoryByUser(categoria_id, userId);

            if (result) {
                fields.push("categoria_id = ?");
                valores.push(categoria_id);
            }
        }

        valores.push(taskId);
        valores.push(userId);

        const query = `UPDATE tarefas SET ${fields.join(
            ", "
        )} WHERE id_tarefa = ? AND usuario_id = ?`;

        const retorno = await tasksModel.updateTaskUser(query, valores);

        if (!retorno.affectedRows) {
            throw new Error("Tarefa não encontrada!");
        }
    } catch (erro) {
        throw erro;
    }
};

const deleteTaskUser = async (task) => {
    try {
        const retorno = await tasksModel.deleteTaskUser(task);

        if (!retorno.affectedRows) {
            throw new Error("Tarefa não encontrada!");
        }
    } catch (erro) {
        throw erro;
    }
};

module.exports = {
    getTasksByUser,
    createTaskUser,
    updateTaskUser,
    deleteTaskUser,
};
