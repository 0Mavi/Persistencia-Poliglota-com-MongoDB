import { MapPinCheck, Map, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-300 p-8">
     
      <div className="hero bg-base-100/70 backdrop-blur-sm rounded-xl shadow-2xl mb-8 w-full max-w-5xl border border-base-content/10"> 
        <div className="hero-content text-center py-8">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-5">
              Gerenciador Geográfico
            </h1>
            
            <p className="text-lg text-base-content/80">
              Seja bem-vindo(a)! Utilize as opções abaixo para interagir com seus dados geográficos.
            </p>
          </div>
        </div>
      </div>

     
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">

 
        <div className="card w-full bg-base-100 shadow-2xl  border-primary transition-all duration-300 hover:shadow-primary/20">
          <div className="card-body items-center text-center p-8">
            <MapPinCheck className="h-20 w-20 text-primary mb-4" /> 
            <h2 className="card-title text-2xl font-bold text-base-content">Consultar Cidades Cadastradas</h2>
            <p className="text-base text-base-content/70 flex-grow">
              Explore as cidades e seus pontos de interesse diretamente no mapa interativo.
            </p>
            <div className="card-actions mt-6 w-full">
              <button className="btn btn-primary btn-block" onClick={() => navigate("/consulta")}>
                Acessar Mapa
              </button>
            </div>
          </div>
        </div>

         <div className="card w-full bg-base-100 shadow-2xl  transition-all duration-300 hover:shadow-accent/20">
          <div className="card-body items-center text-center p-8">
            <MapPin className="h-20 w-20 text-accent mb-4" />
            <h2 className="card-title text-2xl font-bold text-base-content">Cadastrar Novo Local</h2>
            <p className="text-base text-base-content/70 flex-grow">
              Inclua novos pontos de interesse e suas coordenadas geográficas.
            </p>
            <div className="card-actions mt-6 w-full">
              <button className="btn btn-accent btn-block" onClick={() => navigate("/locais")}>
                Adicionar Local
              </button>
            </div>
          </div>
        </div>

        <div className="card w-full bg-base-100 shadow-2xl  transition-all duration-300 hover:shadow-secondary/20 ">
          <div className="card-body items-center text-center p-8">
            <Map className="h-20 w-20 text-secondary mb-4" />
            <h2 className="card-title text-2xl font-bold text-base-content">Cadastrar Nova Cidade</h2>
            <p className="text-base text-base-content/70 flex-grow">
              Adicione novas cidades ao seu banco de dados SQLite para gerenciamento.
            </p>
            <div className="card-actions mt-6 w-full">
              <button className="btn btn-secondary btn-block" onClick={() => navigate("/cidades")}>
                Adicionar Cidade
              </button>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}
