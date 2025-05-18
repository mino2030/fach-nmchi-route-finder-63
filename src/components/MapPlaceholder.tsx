
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Reset the default icon settings
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapPlaceholder = () => {
  const casablancaCenter = [33.5731, -7.5898]; // Coordinates for Casablanca
  const mainLocations = [
    { position: [33.5933, -7.6164], name: "Centre Ville", color: "purple" },
    { position: [33.6067, -7.6315], name: "Mosquée Hassan II", color: "green" },
    { position: [33.5942, -7.6682], name: "La Corniche", color: "amber" },
  ];

  const createCustomIcon = (color: string) => {
    return new L.Icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      className: `text-${color}-600`,
    });
  };

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={casablancaCenter as [number, number]} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Main Casablanca marker */}
        <Marker position={casablancaCenter as [number, number]}>
          <Popup>
            <div className="font-semibold">Casablanca, Maroc</div>
            <div className="text-sm text-muted-foreground">La ville blanche</div>
          </Popup>
        </Marker>
        
        {/* Additional landmarks */}
        {mainLocations.map((location, index) => (
          <Marker 
            key={index} 
            position={location.position as [number, number]}
          >
            <Popup>
              <div className="font-semibold">{location.name}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Overlay with Casablanca text */}
      <div className="absolute top-4 left-4 bg-white/80 px-3 py-2 rounded-lg shadow-md z-20">
        <div className="text-sm font-semibold">Casablanca, Maroc</div>
      </div>
      
      {/* Compass */}
      <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-white/80 shadow-md flex items-center justify-center z-20">
        <div className="relative h-12 w-12">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-1 bg-red-500"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-6 w-1 bg-gray-500"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-6 bg-gray-500"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-6 bg-gray-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs font-bold">N</div>
        </div>
      </div>
      
      {/* Casablanca text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <span className="text-3xl font-bold text-fach-purple-tertiary/80 bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm">
          CASABLANCA
        </span>
      </div>
    </div>
  );
};

export default MapPlaceholder;
