import { useState } from "react";
import axios from "axios";
import { Building2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function CadastroCidade() {
  const [nome, setNome] = useState("");
  const [estado, setEstado] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const cadastrar = async () => {
    if (!nome || !estado) {
      return setMessage({ text: "Preencha nome e estado.", type: "error" });
    }
    try {
      await axios.post(`${API}/cidades`, { nome, estado });
      setMessage({ text: "Cidade cadastrada com sucesso!", type: "success" });
      setNome("");
      setEstado("");
    } catch (err) {
      console.error(err);
      setMessage({ text: "Erro ao cadastrar.", type: "error" });
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
          Cadastrar Nova Cidade
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome da Cidade</span>
            </label>
            <input
              type="text"
              placeholder="Ex: João Pessoa"
              className="input input-bordered w-full"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Estado</span>
            </label>
            <input
              type="text"
              placeholder="Ex: PB"
              className="input input-bordered w-full"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>

          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary w-full" onClick={cadastrar}>
              Salvar Cidade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
