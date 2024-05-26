const formulario = document.getElementById("Login");
const msg = document.querySelector(".msg");

const login = async (dados) => {
    const retorno = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Indica que você está enviando JSON
        },
        body: JSON.stringify(dados), // Converte os dados para JSON
    });

    const response = await retorno.json();

    if (retorno.ok) {
        localStorage.setItem("authToken", response.token);
        window.location.href = "tasks.html";
    } else {
        msg.classList.add("message-erro");
        msg.classList.remove("msg");
        msg.classList.remove("message-sucesso");
        msg.innerHTML = response.message;
    }
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.querySelector(".email").value;
    let senha = document.querySelector(".pass").value;

    login({ email, senha });
});
