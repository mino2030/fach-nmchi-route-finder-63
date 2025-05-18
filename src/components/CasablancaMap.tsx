
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function CasablancaMap() {
  return (
    <div className="md:w-1/2 flex justify-center animate-float">
      <div className="w-full max-w-md relative">
        <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white bg-white">
          <div className="bg-fach-purple text-white text-center py-3 font-semibold">
            Carte de Casablanca
          </div>
          <div className="aspect-square relative">
            <MapContainer
              center={[33.5731, -7.5898]} // Coordinates of Casablanca
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[33.5731, -7.5898]}>
                <Popup>
                  Casablanca, Maroc
                </Popup>
              </Marker>
            </MapContainer>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-fach-purple-tertiary/80 bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm">
                CASABLANCA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
