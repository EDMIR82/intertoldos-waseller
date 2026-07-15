const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/*
 * Recebe qualquer formato enviado pelo WaSeller:
 * JSON, texto ou formulário.
 */
app.use(
  express.raw({
    type: "*/*",
    limit: "5mb",
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Inter Connect Online");
});

app.all("/webhook", (req, res) => {
  try {
    let body = {};

    if (Buffer.isBuffer(req.body)) {
      const rawBody = req.body.toString("utf8");

      console.log("========== WEBHOOK RECEBIDO ==========");
      console.log("Método:", req.method);
      console.log("Content-Type:", req.headers["content-type"]);
      console.log("Conteúdo bruto:", rawBody);

      try {
        body = JSON.parse(rawBody);
      } catch {
        try {
          body = Object.fromEntries(new URLSearchParams(rawBody));
        } catch {
          body = { raw: rawBody };
        }
      }
    } else {
      body = req.body || {};
    }

    console.log("Conteúdo interpretado:");
    console.log(JSON.stringify(body, null, 2));

    // Resposta simples e imediata para o WaSeller
    return res.status(200).type("text/plain").send("OK");
  } catch (error) {
    console.error("Erro ao receber webhook:", error);

    // Mesmo com falha no log, responde OK para não gerar reenvios em loop
    return res.status(200).type("text/plain").send("OK");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});