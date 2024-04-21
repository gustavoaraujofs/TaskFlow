const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.status(200).send({ message: "Bem Vindo(a) a API!" });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`);
});
