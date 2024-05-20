const formulario = document.querySelector("#Register");
const msg = document.querySelector(".msg");

const register = async (dados) => {
    const retorno = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Indica que você está enviando JSON
        },
        body: JSON.stringify(dados), // Converte os dados para JSON
    });

    const response = await retorno.json();

    if (retorno.ok) {
        msg.classList.add("message-sucesso");
        msg.classList.remove("msg");
        msg.classList.remove("message-erro");
        msg.innerHTML = "Usuário cadastrado com sucesso!";
        formulario.reset();

        setTimeout(() => {
            window.location.href = "login.html"; 
        }, 2000);

    } else {
        msg.classList.add("message-erro");
        msg.classList.remove("msg");
        msg.classList.remove("message-sucesso");
        msg.innerHTML = response.message;
    }
};

formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("pass").value;
    let confirmeSenha = document.getElementById("confirme-pass").value;

    register({ nome, email, senha, confirmeSenha });
});
