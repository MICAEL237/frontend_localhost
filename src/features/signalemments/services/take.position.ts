
export interface positiongps {
  latitude: number;
  longitude: number;
}

const Position = (): Promise<positiongps> => {
  return new Promise((resolve, reject) => {
    // 1. Vérifier si la géolocalisation est disponible
    if (!("geolocation" in navigator)) {
      reject(new Error("La géolocalisation n'est pas supportée par ce navigateur."));
      return;
    }

    // 2. Appeler l'API native du navigateur
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // En cas de succès, on "résout" la promesse avec l'objet attendu
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        // En cas d'erreur, on "rejette" la promesse
        console.error(error.code, error.message);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 60 * 60 * 24 * 1000,
      }
    );
  });
};

export default Position;