import express from "express";
import { Local } from "../db_mongo.js";
import { getDistance } from "geolib";

const router = express.Router();


router.get("/proximos", async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);
    const raioKm = parseFloat(req.query.raio || "10");

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return res.status(400).json({ error: "lat e lon são obrigatórios (números)" });
    }

    const locais = await Local.find().lean();

    const proximos = locais.filter(l => {
      if (!l.coordenadas || l.coordenadas.latitude == null) return false;
      const distMeters = getDistance(
        { latitude: lat, longitude: lon },
        { latitude: l.coordenadas.latitude, longitude: l.coordenadas.longitude }
      );
      return distMeters <= raioKm * 1000;
    });

    res.json(proximos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar locais próximos" });
  }
});

export default router;
