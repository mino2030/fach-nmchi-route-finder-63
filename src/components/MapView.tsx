
import React, { useState, useEffect } from 'react';
import RoutePlanner from './RoutePlanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation, Clock, Bus, Train, Car, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ChatbotView from './ChatbotView';

const MapView = () => {
  const [origin, setOrigin] = useState('Casa Voyageurs');
  const [destination, setDestination] = useState('Maarif');
  const [showRoutePlan, setShowRoutePlan] = useState(true);
  const [activeTab, setActiveTab] = useState('routes');

  const handleSearch = () => {
    setShowRoutePlan(true);
  };

  useEffect(() => {
    // Automatically show route planner when the component mounts
    setShowRoutePlan(true);
  }, []);

  return (
    <div className="h-[calc(100vh-10rem)] pb-20">
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full max-w-md mx-auto mb-4 grid grid-cols-3">
          <TabsTrigger value="routes" className="flex items-center gap-1">
            <Navigation size={16} />
            <span>Itinéraires</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1">
            <Clock size={16} />
            <span>Horaires</span>
          </TabsTrigger>
          <TabsTrigger value="agent" className="flex items-center gap-1">
            <MessageSquare size={16} />
            <span>Agent IA</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="routes" className="h-full">
          <div className="px-4">
            <div className="bg-white p-4 rounded-lg shadow-md max-w-lg mx-auto mb-4">
              <h3 className="font-medium mb-3">Rechercher un itinéraire</h3>
              <div className="flex flex-col space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Départ</label>
                  <Input 
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Point de départ"
                    className="bg-white"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground">Destination</label>
                  <Input 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Point d'arrivée"
                    className="bg-white"
                  />
                </div>
                
                <Button 
                  onClick={handleSearch}
                  className="bg-fach-purple hover:bg-fach-purple-tertiary"
                >
                  Trouver mon itinéraire
                </Button>
              </div>
            </div>

            {showRoutePlan && (
              <RoutePlanner origin={origin} destination={destination} />
            )}
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

        <TabsContent value="agent" className="h-full">
          <ChatbotView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapView;
