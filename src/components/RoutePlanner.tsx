import React from 'react';
import { Bus, Route, Clock, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RouteOption {
  id: string;
  mode: 'bus' | 'tram' | 'walk' | 'taxi';
  duration: number;
  price: string;
  line?: string;
  steps: {
    type: 'bus' | 'tram' | 'walk' | 'taxi';
    description: string;
    duration: number;
    line?: string;
  }[];
}

interface RoutePlannerProps {
  origin: string;
  destination: string;
}

const RoutePlanner: React.FC<RoutePlannerProps> = ({ origin, destination }) => {
  // Mock data - would come from an API in real app
  const routes: RouteOption[] = [
    {
      id: '1',
      mode: 'bus',
      duration: 26,
      price: '7 DH',
      line: 'B22',
      steps: [
        { type: 'walk', description: 'Marcher vers arrêt Casa Voyageurs', duration: 5 },
        { type: 'bus', description: 'Bus B22 → Maarif', duration: 18, line: 'B22' },
        { type: 'walk', description: 'Marcher vers destination', duration: 3 },
      ],
    },
    {
      id: '2',
      mode: 'tram',
      duration: 31,
      price: '8 DH',
      line: 'T1',
      steps: [
        { type: 'walk', description: 'Marcher vers station Abdelmoumen', duration: 7 },
        { type: 'tram', description: 'Tram T1 → Sidi Moumen', duration: 22, line: 'T1' },
        { type: 'walk', description: 'Marcher vers destination', duration: 2 },
      ],
    },
    {
      id: '3',
      mode: 'taxi',
      duration: 15,
      price: '25-30 DH',
      steps: [
        { type: 'taxi', description: 'Taxi direct', duration: 15 },
      ],
    },
  ];

  // Function to render appropriate icon
  const getIcon = (type: 'bus' | 'tram' | 'walk' | 'taxi') => {
    switch (type) {
      case 'bus':
        return <Bus size={16} />;
      case 'tram':
        return <Route size={16} className="text-green-600" />;
      case 'taxi':
        return <Route size={16} />;
      case 'walk':
        return <Route size={16} />;
      default:
        return <Route size={16} />;
    }
  };

  const getBgColor = (type: 'bus' | 'tram' | 'walk' | 'taxi') => {
    switch (type) {
      case 'bus':
        return 'bg-blue-100 text-blue-600';
      case 'tram':
        return 'bg-green-100 text-green-600';
      case 'taxi':
        return 'bg-yellow-100 text-yellow-600';
      case 'walk':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
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
                  {route.mode === 'taxi' && 'Taxi'}
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
          
          <div className="space-y-2 mt-3 pl-2 border-l-2 border-dashed border-muted">
            {route.steps.map((step, i) => (
              <div key={i} className="flex gap-2 items-start text-sm">
                <div className={`p-1 rounded-full ${getBgColor(step.type)} shrink-0`}>
                  {getIcon(step.type)}
                </div>
                <div className="flex-1">
                  <div>{step.description}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} />
                    {step.duration} min
                    {step.line && <span className="bg-muted px-1.5 rounded-full">{step.line}</span>}
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoutePlanner;
