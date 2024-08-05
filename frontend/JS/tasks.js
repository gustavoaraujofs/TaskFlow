const tbody = document.querySelector("#my-table tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-tarefa");
const inputPrazo = document.querySelector(".input-prazo");
const btnCreate = document.querySelector(".btn-tarefa");
const selectCategoria = document.querySelector(".input-categoria");
const btnAcoesCategoria = document.querySelector(".btn-acoes-categoria");
const dropdownMenu = document.querySelector(".dropdown-menu");

const btnCriarCategoria = document.querySelector(".btn-criar-categoria");
const btnEditCategoria = document.querySelector(".btn-renomear-categoria");
const btnDeleteCategoria = document.querySelector(".btn-apagar-categoria");
const token = localStorage.getItem("authToken");

const formatDate = (dateString) => {
    const options = { dateStyle: "long" };
    const date = new Date(dateString).toLocaleString("pt-br", options);
    return date;
};

const loadCategorias = async () => {
    selectCategoria.innerHTML = `<option value="">Selecionar Categoria</option>`;
    const categorias = await getCategories();
    categorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.value = JSON.stringify(categoria);
        option.textContent = categoria.nome;
        selectCategoria.appendChild(option);
    });
};

selectCategoria.addEventListener("change", async ({ target }) => {
    const categoriaSelecionada = target.value;
    if (categoriaSelecionada) {
        const categoria = JSON.parse(categoriaSelecionada);
        loadTaks(categoria.id_categoria);
    } else {
        loadTaks();
    }
});

const getTasks = async () => {
    const retorno = await fetch(`http://localhost:3000/tasks`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const response = await retorno.json();
    return response;
};

const createTask = async (e) => {
    e.preventDefault();
    const categoriaSelecionada = selectCategoria.value;
    let categoria;

    if (categoriaSelecionada) {
        const obj = JSON.parse(categoriaSelecionada);
        categoria = obj.id_categoria;
    } else {
        categoria = null;
    }

    const task = {
        titulo: inputTask.value,
        prazo_final: inputPrazo.value || null, // Define null se o campo de prazo estiver vazio
    };

    await fetch(`http://localhost:3000/tasks/${categoria}`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    loadTaks(categoria);
    inputTask.value = "";
    inputPrazo.value = "";
    btnCreate.disabled = true;
};

const deleteTask = async (id_tarefa) => {
    const categoriaSelecionada = selectCategoria.value;
    let categoria;

    if (categoriaSelecionada) {
        const obj = JSON.parse(categoriaSelecionada);
        categoria = obj.id_categoria;
    } else {
        categoria = null;
    }

    await fetch(`http://localhost:3000/tasks/${id_tarefa}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    loadTaks(categoria);
};

const updateTask = async ({ id_tarefa, titulo, prazo_final, status }) => {
    const categoriaSelecionada = selectCategoria.value;
    let categoria;

    if (categoriaSelecionada) {
        const obj = JSON.parse(categoriaSelecionada);
        categoria = obj.id_categoria;
    } else {
        categoria = null;
    }

    const formattedPrazoFinal = prazo_final ? prazo_final : null;
    const dadosAtualizacao = {
        titulo,
        prazo_final: formattedPrazoFinal,
        status,
    };

    await fetch(`http://localhost:3000/tasks/${id_tarefa}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAtualizacao),
    });

    loadTaks(categoria);
};

const createElement = (tag, conteudo = "", tagHtml = "") => {
    const td = document.createElement(tag);
    if (conteudo) {
        td.textContent = conteudo;
    }
    if (tagHtml) {
        td.innerHTML = tagHtml;
    }
    return td;
};

const createSelect = (value) => {
    const options = `
    <option value="Pendente">Pendente</option>
    <option value="Em andamento">Em andamento</option>
    <option value="Concluída">Concluída</option>
    `;

    const select = createElement("select", "", options);

    select.value = value;

    return select;
};

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const createBody = (tasks) => {
    const { id_tarefa, titulo, prazo_final, status } = tasks;
    const tr = document.createElement("tr");
    const tdTitle = createElement("td", titulo);
    tr.appendChild(tdTitle);

    const prazoText = prazo_final ? formatDate(prazo_final) : "Sem prazo";
    const tdPrazo = createElement("td", prazoText);
    tr.appendChild(tdPrazo);

    if (status === "Concluída") {
        tdTitle.style.textDecoration = "line-through";
        tdTitle.style.color = "green";
    }

    const select = createSelect(status);

    select.addEventListener("change", ({ target }) => {
        let novoPrazo = prazo_final ? prazo_final.split("T")[0] : prazo_final;
        updateTask({
            id_tarefa,
            titulo,
            prazo_final: novoPrazo,
            status: target.value,
        });
    });

    let td = createElement("td");
    td.appendChild(select);
    tr.appendChild(td);

    const editButton = createElement(
        "button",
        "",
        '<span class="material-symbols-outlined">edit_note</span>'
    );

    const deleteButton = createElement(
        "button",
        "",
        '<span class="material-symbols-outlined">delete</span>'
    );

    td = createElement("td", "");
    td.appendChild(editButton);
    td.appendChild(deleteButton);
    tr.appendChild(td);

    editButton.title = "Editar Tarefa";
    deleteButton.title = "Deletar Tarefa";

    const editForm = createElement("form");
    const editInput = createElement("input");
    const editPrazo = createElement("input");

    editInput.value = titulo;
    editPrazo.value = prazo_final ? prazo_final : "";
    editPrazo.type = "date";
    editForm.appendChild(editInput);
    editForm.appendChild(editPrazo);
    editPrazo.setAttribute("min", getTodayDate());

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        updateTask({
            id_tarefa,
            titulo: editInput.value,
            prazo_final: editPrazo.value || null,
            status,
        });
    });

    editButton.addEventListener("click", () => {
        tdTitle.innerText = "";
        tdPrazo.innerText = "";
        tdTitle.appendChild(editForm);
        tdPrazo.appendChild(editPrazo);
        editInput.focus(); // Adiciona o foco no campo de edição ao clicar no botão de editar
    });

    // Adicionando evento para detectar "Enter" no campo de prazo
    editPrazo.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            editForm.requestSubmit(); // Submete o formulário de edição
        }
    });

    editButton.classList.add("btn-action");
    deleteButton.classList.add("btn-action");

    deleteButton.addEventListener("click", () => deleteTask(id_tarefa));

    return tr;
};

const toggleSubmitButton = () => {
    if (inputTask.value.trim() !== "") {
        btnCreate.disabled = false;
    } else {
        btnCreate.disabled = true;
    }
};

inputPrazo.setAttribute("min", getTodayDate());
inputTask.addEventListener("input", toggleSubmitButton);

const loadTaks = async (categoriaId = "") => {
    const tasks = await getTasks();

    tbody.innerHTML = "";

    const filteredTasks = categoriaId
        ? tasks.filter((task) => task.categoria_id === categoriaId)
        : tasks.filter((task) => task.categoria_id === null);

    filteredTasks.forEach((tasks) => {
        const tr = createBody(tasks);
        tbody.appendChild(tr);
    });
};

const getCategories = async () => {
    const retorno = await fetch(`http://localhost:3000/categories`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const response = await retorno.json();
    return response;
};

const createCategories = async (e) => {
    e.preventDefault();

    const novaCategoria = prompt("Digite o nome da nova categoria: ");
    if (novaCategoria) {
        const categoria = {
            nome: novaCategoria,
        };
        await fetch("http://localhost:3000/categories", {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoria),
        });
        loadCategorias();
    }
};

const updateCategory = async (e) => {
    e.preventDefault();
    const categoriaSelecionada = selectCategoria.value;

    if (categoriaSelecionada) {
        const categoria = JSON.parse(categoriaSelecionada);
        const novoNome = prompt(
            "Digite o novo nome para a categoria:",
            categoria.nome
        );

        if (novoNome) {
            const atualizacao = {
                id_categoria: categoria.id_categoria,
                nome: novoNome,
            };

            await fetch(
                `http://localhost:3000/categories/${categoria.id_categoria}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(atualizacao),
                }
            );

            loadCategorias();
        }
    } else {
        alert("Selecione uma categoria para renomear.");
    }
};

const deleteCategory = async (e) => {
    e.preventDefault();
    const categoriaSelecionada = selectCategoria.value;

    if (categoriaSelecionada) {
        const categoria = JSON.parse(categoriaSelecionada);
        const confirmar = prompt(
            `Digite o nome da categoria "${categoria.nome}" para confirmar a exclusão:`
        );
        if (confirmar === categoria.nome) {
            await fetch(
                `http://localhost:3000/categories/${categoria.id_categoria}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            loadCategorias();
            loadTaks();
        }
    } else {
        alert("Selecione uma categoria para apagar.");
    }
};

btnCriarCategoria.addEventListener("click", createCategories);
btnEditCategoria.addEventListener("click", updateCategory);
btnDeleteCategoria.addEventListener("click", deleteCategory);

addForm.addEventListener("submit", createTask);
loadCategorias();
loadTaks();
