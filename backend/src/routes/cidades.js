import express from "express";
import { initSQLite } from "../db_sqlite.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nome, estado } = req.body;
    const db = await initSQLite();
    const result = await db.run("INSERT INTO cidades (nome, estado) VALUES (?, ?)", [nome, estado]);
    res.json({ message: "Cidade cadastrada com sucesso!", id: result.lastID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar cidade" });
  }
});

router.get("/", async (req, res) => {
  try {
    const db = await initSQLite();
    const cidades = await db.all("SELECT * FROM cidades ORDER BY id DESC");
    res.json(cidades);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar cidades" });
  }
});

export default router;
