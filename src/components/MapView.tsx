
import { useState } from 'react';
import { Search, Bus, MapPin, Route, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import RoutePlanner from './RoutePlanner';
import AlertsList from './AlertsList';
import MapPlaceholder from './MapPlaceholder';

const MapView = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const handleSearch = () => {
    if (origin && destination) {
      setShowRoutePlanner(true);
      setShowAlerts(false);
    }
  };
  
  const handleAlertsToggle = () => {
    setShowAlerts(!showAlerts);
    if (!showAlerts) {
      setShowRoutePlanner(false);
    }
  };

  const resetSearch = () => {
    setOrigin('');
    setDestination('');
    setShowRoutePlanner(false);
  };

  return (
    <div className="relative h-[calc(100vh-80px)]">
      <MapPlaceholder />

      <div className="absolute top-4 left-0 right-0 mx-auto px-4 z-10 flex flex-col gap-4 max-w-md">
        <Card className="p-4 w-full shadow-lg">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-fach-purple" />
              <Input
                placeholder="D'où partez-vous?"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="focus-visible:ring-fach-purple"
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-fach-blue" />
              <Input
                placeholder="Où allez-vous?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="focus-visible:ring-fach-blue"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select defaultValue="fastest">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Préférence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fastest">Le plus rapide</SelectItem>
                  <SelectItem value="cheapest">Le moins cher</SelectItem>
                  <SelectItem value="safest">Le plus sûr</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-fach-purple hover:bg-fach-purple-tertiary"
                onClick={handleSearch}
                disabled={!origin || !destination}
              >
                <Search size={18} className="mr-2" /> Rechercher
              </Button>
              <Button 
                variant="outline" 
                onClick={handleAlertsToggle}
                className={showAlerts ? 'bg-muted' : ''}
              >
                <AlertTriangle size={18} className="text-amber-500" />
              </Button>
            </div>
          </div>
        </Card>

        {showRoutePlanner && (
          <Card className="p-4 w-full shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Options de trajet</h3>
              <Button variant="ghost" size="sm" onClick={resetSearch}>
                Fermer
              </Button>
            </div>
            <RoutePlanner 
              origin={origin} 
              destination={destination} 
            />
          </Card>
        )}

        {showAlerts && (
          <Card className="p-4 w-full shadow-lg max-h-[50vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-amber-500 flex items-center gap-1">
                <AlertTriangle size={18} /> Alertes en direct
              </h3>
              <Button variant="ghost" size="sm" onClick={handleAlertsToggle}>
                Fermer
              </Button>
            </div>
            <AlertsList />
          </Card>
        )}
      </div>
    </div>
  );
};

export default MapView;
