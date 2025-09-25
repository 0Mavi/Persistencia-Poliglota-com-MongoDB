import { MapPinCheck } from "lucide-react";
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
            <MapPinCheck className="h-16 w-16 text-red-500" />
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21v-8a5 5 0 00-5-5H10a5 5 0 00-5 5v8m14-8a5 5 0 015 5v8a5 5 0 01-5 5" />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.25c-3.15 0-5.75-2.6-5.75-5.75s2.6-5.75 5.75-5.75 5.75 2.6 5.75 5.75-2.6 5.75-5.75 5.75z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
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
