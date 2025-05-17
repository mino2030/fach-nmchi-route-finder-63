import React, { useState } from 'react';
import { Bus, Route, Clock, Flag, Share as ShareIcon, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";

interface RouteOption {
  id: string;
  mode: 'bus' | 'tram' | 'smallTaxi' | 'bigTaxi' | 'walk';
  duration: number;
  price: string;
  line?: string;
  departureTime?: string;
  arrivalTime?: string;
  steps: {
    type: 'bus' | 'tram' | 'smallTaxi' | 'bigTaxi' | 'walk';
    description: string;
    duration: number;
    line?: string;
    departureTime?: string;
    arrivalTime?: string;
  }[];
}

interface RoutePlannerProps {
  origin: string;
  destination: string;
}

const RoutePlanner: React.FC<RoutePlannerProps> = ({ origin, destination }) => {
  const [showStationInfo, setShowStationInfo] = useState<boolean>(false);
  const [selectedStation, setSelectedStation] = useState<string>('');
  
  // Calculate current time and format it
  const now = new Date();
  const formatTime = (minutes: number): string => {
    const time = new Date(now.getTime() + minutes * 60000);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Mock data - would come from an API in real app
  const routes: RouteOption[] = [
    {
      id: '1',
      mode: 'bus',
      duration: 26,
      price: '5 DH',
      line: 'B22',
      departureTime: formatTime(0),
      arrivalTime: formatTime(26),
      steps: [
        { 
          type: 'walk', 
          description: 'Marcher vers arrêt Casa Voyageurs', 
          duration: 5,
          departureTime: formatTime(0),
          arrivalTime: formatTime(5)
        },
        { 
          type: 'bus', 
          description: 'Bus B22 → Maarif', 
          duration: 18, 
          line: 'B22',
          departureTime: formatTime(5),
          arrivalTime: formatTime(23)
        },
        { 
          type: 'walk', 
          description: 'Marcher vers destination', 
          duration: 3,
          departureTime: formatTime(23),
          arrivalTime: formatTime(26)
        },
      ],
    },
    {
      id: '2',
      mode: 'tram',
      duration: 31,
      price: '8 DH',
      line: 'T1',
      departureTime: formatTime(0),
      arrivalTime: formatTime(31),
      steps: [
        { 
          type: 'walk', 
          description: 'Marcher vers station Abdelmoumen', 
          duration: 7,
          departureTime: formatTime(0),
          arrivalTime: formatTime(7)
        },
        { 
          type: 'tram', 
          description: 'Tram T1 → Sidi Moumen', 
          duration: 22, 
          line: 'T1',
          departureTime: formatTime(7),
          arrivalTime: formatTime(29)
        },
        { 
          type: 'walk', 
          description: 'Marcher vers destination', 
          duration: 2,
          departureTime: formatTime(29),
          arrivalTime: formatTime(31)
        },
      ],
    },
    {
      id: '3',
      mode: 'smallTaxi',
      duration: 15,
      price: '25-30 DH',
      steps: [
        { type: 'smallTaxi', description: 'Petit Taxi direct', duration: 15 },
      ],
    },
    {
      id: '4',
      mode: 'bigTaxi',
      duration: 20,
      price: '10 DH',
      line: 'Casa-Ain Diab',
      steps: [
        { type: 'walk', description: 'Marcher vers station de Grand Taxi', duration: 5 },
        { type: 'bigTaxi', description: 'Grand Taxi → Ain Diab', duration: 12, line: 'Casa-Ain Diab' },
        { type: 'walk', description: 'Marcher vers destination', duration: 3 },
      ],
    },
  ];

  // Function to share itinerary
  const handleShare = (routeId: string) => {
    // In a real app, this would generate a unique shareable link
    const shareableLink = `${window.location.origin}/itinerary/${routeId}?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: `Itinéraire de ${origin} à ${destination}`,
        text: `Voici un itinéraire de ${origin} à ${destination}`,
        url: shareableLink,
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard(shareableLink);
      });
    } else {
      // Fallback to clipboard
      copyToClipboard(shareableLink);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Lien copié",
        description: "L'itinéraire a été copié dans votre presse-papiers"
      });
    }).catch(() => {
      toast({
        title: "Erreur",
        description: "Impossible de copier l'itinéraire"
      });
    });
  };

  // Function to render appropriate icon
  const getIcon = (type: 'bus' | 'tram' | 'smallTaxi' | 'bigTaxi' | 'walk') => {
    switch (type) {
      case 'bus':
        return <Bus size={16} />;
      case 'tram':
        return <Route size={16} className="text-green-600" />;
      case 'smallTaxi':
        return <Route size={16} className="text-yellow-600" />;
      case 'bigTaxi':
        return <Route size={16} className="text-orange-600" />;
      case 'walk':
        return <Route size={16} />;
      default:
        return <Route size={16} />;
    }
  };

  const getBgColor = (type: 'bus' | 'tram' | 'smallTaxi' | 'bigTaxi' | 'walk') => {
    switch (type) {
      case 'bus':
        return 'bg-blue-100 text-blue-600';
      case 'tram':
        return 'bg-green-100 text-green-600';
      case 'smallTaxi':
        return 'bg-yellow-100 text-yellow-600';
      case 'bigTaxi':
        return 'bg-orange-100 text-orange-600';
      case 'walk':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleStationClick = (stationName: string) => {
    setSelectedStation(stationName);
    setShowStationInfo(true);
  };

  return (
    <div className="space-y-4">
      {routes.map((route) => (
        <div key={route.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${getBgColor(route.mode)}`}>
                {getIcon(route.mode)}
              </div>
              <div>
                <span className="font-medium">
                  {route.mode === 'bus' && `Bus ${route.line}`}
                  {route.mode === 'tram' && `Tram ${route.line}`}
                  {route.mode === 'smallTaxi' && 'Petit Taxi'}
                  {route.mode === 'bigTaxi' && `Grand Taxi ${route.line}`}
                </span>
                <div className="text-xs text-muted-foreground">
                  {route.steps.length} étape{route.steps.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">{route.duration} min</div>
              <div className="text-xs text-muted-foreground">{route.price}</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2 mt-1">
            <div className="flex gap-1 items-center text-sm font-medium text-fach-purple">
              <Clock size={16} className="text-fach-purple" />
              <span>Départ: {route.departureTime}</span>
            </div>
            <div className="flex gap-1 items-center text-sm font-medium text-fach-blue">
              <Calendar size={16} className="text-fach-blue" />
              <span>Arrivée: {route.arrivalTime}</span>
            </div>
          </div>
          
          <div className="space-y-2 mt-3 pl-2 border-l-2 border-dashed border-muted">
            {route.steps.map((step, i) => (
              <div key={i} className="flex gap-2 items-start text-sm">
                <div className={`p-1 rounded-full ${getBgColor(step.type)} shrink-0`}>
                  {getIcon(step.type)}
                </div>
                <div className="flex-1">
                  <div 
                    className={`${(step.type === 'tram' || step.type === 'bus') ? 'cursor-pointer hover:text-fach-purple' : ''}`}
                    onClick={() => {
                      if (step.type === 'tram' || step.type === 'bus') {
                        const stationName = step.description.split(' → ')[0].replace('Tram T1', 'Station').replace('Bus B22', 'Arrêt');
                        handleStationClick(stationName);
                      }
                    }}
                  >
                    {step.description}
                    {(step.type === 'tram' || step.type === 'bus') && (
                      <span className="text-xs ml-1 text-fach-purple">(voir horaires)</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {step.duration} min
                    </div>
                    {step.line && <span className="bg-muted px-1.5 rounded-full">{step.line}</span>}
                    {step.departureTime && (
                      <span className="text-fach-purple">
                        {step.departureTime}
                      </span>
                    )}
                    {step.arrivalTime && (
                      <span className="text-fach-blue">
                        → {step.arrivalTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <Button size="sm" className="flex-1 bg-fach-blue hover:bg-fach-blue-ocean">
              Démarrer
            </Button>
            <Button size="sm" variant="outline">
              Détails
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="hover:bg-muted"
              onClick={() => handleShare(route.id)}
            >
              <ShareIcon size={16} className="text-fach-purple" />
            </Button>
          </div>
        </div>
      ))}
      
      {showStationInfo && (
        <StationScheduleCard 
          station={selectedStation} 
          onClose={() => setShowStationInfo(false)} 
        />
      )}
    </div>
  );
};

// New component for station information
interface StationScheduleCardProps {
  station: string;
  onClose: () => void;
}

const StationScheduleCard: React.FC<StationScheduleCardProps> = ({ station, onClose }) => {
  // Mock data for upcoming trains/trams
  const upcomingSchedule = [
    { id: 1, type: 'tram', line: 'T1', destination: 'Sidi Moumen', time: '14:25' },
    { id: 2, type: 'tram', line: 'T1', destination: 'Facultés', time: '14:32' },
    { id: 3, type: 'tram', line: 'T1', destination: 'Sidi Moumen', time: '14:40' }
  ];

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-br from-white to-fach-blue-soft/10 dark:from-gray-800 dark:to-fach-blue/20 shadow-lg animate-scale-in">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg text-transparent bg-clip-text bg-gradient-to-r from-fach-purple to-fach-blue">
          {station}
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground">
          Fermer
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Prochains passages:</p>
        
        {upcomingSchedule.map(schedule => (
          <div 
            key={schedule.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-fach-blue-soft/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${schedule.type === 'tram' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                {schedule.type === 'tram' ? <Route size={16} /> : <Bus size={16} />}
              </div>
              <div>
                <div className="font-medium">{schedule.line} → {schedule.destination}</div>
                <div className="text-xs text-muted-foreground">
                  Direction {schedule.destination}
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold text-fach-blue">{schedule.time}</div>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 border-fach-purple/30 text-fach-purple hover:bg-fach-purple-light/20"
        >
          Voir tous les horaires
        </Button>
      </div>
    </div>
  );
};

export default RoutePlanner;
