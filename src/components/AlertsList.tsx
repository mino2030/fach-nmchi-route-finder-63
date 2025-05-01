
import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'traffic' | 'event' | 'roadblock' | 'other';
  location: string;
  timestamp: string;
  reportedBy: string;
  upvotes: number;
}

const AlertsList = () => {
  // Mock data - would come from an API in real app
  const alerts: Alert[] = [
    {
      id: '1',
      title: 'Accident sur Boulevard Zerktouni',
      description: 'Accident impliquant deux voitures. Circulation ralentie.',
      type: 'traffic',
      location: 'Boulevard Zerktouni, près de Twin Center',
      timestamp: '10:30',
      reportedBy: 'Amal K.',
      upvotes: 12,
    },
    {
      id: '2',
      title: 'Manifestation près de Place Mohammed V',
      description: 'Plusieurs rues fermées suite à une manifestation.',
      type: 'event',
      location: 'Place Mohammed V',
      timestamp: '11:15',
      reportedBy: 'Karim B.',
      upvotes: 8,
    },
    {
      id: '3',
      title: 'Route barrée pour travaux',
      description: 'Travaux de voirie, route complètement fermée jusqu\'à 18h.',
      type: 'roadblock',
      location: 'Rue Ibnou Mounir, Maarif',
      timestamp: '09:45',
      reportedBy: 'Système',
      upvotes: 5,
    },
  ];

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'traffic':
        return 'bg-orange-100 text-orange-600';
      case 'event':
        return 'bg-blue-100 text-blue-600';
      case 'roadblock':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'traffic':
        return 'Trafic';
      case 'event':
        return 'Événement';
      case 'roadblock':
        return 'Route barrée';
      default:
        return 'Autre';
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div key={alert.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
          <div className="flex items-start gap-3">
            <div className={`p-1.5 rounded-full ${getAlertTypeColor(alert.type)}`}>
              <AlertTriangle size={16} />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-base">{alert.title}</h4>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
              
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs">
                <div className="text-muted-foreground">{alert.location}</div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock size={12} />
                  Il y a {alert.timestamp}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getAlertTypeColor(alert.type)}`}>
                  {getAlertTypeLabel(alert.type)}
                </span>
                <div className="text-xs text-muted-foreground">
                  Signalé par {alert.reportedBy} · {alert.upvotes} confirmations
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="w-full py-2 text-sm text-fach-blue hover:underline">
        Voir toutes les alertes
      </button>
    </div>
  );
};

export default AlertsList;
