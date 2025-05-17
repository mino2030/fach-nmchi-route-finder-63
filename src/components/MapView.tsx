
import { useState } from 'react';
import { Search, Bus, MapPin, Route, AlertTriangle, Share } from 'lucide-react';
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
import { toast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import RoutePlanner from './RoutePlanner';
import AlertsList from './AlertsList';
import MapPlaceholder from './MapPlaceholder';
import TransitMap from './TransitMap';

const MapView = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [transitMapType, setTransitMapType] = useState<'all' | 'tram' | 'train'>('all');

  const handleSearch = () => {
    if (origin && destination) {
      setShowRoutePlanner(true);
      setShowAlerts(false);
      setActiveTab('map');
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

  const handleShareRoute = () => {
    if (!origin || !destination) return;
    
    // Create a shareable link
    const shareableLink = `${window.location.origin}/route?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    
    // Try to use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: `Itinéraire de ${origin} à ${destination}`,
        text: `Consultez cet itinéraire de ${origin} à ${destination}`,
        url: shareableLink,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareableLink).then(() => {
          toast({
            title: "Lien copié",
            description: "L'itinéraire a été copié dans votre presse-papiers"
          });
        });
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareableLink).then(() => {
        toast({
          title: "Lien copié",
          description: "L'itinéraire a été copié dans votre presse-papiers"
        });
      });
    }
  };

  return (
    <div className="relative h-[calc(100vh-80px)]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <div className="absolute top-4 left-0 right-0 mx-auto px-4 z-10 flex flex-col gap-4 max-w-md">
          <Card className="p-4 w-full shadow-lg">
            <TabsList className="w-full mb-3 bg-muted/80">
              <TabsTrigger value="map" className="flex-1">Carte</TabsTrigger>
              <TabsTrigger value="transit" className="flex-1">Transit</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-0">
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
                  {origin && destination && (
                    <Button 
                      variant="outline" 
                      onClick={handleShareRoute}
                      title="Partager cet itinéraire"
                    >
                      <Share size={18} className="text-fach-purple" />
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transit" className="mt-0">
              <div className="flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">
                  Consultez les horaires des transports en commun
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    variant={transitMapType === 'all' ? 'default' : 'outline'}
                    className={transitMapType === 'all' ? 'bg-fach-purple hover:bg-fach-purple-tertiary' : ''}
                    size="sm"
                    onClick={() => setTransitMapType('all')}
                  >
                    Tous
                  </Button>
                  <Button 
                    variant={transitMapType === 'tram' ? 'default' : 'outline'}
                    className={transitMapType === 'tram' ? 'bg-green-600 hover:bg-green-700' : ''}
                    size="sm"
                    onClick={() => setTransitMapType('tram')}
                  >
                    <Route size={16} className="mr-1" /> Tram
                  </Button>
                  <Button 
                    variant={transitMapType === 'train' ? 'default' : 'outline'} 
                    className={transitMapType === 'train' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    size="sm"
                    onClick={() => setTransitMapType('train')}
                  >
                    <Bus size={16} className="mr-1" /> Train
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Card>

          {showRoutePlanner && activeTab === 'map' && (
            <Card className="p-4 w-full shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Options de trajet</h3>
                <div className="flex gap-2 items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleShareRoute}
                    title="Partager cet itinéraire"
                    className="h-8 w-8"
                  >
                    <Share size={16} className="text-fach-purple" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={resetSearch}>
                    Fermer
                  </Button>
                </div>
              </div>
              <RoutePlanner 
                origin={origin} 
                destination={destination} 
              />
            </Card>
          )}

          {showAlerts && activeTab === 'map' && (
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

          {activeTab === 'transit' && (
            <Card className="p-4 w-full shadow-lg">
              <TransitMap mapType={transitMapType} />
            </Card>
          )}
        </div>

        <TabsContent value="map" className="p-0 m-0 h-full">
          <MapPlaceholder />
        </TabsContent>
        
        <TabsContent value="transit" className="p-0 m-0 h-full">
          <div className="bg-gradient-to-br from-fach-purple-light/10 to-fach-blue-soft/10 h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Carte du réseau de transports</p>
              <p className="text-sm">Cliquez sur les stations pour plus d'informations</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapView;
