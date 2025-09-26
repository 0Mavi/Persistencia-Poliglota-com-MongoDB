import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cidadesRoutes from "./routes/cidades.js";
import locaisRoutes from "./routes/locais.js";
import geoRoutes from "./routes/geo.js";
import { connectMongo } from "./db_mongo.js";

const app = express();
app.use(cors());
app.use(express.json());

await connectMongo();

app.use("/cidades", cidadesRoutes);
app.use("/locais", locaisRoutes);
app.use("/geo", geoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend rodando na porta ${PORT}`);
});
