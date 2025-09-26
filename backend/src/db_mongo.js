import mongoose from "mongoose";

export async function connectMongo() {
  const uri = process.env.MONGO_URI ;
  try {
    await mongoose.connect(uri,);
    console.log("✅ MongoDB conectado!");
  } catch (err) {
    console.error("Erro ao conectar no MongoDB:", err);
    throw err;
  }
}

const LocalSchema = new mongoose.Schema({
  nome_local: { type: String, required: true },
  cidade: { type: String, required: true },
  coordenadas: {
    latitude: Number,
    longitude: Number
  },
  descricao: String
});

export const Local = mongoose.model("Local", LocalSchema);
