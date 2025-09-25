import { useState } from "react";
import axios from "axios";
import { Building2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function CadastroCidade() {
  const [nome, setNome] = useState("");
  const [estado, setEstado] = useState("");

  const cadastrar = async () => {
    if (!nome || !estado) return alert("Preencha nome e estado");
    try {
      await axios.post(`${API}/cidades`, { nome, estado });
      alert("Cidade cadastrada!");
      setNome("");
      setEstado("");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-8">
      {/* Seção Hero */}
      <div className="hero bg-base-100 rounded-box shadow-xl mb-12 w-full max-w-3xl">
        <div className="hero-content text-center py-12">
          <div className="max-w-md">
            <Building2 className="w-20 h-20 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-base-content">
              Cadastrar Nova Cidade
            </h1>
            <p className="py-4 text-base-content">
              Preencha os dados abaixo para adicionar uma nova cidade ao banco de
              dados SQLite.
            </p>
          </div>
        </div>
      </div>

      {/* Card de Cadastro */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
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
