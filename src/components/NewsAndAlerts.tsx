
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, AlertTriangle, Flag, Info } from 'lucide-react';

const NewsAndAlerts = () => {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(currentDate);

  return (
    <div className="container mx-auto px-4 mb-6">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        <Info size={20} /> Actualités et alertes
      </h2>

      <div className="space-y-4">
        {/* Marathon Event Alert */}
        <Alert variant="destructive" className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <AlertTitle className="text-amber-800">Marathon de Casablanca - Demain</AlertTitle>
          <AlertDescription className="text-amber-700">
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={16} /> <span>De 7h00 à 13h00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> <span>Centre-ville, Corniche, Boulevard Mohammed V</span>
              </div>
              <p className="text-sm mt-1">
                Plusieurs rues seront fermées. Planifiez vos déplacements à l'avance.
              </p>
            </div>
          </AlertDescription>
        </Alert>
        
        {/* Recent Accident */}
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <AlertTitle className="text-red-800">Accident sur Boulevard Zerktouni</AlertTitle>
          <AlertDescription className="text-red-700">
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={16} /> <span>Signalé il y a 22 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> <span>Boulevard Zerktouni, près de Twin Center</span>
              </div>
              <p className="text-sm mt-1">
                Circulation ralentie, temps estimé: +25 minutes. Déviation recommandée.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Match Alert */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Flag size={18} className="text-blue-500" /> Match de football
              </CardTitle>
              <span className="text-sm text-muted-foreground">{formattedDate}</span>
            </div>
            <CardDescription>Wydad AC vs Raja CA - Stade Mohammed V</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" /> 
                <span>Ce soir à 20h00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" /> 
                <span>Stade Mohammed V, Maârif</span>
              </div>
              <p>
                Les rues autour du stade seront bloquées de 18h00 à 23h00. 
                Trafic dense attendu dans les environs. Préférez les transports en commun.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsAndAlerts;
