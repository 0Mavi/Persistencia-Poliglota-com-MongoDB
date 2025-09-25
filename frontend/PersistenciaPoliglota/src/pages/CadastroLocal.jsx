import { useState } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function CadastroLocal() {
  const [nome_local, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLon] = useState("");
  const [descricao, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarCoordenadas = async () => {
    if (!nome_local || !cidade) {
      return alert("Informe o nome do local e a cidade antes de buscar coordenadas.");
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
      } else {
        alert("Não foi possível encontrar as coordenadas.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar coordenadas.");
    } finally {
      setLoading(false);
    }
  };

  const cadastrar = async () => {
    if (!nome_local || !cidade || !latitude || !longitude) {
      return alert("Preencha nome, cidade e busque as coordenadas.");
    }
    try {
      await axios.post(`${API}/locais`, {
        nome_local,
        cidade,
        coordenadas: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
        descricao,
      });
      alert("Local cadastrado!");
      setNome("");
      setCidade("");
      setLat("");
      setLon("");
      setDesc("");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar local");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-8">
      {/* Seção Hero */}
      <div className="hero bg-base-100 rounded-box shadow-xl mb-12 w-full max-w-3xl">
        <div className="hero-content text-center py-12">
          <div className="max-w-md">
            <MapPin className="w-20 h-20 text-accent mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-base-content">
              Cadastrar Novo Local
            </h1>
            <p className="py-4 text-base-content">
              Informe os dados do ponto de interesse. As coordenadas serão calculadas automaticamente.
            </p>
          </div>
        </div>
      </div>

      {/* Card de Cadastro */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
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

          <div className="form-control mt-4">
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

          {/* Botão para buscar coordenadas */}
          <div className="mt-4">
            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={buscarCoordenadas}
              disabled={loading}
            >
              {loading ? "Buscando coordenadas..." : "Buscar Coordenadas"}
            </button>
          </div>

          {latitude && longitude && (
            <div className="mt-4 p-3 rounded bg-base-200 text-sm text-base-content">
              <strong>Coordenadas encontradas:</strong><br />
              Lat: {latitude} <br />
              Lon: {longitude}
            </div>
          )}

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

          <div className="card-actions justify-end mt-6">
            <button className="btn btn-accent w-full" onClick={cadastrar}>
              Salvar Local
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
