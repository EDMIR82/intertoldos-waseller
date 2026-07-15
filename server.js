const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Permite receber JSON
app.use(express.json());

// Teste da API
app.get("/", (req, res) => {
    res.send("Inter Connect Online");
});

// Webhook da Wascript
app.post("/webhook", async (req, res) => {

    try {

        console.log("========================================");
        console.log("========= NOVO WEBHOOK RECEBIDO ========");
        console.log("========================================");

        console.log("Headers:");
        console.log(req.headers);

        console.log("Body:");
        console.log(JSON.stringify(req.body, null, 2));

        res.status(200).json({
            sucesso: true,
            mensagem: "Webhook recebido com sucesso."
        });

    } catch (error) {

        console.error("ERRO AO PROCESSAR WEBHOOK:");
        console.error(error);

        res.status(500).json({
            sucesso: false,
            erro: error.message
        });

    }

});

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});