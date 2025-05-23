
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Route, Clock, Bus } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  type: 'tram' | 'train';
  lines: string[];
  position: { x: number; y: number };
}

interface TransitMapProps {
  mapType?: 'tram' | 'train' | 'all';
}

const TransitMap: React.FC<TransitMapProps> = ({ mapType = 'all' }) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [activeView, setActiveView] = useState<'map' | 'bus' | 'tram' | 'taxi'>('map');
  
  // Mock data for stations
  const stations: Station[] = [
    { 
      id: '1', 
      name: 'Casa Voyageurs', 
      type: 'train', 
      lines: ['Train ONCF'], 
      position: { x: 35, y: 40 } 
    },
    { 
      id: '2', 
      name: 'Abdelmoumen', 
      type: 'tram', 
      lines: ['T1'], 
      position: { x: 25, y: 60 } 
    },
    { 
      id: '3', 
      name: 'Sidi Moumen', 
      type: 'tram', 
      lines: ['T1'], 
      position: { x: 75, y: 30 } 
    },
    { 
      id: '4', 
      name: 'Facultés', 
      type: 'tram', 
      lines: ['T1'], 
      position: { x: 60, y: 70 } 
    },
    { 
      id: '5', 
      name: 'Casa Port', 
      type: 'train', 
      lines: ['Train ONCF'], 
      position: { x: 20, y: 20 } 
    },
  ];

  // Filter stations based on the selected map type
  const filteredStations = mapType === 'all' 
    ? stations 
    : stations.filter(station => station.type === mapType);

  return (
    <div className="relative bg-white dark:bg-card rounded-xl overflow-hidden shadow-md h-[400px] w-full">
      <div className="w-full bg-muted/80 mb-2 flex">
        <button 
          onClick={() => setActiveView('map')} 
          className={`flex-1 py-2 px-4 text-sm font-medium ${activeView === 'map' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
        >
          Map
        </button>
        <button 
          onClick={() => setActiveView('bus')} 
          className={`flex-1 py-2 px-4 text-sm font-medium ${activeView === 'bus' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
        >
          Bus
        </button>
        <button 
          onClick={() => setActiveView('tram')} 
          className={`flex-1 py-2 px-4 text-sm font-medium ${activeView === 'tram' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
        >
          Tram
        </button>
        <button 
          onClick={() => setActiveView('taxi')} 
          className={`flex-1 py-2 px-4 text-sm font-medium ${activeView === 'taxi' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
        >
          Taxi
        </button>
      </div>

      {activeView === 'map' && (
        <div className="absolute inset-0 bg-gradient-to-br from-fach-blue-soft/5 to-fach-purple-light/5 bg-opacity-30">
          {/* Transit Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Tram Line */}
            <path 
              d="M20,20 Q40,50 75,30" 
              stroke="#4CAF50" 
              strokeWidth="1.5" 
              fill="none" 
              strokeDasharray="2,1" 
            />
            {/* Train Line */}
            <path 
              d="M20,20 Q30,40 35,40" 
              stroke="#2196F3" 
              strokeWidth="1.5" 
              fill="none" 
              strokeDasharray="2,1" 
            />
          </svg>

          {/* Stations */}
          {filteredStations.map(station => (
            <button
              key={station.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full 
              ${station.type === 'tram' ? 'bg-green-500' : 'bg-blue-500'} 
              hover:scale-150 transition-all duration-200 cursor-pointer z-10
              ${selectedStation?.id === station.id ? 'ring-4 ring-offset-2 ring-fach-purple/30' : ''}`}
              style={{ 
                left: `${station.position.x}%`, 
                top: `${station.position.y}%` 
              }}
              onClick={() => setSelectedStation(station)}
              title={station.name}
            />
          ))}
        </div>
      )}

      {activeView === 'bus' && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Bus size={20} className="text-blue-500" /> Bus Routes
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map(idx => (
              <div key={idx} className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <div className="font-medium">Bus B{idx * 10}</div>
                  <div className="text-sm text-muted-foreground">
                    {idx === 1 ? 'Casa Voyageurs → Maarif' : 
                     idx === 2 ? 'Aïn Diab → Casa Port' : 'Sidi Moumen → Derb Sultan'}
                  </div>
                </div>
                <div className="text-blue-500 font-semibold">10 min</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'tram' && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Route size={20} className="text-green-500" /> Tram Routes
          </h3>
          <div className="space-y-3">
            {[1, 2].map(idx => (
              <div key={idx} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <div className="font-medium">Tram T{idx}</div>
                  <div className="text-sm text-muted-foreground">
                    {idx === 1 ? 'Facultés → Sidi Moumen' : 'Ain Diab → Sidi Bernoussi'}
                  </div>
                </div>
                <div className="text-green-500 font-semibold">{idx * 5} min</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'taxi' && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Route size={20} className="text-yellow-500" /> Taxi Services
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div>
                <div className="font-medium">Petit Taxi</div>
                <div className="text-sm text-muted-foreground">
                  Service direct
                </div>
              </div>
              <div className="text-yellow-500 font-semibold">Disponible</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div>
                <div className="font-medium">Grand Taxi</div>
                <div className="text-sm text-muted-foreground">
                  Casa-Mohammedia
                </div>
              </div>
              <div className="text-orange-500 font-semibold">5 min</div>
            </div>
          </div>
        </div>
      )}

      {/* Station Info Card */}
      {selectedStation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-card rounded-lg p-4 shadow-lg animate-slide-in z-20 bg-gradient-to-br from-white to-fach-blue-soft/10 dark:from-gray-800 dark:to-fach-blue/20">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${selectedStation.type === 'tram' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                <Route size={16} />
              </div>
              <h3 className="font-semibold text-lg">{selectedStation.name}</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedStation(null)}
              className="text-muted-foreground"
            >
              Fermer
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Prochains départs:
            </p>
            
            {/* Upcoming departures - Mock data */}
            {[1, 2, 3].map(idx => {
              // Generate mock times
              const now = new Date();
              const departureTime = new Date(now.getTime() + (10 * idx + Math.random() * 5) * 60000);
              const formattedTime = departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div key={idx} className="flex justify-between items-center p-1 rounded hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-fach-purple" />
                    <div className="font-medium">
                      {selectedStation.lines[0]} 
                      <span className="text-sm text-muted-foreground ml-2">
                        → {selectedStation.type === 'tram' ? 'Facultés' : 'Marrakech'}
                      </span>
                    </div>
                  </div>
                  <div className="text-fach-blue font-semibold">{formattedTime}</div>
                </div>
              );
            })}
            
            <Button 
              size="sm" 
              className="w-full mt-2 bg-fach-purple hover:bg-fach-purple-tertiary"
            >
              Voir tous les horaires
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransitMap;
