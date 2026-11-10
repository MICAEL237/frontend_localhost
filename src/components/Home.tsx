import { useEffect, useState, useRef } from "react";
import { SignApi } from "../services/Home.service";
import { Map, addMarker } from "../providers/leafstreat.map";
import { Button } from "../components/ui/button";
import L from "leaflet";

type TypeSign = {
  description: string;
  latitude: number;
  longitude: number;
};

const Home = () => {
  const [sign, setSign] = useState<TypeSign[]>();
  const mapRef = useRef<L.Map | null>(null);

  // 1. Récupération des données API
  useEffect(() => {
    const data = async () => {
      const signalemments = await SignApi();
      setSign(signalemments);
    };
    data();
  }, []);

  // 2. Initialisation de la carte et des marqueurs
  useEffect(() => {
    // Si pas de données ou si la carte est déjà initialisée, on ne fait rien
    if (!sign || sign.length === 0 || mapRef.current) return;

    // Initialise la carte sur le premier signalement
    const firstSign = sign[0];
    mapRef.current = Map(firstSign.latitude, firstSign.longitude);

    // Ajoute un marqueur pour CHAQUE signalement
    for (const s of sign) {
      addMarker(mapRef.current, s.latitude, s.longitude, s.description);
    }

    const bounds = L.latLngBounds(sign.map((s) => [s.latitude, s.longitude]));

    mapRef.current.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 15,
    });

    // Nettoyage au démontage du composant
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [sign]);

  if (!sign) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span className="loading loading-ball"></span>
        <span className="loading loading-ball"></span>
        <span className="loading loading-ball"></span>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mt-32 mb-8">
        <div className="flex items-center justify-center gap-1 bg-[#f0fdf4] h-8 w-96 rounded-lg border-2 border-[#bbf7d0]">
          <div className="w-4 h-4 bg-[#116534] rounded-full"></div>
          <h3 className="text-[11px] font-bold text-[#000000]">
            PLATEFORME CITOYENNE OUVERTE À TOUS • ALLO MAIRIE{" "}
          </h3>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="font-extrabold text-4xl leading-tight">
            <span className="text-[#0f172a]">Bienvenue sur</span>{" "}
            <span className="text-[#15803d]">Allô Mairie</span>{" "}
          </h1>
          <p className="font-normal text-[16px] leading-8 text-[#475569] text-center w-136">
            Consultez en temps réel les signalements urbains de votre ville ou
            participez activement à l'amélioration collective de votre cadre de
            vie quotidien.
          </p>
        </div>

        <div className="flex items-center gap-12 mt-8">
          <Button className="cursor-pointer w-52 text-sm bg-[#15803d] text-white hover:bg-[#166534] hover:scale-105 transition-all duration-200">
            Faire un signalement{" "}
          </Button>{" "}
          <Button
            variant="outline"
            
            className="cursor-pointer border-[#e2e8f0]
            w-52
            bg-white text-[#1e2936] hover:bg-green-50 hover:scale-105
            transition-all duration-200 text-sm font-semibold"
          >
            Comment ça marche{" "}
          </Button>{" "}
        </div>
      </div>
      <div
        id="map"
        className="w-250 h-250 flex items-center justify-center shadow-sm max-md:w-full max-md:h-full"
      ></div>
    </div>
  );
};

export default Home;
