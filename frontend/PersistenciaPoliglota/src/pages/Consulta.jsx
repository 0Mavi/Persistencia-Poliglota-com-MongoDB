import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { ArrowLeft, Map } from "lucide-react"; 
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom"; 

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";


function FixMap() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}


function ZoomToCity({ locais }) {
  const map = useMap();

  useEffect(() => {
    if (locais.length > 0) {
      const bounds = L.latLngBounds(
        locais.map((l) => [
          l.coordenadas.latitude,
          l.coordenadas.longitude,
        ])
      );
      map.fitBounds(bounds, { padding: [50, 50] }); 
    }
  }, [locais, map]);

  return null;
}


const customMarkerIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%235A67D8' stroke='none'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z'/%3E%3C/svg%3E`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function Consulta() {
  const [locais, setLocais] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
   
    axios
      .get(`${API}/cidades`)
      .then((res) => setCidades(res.data))
      .catch(console.error);

   
    axios
      .get(`${API}/locais`)
      .then((res) => setLocais(res.data))
      .catch(console.error);
  }, []);


  const locaisFiltrados = cidadeSelecionada
    ? locais.filter((l) => l.cidade === cidadeSelecionada)
    : locais;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-300 p-8">
 
      <div className="flex items-center w-full max-w-5xl mb-8">
        <button
          className="btn btn-ghost btn-circle text-base-content/70"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Locais Cadastrados
        </h1>
      </div>

   
      <div className="w-full max-w-5xl">
     
        <div className="mb-8">
          <label className="label">
            <span className="label-text text-base-content font-semibold text-lg mb-6">
              Filtrar por cidade:
            </span>
          </label>
          <select
            className="select select-bordered select-lg w-full bg-base-100 shadow-md "
            value={cidadeSelecionada}
            onChange={(e) => setCidadeSelecionada(e.target.value)}
          >
            <option value="">Todas as cidades</option>
            {cidades.map((c) => (
              <option key={c.id} value={c.nome}>
                {c.nome} - {c.estado}
              </option>
            ))}
          </select>
        </div>

      
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-2xl border-t-4 ">
          <MapContainer
            center={[-7.11532, -34.861]}
            zoom={13}
            className="w-full h-full"
          >
            <FixMap />
            <ZoomToCity locais={locaisFiltrados} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locaisFiltrados.map((l) => (
              <Marker
                key={l._id}
                position={[
                  l.coordenadas.latitude,
                  l.coordenadas.longitude,
                ]}
                icon={customMarkerIcon} 
              >
                <Popup>
                  <strong>{l.nome_local}</strong>
                  <br />
                  {l.descricao || ""}
                  <br />
                  <em>{l.cidade}</em>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
