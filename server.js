const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Inter Connect Online");
});

app.post("/webhook", async (req, res) => {

    console.log("========== NOVO WEBHOOK ==========");
    console.log(req.body);

    res.status(200).json({
        sucesso: true
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});