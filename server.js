const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Aceita JSON
app.use(express.json());

// Aceita formulário
app.use(express.urlencoded({ extended: true }));

// Página inicial
app.get("/", (req, res) => {
    res.send("Inter Connect Online");
});

// Teste GET
app.get("/webhook", (req, res) => {
    res.send("OK");
});

// Recebe QUALQUER webhook
app.all("/webhook", (req, res) => {

    console.log("");
    console.log("====================================");
    console.log("NOVO WEBHOOK RECEBIDO");
    console.log("====================================");

    console.log("Método:");
    console.log(req.method);

    console.log("");

    console.log("Headers:");
    console.log(req.headers);

    console.log("");

    console.log("Query:");
    console.log(req.query);

    console.log("");

    console.log("Body:");
    console.log(req.body);

    console.log("");

    console.log("Body completo:");
    console.log(JSON.stringify(req.body, null, 2));

    console.log("");

    res.status(200).send("OK");

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});