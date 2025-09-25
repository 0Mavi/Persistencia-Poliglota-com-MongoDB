import { MapPinCheck, Map, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-8">
      {/* Seção Hero */}
      <div className="hero bg-base-100 rounded-box shadow-xl mb-12 w-full max-w-5xl">
        <div className="hero-content text-center py-16">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-base-content">
              Gerenciador de Cidades e Locais
            </h1>
            <p className="py-6 text-base-content">
              Seja bem-vindo(a) à sua ferramenta de gerenciamento geográfico! 
              Utilize as opções abaixo para interagir com os dados de cidades e locais.
            </p>
          </div>
        </div>
      </div>

      {/* Seção de Cards */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">

        {/* Card 1: Consultar Cidades */}
        <div className="card w-full bg-base-100 shadow-xl transition-transform transform hover:scale-105">
          <figure className="px-10 pt-10">
            <MapPinCheck className="h-16 w-16 text-primary" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-base-content">Consultar Cidades Cadastradas</h2>
            <p className="text-sm text-gray-500">
              Explore as cidades e seus pontos de interesse no mapa.
            </p>
            <div className="card-actions mt-4">
              <button className="btn btn-primary" onClick={() => navigate("/consulta")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Cadastrar Cidade */}
        <div className="card w-full bg-base-100 shadow-xl transition-transform transform hover:scale-105">
          <figure className="px-10 pt-10">
             <Map className="h-16 w-16 text-secondary" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-base-content">Cadastrar Nova Cidade</h2>
            <p className="text-sm text-gray-500">Adicione novas cidades ao banco de dados SQLite.</p>
            <div className="card-actions mt-4">
              <button className="btn btn-secondary" onClick={() => navigate("/cidades")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Cadastrar Local */}
        <div className="card w-full bg-base-100 shadow-xl transition-transform transform hover:scale-105">
          <figure className="px-10 pt-10">
             <MapPin className="h-16 w-16 text-accent" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-base-content">Cadastrar Novo Local</h2>
            <p className="text-sm text-gray-500">Inclua novos pontos de interesse e suas coordenadas.</p>
            <div className="card-actions mt-4">
              <button className="btn btn-accent" onClick={() => navigate("/locais")}>
                Acessar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
