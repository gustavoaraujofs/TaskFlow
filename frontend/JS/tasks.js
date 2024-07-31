const tbody = document.querySelector("#my-table tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-tarefa");
const token = localStorage.getItem("authToken");

const getTasks = async () => {
    const retorno = await fetch("http://localhost:3000/tasks", {
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
    const task = { titulo: inputTask.value };

    await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    loadTaks();
    inputTask.value = "";
};

const deleteTask = async (id_tarefa) => {
    await fetch(`http://localhost:3000/tasks/${id_tarefa}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    loadTaks();
};

const updateTask = async ({ id_tarefa, titulo, status }) => {
    await fetch(`http://localhost:3000/tasks/${id_tarefa}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo, status }),
    });

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
    <option value="Pendente">pendente</option>
    <option value="Em andamento">em andamento</option>
    <option value="Concluída">concluída</option>
    `;

    const select = createElement("select", "", options);

    select.value = value;

    return select;
};

const createBody = (tasks) => {
    const { id_tarefa, titulo, prazo_final, status } = tasks;
    const tr = document.createElement("tr");
    const tdTitle = createElement("td", titulo);
    tr.appendChild(tdTitle);

    let td = createElement("td", prazo_final);
    tr.appendChild(td);

    const select = createSelect(status);

    select.addEventListener("change", ({ target }) =>
        updateTask({ ...tasks, status: target.value })
    );

    td = createElement("td");
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

    const editForm = createElement("form");
    const editInput = createElement("input");

    editInput.value = titulo;
    editForm.appendChild(editInput);

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        updateTask({ id_tarefa, titulo: editInput.value, status });
    });

    editButton.addEventListener("click", () => {
        tdTitle.innerText = "";
        tdTitle.appendChild(editForm);
    });

    editButton.classList.add("btn-action");
    deleteButton.classList.add("btn-action");

    deleteButton.addEventListener("click", () => deleteTask(id_tarefa));

    return tr;
};

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
