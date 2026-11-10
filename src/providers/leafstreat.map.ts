import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const Map = (latitude: number, longitude: number) => {

    const map = L.map("map", {
        center: [latitude, longitude],
        zoom: 13
    });

    // Chargement du fond cartographique
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    return map;
};

export const addMarker = (map: L.Map, latitude: number, longitude: number, description?: string) => {
  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(description!); // Optionnel : affiche la description au clic
};