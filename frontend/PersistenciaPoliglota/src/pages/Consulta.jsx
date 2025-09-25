import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Map } from "lucide-react";
import "leaflet/dist/leaflet.css"; 


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

export default function Consulta() {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/locais`)
      .then((res) => setLocais(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-8">
      {/* Hero */}
      <div className="hero bg-base-100 rounded-box shadow-xl mb-12 w-full max-w-5xl">
        <div className="hero-content text-center py-12">
          <div className="max-w-md">
            <Map className="w-20 h-20 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-base-content">
              Locais Cadastrados
            </h1>
            <p className="py-4 text-base-content">
              Explore os pontos de interesse cadastrados no MongoDB diretamente
              no mapa interativo abaixo.
            </p>
          </div>
        </div>
      </div>

      {/* Card com o mapa */}
      <div className="card w-full max-w-5xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-base-content mb-4">Mapa Interativo</h2>
          <div className="w-full h-[500px] rounded-lg overflow-hidden border border-base-300">
            <MapContainer
              center={[-7.11532, -34.861]}
              zoom={13}
              className="w-full h-full" 
            >
              <FixMap /> 
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {locais.map((l) => (
                <Marker
                  key={l._id}
                  position={[l.coordenadas.latitude, l.coordenadas.longitude]}
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
    </div>
  );
}
