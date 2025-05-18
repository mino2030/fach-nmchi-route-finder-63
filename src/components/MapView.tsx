
import React from 'react';
import MapPlaceholder from './MapPlaceholder';
import RoutePlanner from './RoutePlanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, LocateFixed, Navigation, Clock, Bus, Train, Car } from 'lucide-react';

const MapView = () => {
  return (
    <div className="h-[calc(100vh-10rem)] pb-20">
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-4 grid grid-cols-3">
          <TabsTrigger value="map" className="flex items-center gap-1">
            <Map size={16} />
            <span>Carte</span>
          </TabsTrigger>
          <TabsTrigger value="routes" className="flex items-center gap-1">
            <Navigation size={16} />
            <span>Itinéraires</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1">
            <Clock size={16} />
            <span>Horaires</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="h-full">
          <MapPlaceholder />
        </TabsContent>
        
        <TabsContent value="routes" className="h-full">
          <RoutePlanner />
          <div className="bg-white p-4 rounded-lg shadow-md mt-4 max-w-md mx-auto">
            <h3 className="font-medium mb-3">Transport disponible</h3>
            <div className="flex flex-wrap gap-3">
              <div className="transport-option-card">
                <Bus size={20} />
                <span>Bus</span>
              </div>
              <div className="transport-option-card">
                <Train size={20} />
                <span>Train</span>
              </div>
              <div className="transport-option-card">
                <Car size={20} />
                <span>Taxi</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="h-full">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Horaires des transports</h2>
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <Bus className="text-fach-purple" size={18} />
                  <h3 className="font-medium">Bus - Ligne 1</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Premier départ: 06:00 | Dernier départ: 22:30</p>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <Train className="text-fach-blue" size={18} />
                  <h3 className="font-medium">Train - Casa Voyageurs</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Premier départ: 05:30 | Dernier départ: 23:00</p>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <Car className="text-fach-purple-tertiary" size={18} />
                  <h3 className="font-medium">Taxi - Service 24/7</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Disponible à tout moment</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapView;
