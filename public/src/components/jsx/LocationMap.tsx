import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Definir icono personalizado
const customIcon = L.icon({
  iconUrl: './media/marker.svg', // URL del icono
  iconSize: [38, 38], // Tamaño del icono
  iconAnchor: [19, 38], // Punto de anclaje del icono (normalmente su base)
  popupAnchor: [0, -38], // Punto donde el popup aparece en relación al icono
});

// Definimos la interfaz para nuestras ubicaciones
interface Location {
  id: number;
  name: string;
  coordinates: [number, number];
  image: string;
  description: string;
}

// Definimos nuestras ubicaciones
const locations: Location[] = [
  {
    id: 1,
    name: 'Plaza 25 de Mayo asdasdasdasdasdasdasd',
    coordinates: [-27.451388888889, -58.986666666667],
    image: 'https://github.com/AxelMaidana/Colegio-de-Enfermeria-del-Chaco/blob/master/public/src/media/mapa.png?raw=true',
    description: 'La plaza más grande de la ciudad de Resistencia, con una vista panorámica sobre el centro de la ciudad.',
  },
  {
    id: 2,
    name: 'Gala Hotel & Convenciones',
    coordinates: [-27.4471334, -59.0225217],
    image: 'https://github.com/AxelMaidana/Colegio-de-Enfermeria-del-Chaco/blob/master/public/src/media/mapa.png?raw=true',
    description: 'El hotel más grande de la ciudad de Resistencia, con una gran variedad de servicios y actividades.',
  },
  {
    id: 3,
    name: 'Le Utthe asdasdsad asdasdasdsa',
    coordinates: [-27.4505352, -58.9904593],
    image: 'https://github.com/AxelMaidana/Colegio-de-Enfermeria-del-Chaco/blob/master/public/src/media/mapa.png?raw=true',
    description: 'La tienda de ropa mas conocida en la ciudad de Resistencia, con una gran variedad de ropa y accesorios.',
  },
];

// Componente para actualizar la vista del mapa
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 14);
  }, [center, map]);
  return null;
}

export default function LocationMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);

  return (
    // Sección principal con fondo y capa de opacidad
    <section 
      className="relative bg-cover bg-center pt-12 pb-28" 
      style={{ backgroundImage: "url('https://github.com/AxelMaidana/Colegio-de-Enfermeria-del-Chaco/blob/master/public/src/media/mapa.png?raw=true')" }}
    >
      {/* Capa de opacidad */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Título de la ubicación */}
      <div className="relative mx-0 w-max z-10">
        <h3 className="text-2xl font-bold mb-6 bg-customGreen text-white px-8 py-2.5 rounded-r-full text-center">
          Nuestra Ubicación
        </h3>
      </div>

      {/* Contenido principal */}
      <div className="relative mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Primera columna: Lista de ubicaciones */}
          <div className="flex flex-col space-y-8 flex-shrink-0 w-full md:w-1/4 order-2 md:order-1">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className="flex items-center space-x-2 w-full text-center p-2 rounded-lg text-white/80 hover:text-white hover:scale-110 transition-all duration-300 ease-in-out pr-16 md:pr-6 justify-end md:justify-end"
              >
                <div className="max-w-52 text-end md:text-end">
                  <h4 className="md:text-lg text-base font-semibold">{location.name}</h4>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden cursor-pointer">
                  <img 
                    src={location.image} 
                    alt={location.name} 
                    className="w-full h-full object-cover rounded-full border-2 border-customBlue hover:border-[3px] hover:border-customGreen" 
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Segunda columna: Mapa interactivo */}
          <div className="flex-grow w-full md:w-2/3 order-1">
            <div className="relative bg-customBlue p-1 rounded-lg shadow-md">
              <MapContainer center={selectedLocation.coordinates} zoom={14} style={{ height: '400px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={selectedLocation.coordinates} />
                <ChangeView center={selectedLocation.coordinates} />
              </MapContainer>
            </div>
          </div>

          {/* Tercera columna: Descripción de la ubicación */}
          <div className="flex-shrink-0 w-full md:w-1/4 order-3 md:order-2">
            <div className="p-4 rounded-lg text-white text-center md:text-start">
              <h4 className="text-2xl font-semibold">{selectedLocation.name}</h4>
              <p className="text-white opacity-90 mt-2 break-words">
                {selectedLocation.description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
