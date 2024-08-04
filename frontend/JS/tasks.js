const tbody = document.querySelector("#my-table tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-tarefa");
const inputPrazo = document.querySelector(".input-prazo");
const btnCreate = document.querySelector(".btn-tarefa");
const token = localStorage.getItem("authToken");

const formatDate = (dateString) => {
    const options = { dateStyle: "long" };
    const date = new Date(dateString).toLocaleString("pt-br", options);
    return date;
};

const getTasks = async () => {
    const retorno = await fetch("http://localhost:3000/tasks", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const response = await retorno.json();
    console.log("Tarefas retornadas do servidor:", response); // Log para verificar os dados recebidos
    return response;
};

const createTask = async (e) => {
    e.preventDefault();
    const task = {
        titulo: inputTask.value,
        prazo_final: inputPrazo.value || null, // Define null se o campo de prazo estiver vazio
    };

    console.log("Dados enviados para criação:", task.prazo_final); // Log para verificar os dados enviados

    const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    const result = await response.json();
    console.log("Resposta do servidor para criação:", result); // Log para verificar a resposta do servidor

    loadTaks();
    inputTask.value = "";
    inputPrazo.value = "";
    btnCreate.disabled = true;
};

const deleteTask = async (id_tarefa) => {
    console.log("Dados enviados para exclusão:", { id_tarefa }); // Log para verificar os dados enviados

    const response = await fetch(`http://localhost:3000/tasks/${id_tarefa}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    // Não tentar analisar JSON para resposta vazia
    if (!response.ok) {
        console.error(
            "Erro na exclusão da tarefa:",
            response.status,
            response.statusText
        );
    } else {
        console.log("Tarefa excluída com sucesso");
    }

    loadTaks();
};

const updateTask = async ({ id_tarefa, titulo, prazo_final, status }) => {
    // Formatar a data e hora para um formato compatível com o banco de dados
    const formattedPrazoFinal = prazo_final ? prazo_final : null;
    const dadosAtualizacao = {
        titulo,
        prazo_final: formattedPrazoFinal,
        status,
    };
    console.log("Dados enviados para atualização:", {
        id_tarefa,
        ...dadosAtualizacao,
    }); // Log para verificar os dados enviados

    const response = await fetch(`http://localhost:3000/tasks/${id_tarefa}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAtualizacao),
    });

    const responseText = await response.text(); // Ler o texto da resposta para logs detalhados
    console.log("Resposta do servidor:", response);
    console.log("Texto da resposta do servidor:", responseText); // Log detalhado da resposta

    if (!response.ok) {
        console.error(
            "Erro na atualização da tarefa:",
            response.status,
            response.statusText
        );
    } else if (responseText) {
        // Verificar se há texto na resposta antes de analisar
        const result = JSON.parse(responseText); // Parse the JSON text
        console.log("Tarefa atualizada com sucesso:", result);
    }

    loadTaks();
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

    const select = createSelect(status);

    select.addEventListener("change", ({ target }) => {
        let novoPrazo = prazo_final.split("T")[0];
        console.log(novoPrazo);
        updateTask({ id_tarefa, titulo, novoPrazo, status: target.value });
    });

    td = createElement("td");
    td.appendChild(select);
    tr.appendChild(td);

    // const tdStatus = createElement("td");
    // tdStatus.appendChild(select);
    // tr.appendChild(tdStatus);

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

    // const tdActions = createElement("td", "");
    // tdActions.appendChild(editButton);
    // tdActions.appendChild(deleteButton);
    // tr.appendChild(tdActions);

    td = createElement("td", "");
    td.appendChild(editButton);
    td.appendChild(deleteButton);
    tr.appendChild(td);

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

const loadTaks = async () => {
    const tasks = await getTasks();

    tbody.innerHTML = "";

    tasks.forEach((tasks) => {
        const tr = createBody(tasks);
        tbody.appendChild(tr);
    });
};

addForm.addEventListener("submit", createTask);

loadTaks();
