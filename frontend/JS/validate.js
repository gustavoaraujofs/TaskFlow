document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("Realize o login para acessar esta página.");
        window.location.href = "login.html";
    } else {
        try {
            const response = await fetch("http://localhost:3000/validate", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            
            if (!response.ok) {
                alert("Sua sessão expirou. Faça o login novamente para continuar.");
                window.location.href = "login.html";
            }
        } catch (erro) {
            alert("Erro ao validar a sessão. Por favor, faça login novamente.");
            window.location.href = "login.html";
        }
    }
});
