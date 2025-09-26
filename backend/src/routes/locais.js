import express from "express";
import { Local } from "../db_mongo.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const payload = req.body;
  
    const local = new Local(payload);
    await local.save();
    res.json({ message: "Local cadastrado com sucesso!", local });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar local" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { cidade } = req.query;
    const filter = cidade ? { cidade } : {};
    const locais = await Local.find(filter).sort({ _id: -1 }).lean();
    res.json(locais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar locais" });
  }
});

export default router;
