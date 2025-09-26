import { useState } from "react";
import axios from "axios";
import { MapPin, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function CadastroLocal() {
  const [nome_local, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLon] = useState("");
  const [descricao, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const buscarCoordenadas = async () => {
    if (!nome_local || !cidade) {
      return setMessage({
        text: "Informe o nome do local e a cidade antes de buscar coordenadas.",
        type: "error",
      });
    }
    setLoading(true);
    try {
      const res = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: `${nome_local}, ${cidade}`,
          format: "json",
          limit: 1,
        },
      });

      if (res.data.length > 0) {
        setLat(res.data[0].lat);
        setLon(res.data[0].lon);
        setMessage({
          text: "Coordenadas encontradas com sucesso!",
          type: "success",
        });
      } else {
        setMessage({
          text: "Não foi possível encontrar as coordenadas.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Erro ao buscar coordenadas.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const cadastrar = async () => {
    if (!nome_local || !cidade || !latitude || !longitude) {
      return setMessage({
        text: "Preencha todos os campos e busque as coordenadas.",
        type: "error",
      });
    }
    try {
      await axios.post(`${API}/locais`, {
        nome_local,
        cidade,
        coordenadas: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
        descricao,
      });
      setMessage({
        text: "Local cadastrado com sucesso!",
        type: "success",
      });
      setNome("");
      setCidade("");
      setLat("");
      setLon("");
      setDesc("");
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Erro ao cadastrar local.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-300 p-8">
     
      <div className="flex items-center w-full max-w-5xl mb-4 p-4 sticky top-0 z-10 bg-base-300/90 backdrop-blur-sm">
        <button
          className="btn btn-ghost btn-circle text-base-content/70"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Cadastrar Novo Local
        </h1>
      </div>


      <div className="card w-full max-w-5xl bg-base-100 shadow-2xl mt-10">
        <div className="card-body">
          {message.text && (
            <div className={`alert ${message.type === "error" ? "alert-error" : "alert-success"} mb-4`}>
              <div>
                <span>{message.text}</span>
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nome do Local</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Praça da Independência"
                className="input input-bordered w-full"
                value={nome_local}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Cidade</span>
              </label>
              <input
                type="text"
                placeholder="Ex: João Pessoa"
                className="input input-bordered w-full"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Descrição</span>
            </label>
            <textarea
              placeholder="Ex: Ponto turístico central da cidade"
              className="textarea textarea-bordered w-full"
              value={descricao}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="card-actions justify-between mt-6">
            <div className="flex items-center gap-2 text-sm text-accent/80 font-medium">
                <MapPin className="w-4 h-4" />
                <span>Busque as coordenadas antes de salvar.</span>
            </div>
            <div className="flex gap-4">
              <button
              type="button"
              className="btn btn-outline btn-accent"
              onClick={buscarCoordenadas}
              disabled={loading}
            >
              {loading ? "Buscando coordenadas..." : "Buscar Coordenadas"}
            </button>
            <button className="btn btn-accent" onClick={cadastrar}>
              Salvar Local
            </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
