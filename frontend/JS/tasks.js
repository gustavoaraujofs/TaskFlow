const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

const token = localStorage.getItem("authToken");

const search = async () => {
    const retorno = await fetch("http://localhost:3000/tasks", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const response = await retorno.json();
    console.log(response);
};

search();
// console.log(tasks);

// function criaLi() {
//     const li = document.createElement("li");
//     return li;
// }

// inputTarefa.addEventListener("keypress", function (e) {
//     if (e.keyCode === 13) {
//         if (!inputTarefa.value) return;
//         criaTarefa(inputTarefa.value);
//     }
// });

// function limpaInput() {
//     inputTarefa.value = "";
//     inputTarefa.focus();
// }

// function criaBotaoApagar(li) {
//     li.innerText += " ";
//     const botaoApagar = document.createElement("button");
//     botaoApagar.innerText = "Apagar";
//     botaoApagar.setAttribute("class", "apagar");
//     botaoApagar.setAttribute("title", "Apagar esta tarefa");
//     li.appendChild(botaoApagar);
// }

// function criaTarefa(textoInput) {
//     const li = criaLi();
//     li.innerText = textoInput;
//     tarefas.appendChild(li);
//     limpaInput();
//     criaBotaoApagar(li);
// }

// btnTarefa.addEventListener("click", function () {
//     if (!inputTarefa.value) return;

//     criaTarefa(inputTarefa.value);
// });

// document.addEventListener("click", function (e) {
//     const el = e.target;
//     if (el.classList.contains("apagar")) {
//         el.parentElement.remove();
//     }
// });
