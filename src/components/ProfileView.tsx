
import React, { useState } from 'react';
import { User, MessageCircle, MapPin, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const ProfileView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  
  const handleLogin = () => {
    // In a real app, this would open a login form
    setIsLoggedIn(true);
    toast({
      title: "Connexion réussie!",
      description: "Vous êtes maintenant connecté.",
    });
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!",
    });
  };

  return (
    <div className="container py-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Profil</h2>
      
      {isLoggedIn ? (
        <LoggedInProfile onLogout={handleLogout} />
      ) : (
        <GuestProfile onLogin={handleLogin} />
      )}
    </div>
  );
};

interface GuestProfileProps {
  onLogin: () => void;
}

const GuestProfile: React.FC<GuestProfileProps> = ({ onLogin }) => {
  return (
    <Card className="p-6 text-center">
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <User size={36} className="text-muted-foreground" />
        </div>
        
        <div>
          <h3 className="text-xl font-medium">Utilisateur Invité</h3>
          <p className="text-sm text-muted-foreground">
            Connectez-vous pour accéder à toutes les fonctionnalités
          </p>
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row w-full max-w-xs">
          <Button 
            onClick={onLogin} 
            className="flex-1 bg-fach-purple hover:bg-fach-purple-tertiary"
          >
            Connexion
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
          >
            Inscription
          </Button>
        </div>
      </div>
      
      <div className="pt-6 border-t mt-4">
        <h4 className="font-medium mb-4">Fonctionnalités disponibles sans compte:</h4>
        <ul className="text-sm text-left space-y-3">
          <li className="flex gap-2">
            <MapPin size={18} className="text-fach-blue shrink-0" /> 
            <div>
              <span className="font-medium">Recherche d'itinéraires</span>
              <p className="text-muted-foreground">Trouvez votre chemin dans la ville</p>
            </div>
          </li>
          <li className="flex gap-2">
            <Bell size={18} className="text-fach-blue shrink-0" /> 
            <div>
              <span className="font-medium">Voir les alertes</span>
              <p className="text-muted-foreground">Restez informé des perturbations</p>
            </div>
          </li>
          <li className="flex gap-2">
            <MessageCircle size={18} className="text-fach-blue shrink-0" /> 
            <div>
              <span className="font-medium">Lire les discussions communautaires</span>
              <p className="text-muted-foreground">Accédez aux conseils de la communauté</p>
            </div>
          </li>
        </ul>
      </div>
    </Card>
  );
};

interface LoggedInProfileProps {
  onLogout: () => void;
}

const LoggedInProfile: React.FC<LoggedInProfileProps> = ({ onLogout }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [favoriteLocationsNotifs, setFavoriteLocationsNotifs] = useState(true);
  
  return (
    <>
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-fach-purple to-fach-blue flex items-center justify-center text-white text-xl font-bold">
              SK
            </div>
            
            <div>
              <h3 className="text-xl font-medium">Salma Khaldi</h3>
              <p className="text-sm text-muted-foreground">salma.k@example.com</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onLogout}
          >
            Déconnexion
          </Button>
        </div>
      </Card>
      
      <Tabs defaultValue="activity">
        <TabsList className="mb-4">
          <TabsTrigger value="activity">Activité</TabsTrigger>
          <TabsTrigger value="favorites">Favoris</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity">
          <Card className="p-6">
            <h3 className="font-medium text-lg mb-4">Votre activité récente</h3>
            
            <div className="space-y-4">
              <div className="border-b pb-3">
                <div className="flex items-start gap-2">
                  <MessageCircle size={18} className="text-fach-purple shrink-0 mt-1" />
                  <div>
                    <p className="text-sm">
                      Vous avez posé une question: 
                      <span className="font-medium block">
                        "Comment éviter les embouteillages vers le quartier Maârif le matin?"
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a 2 jours</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-3">
                <div className="flex items-start gap-2">
                  <MapPin size={18} className="text-fach-blue shrink-0 mt-1" />
                  <div>
                    <p className="text-sm">
                      Vous avez recherché un itinéraire: 
                      <span className="font-medium block">
                        Casa Voyageurs → Morocco Mall
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a 3 jours</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start gap-2">
                  <MessageCircle size={18} className="text-fach-purple shrink-0 mt-1" />
                  <div>
                    <p className="text-sm">
                      Vous avez répondu à une question: 
                      <span className="font-medium block">
                        "Le tram est plus rapide que le bus pour cette route."
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Il y a 5 jours</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card className="p-6">
            <h3 className="font-medium text-lg mb-4">Vos lieux favoris</h3>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <MapPin size={20} className="text-fach-blue shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Maison</h4>
                      <p className="text-sm text-muted-foreground">Boulevard Anfa, Casablanca</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Modifier</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <MapPin size={20} className="text-fach-purple shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Travail</h4>
                      <p className="text-sm text-muted-foreground">Technopark, Route de Nouaceur</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Modifier</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <MapPin size={20} className="text-fach-blue-bright shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Université</h4>
                      <p className="text-sm text-muted-foreground">Université Hassan II, Casablanca</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Modifier</Button>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              Ajouter un lieu
            </Button>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="p-6">
            <h3 className="font-medium text-lg mb-4">Paramètres</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notifications</h4>
                  <p className="text-sm text-muted-foreground">Recevoir des alertes et des mises à jour</p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              
              {notificationsEnabled && (
                <div className="border-t pt-4 mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Alertes de trafic</h4>
                      <p className="text-sm text-muted-foreground">Pour vos trajets habituels</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Lieux favoris</h4>
                      <p className="text-sm text-muted-foreground">Alertes concernant vos lieux favoris</p>
                    </div>
                    <Switch 
                      checked={favoriteLocationsNotifs}
                      onCheckedChange={setFavoriteLocationsNotifs}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Réponses à vos questions</h4>
                      <p className="text-sm text-muted-foreground">Quand quelqu'un répond à vos questions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              )}
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Préférences d'itinéraire</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Mode de transport préféré</p>
                    <div className="text-sm font-medium">Tous</div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Critère de tri par défaut</p>
                    <div className="text-sm font-medium">Plus rapide</div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-3">
                  Modifier
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Options du compte</h4>
                <Button variant="outline" size="sm" className="mr-2">
                  Modifier le profil
                </Button>
                <Button variant="destructive" size="sm">
                  Supprimer le compte
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ProfileView;
