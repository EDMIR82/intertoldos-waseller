const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
        console.log("Recebido OPTIONS");
        return res.sendStatus(200);
    }

    next();
});

app.get("/", (req, res) => {
    res.send("Inter Connect Online");
});

app.get("/webhook", (req, res) => {
    res.send("Webhook OK");
});

app.post("/webhook", (req, res) => {

    console.log("=================================");
    console.log("POST RECEBIDO");
    console.log("=================================");

    console.log(req.body);

    res.status(200).json({
        success: true
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor iniciado porta " + PORT);
});