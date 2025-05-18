
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import CommunityView from "@/components/CommunityView";
import ProfileView from "@/components/ProfileView";
import MessagesView from "@/components/MessagesView";
import NewsAndAlerts from "@/components/NewsAndAlerts";
import ChatbotView from "@/components/ChatbotView";
import RoutePlanner from "@/components/RoutePlanner";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Bus, Car, Train } from "lucide-react";
import CasablancaMap from "@/components/CasablancaMap";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

type View = 'map' | 'community' | 'profile' | 'messages' | 'chatbot';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('map');
  const [showLanding, setShowLanding] = useState(true);
  const [origin, setOrigin] = useState("Casa Voyageurs");
  const [destination, setDestination] = useState("Maarif");
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);

  const handleExplore = () => {
    setShowLanding(false);
  };

  const handlePlanRoute = () => {
    setShowRoutePlanner(true);
    setCurrentView('map');
    setShowLanding(false);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setShowLanding(false);
  };

  if (showLanding) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        
        <main className="flex-1 relative overflow-hidden bg-gradient-to-br from-fach-purple via-fach-blue-ocean/30 to-fach-blue-soft pb-16">
          <div className="container mx-auto px-4 pt-12 pb-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Explorez <span className="fach-gradient-text">Casablanca</span> comme jamais auparavant
              </h1>
              <p className="text-lg mb-6 text-muted-foreground">
                Votre compagnon de mobilité intelligente pour découvrir la ville blanche. Navigation, endroits spéciaux et recommandations locales.
              </p>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-md">
                <h3 className="text-lg font-medium mb-3 text-fach-purple">Planifiez votre trajet</h3>
                <div className="space-y-3">
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
                    onClick={handlePlanRoute}
                    className="w-full bg-fach-purple hover:bg-fach-purple-tertiary"
                  >
                    Trouver mon itinéraire <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleExplore} 
                  className="text-lg px-6 py-6 bg-fach-purple hover:bg-fach-purple-tertiary"
                  size="lg"
                >
                  <MapPin className="mr-2 h-5 w-5" /> Explorer la carte
                </Button>
                <Button 
                  variant="outline" 
                  className="text-lg px-6 py-6"
                  size="lg"
                  onClick={() => handleViewChange('chatbot')}
                >
                  Agent IA <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="transport-card" onClick={() => handlePlanRoute()}>
                  <Bus size={24} />
                  <span>Bus</span>
                </div>
                <div className="transport-card" onClick={() => handlePlanRoute()}>
                  <Train size={24} />
                  <span>Train</span>
                </div>
                <div className="transport-card" onClick={() => handlePlanRoute()}>
                  <Car size={24} />
                  <span>Taxi</span>
                </div>
              </div>
            </div>
            
            <CasablancaMap />
          </div>
          
          {/* Feature Highlight Section */}
          <div className="container mx-auto px-4 py-16 bg-gradient-to-r from-white/90 to-white/40 rounded-t-3xl -mt-6 relative z-10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 text-center">Ce que Move Easy vous offre</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="fach-card glass-effect text-center p-6">
                <div className="rounded-full bg-fach-purple/10 p-4 inline-block mb-4">
                  <MapPin className="h-8 w-8 text-fach-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Navigation intelligente</h3>
                <p className="text-muted-foreground">
                  Trouvez votre chemin dans Casablanca avec des itinéraires optimisés et des mises à jour en temps réel.
                </p>
              </div>
              
              <div className="fach-card glass-effect text-center p-6">
                <div className="rounded-full bg-fach-blue/10 p-4 inline-block mb-4">
                  <Bus className="h-8 w-8 text-fach-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transport multimodal</h3>
                <p className="text-muted-foreground">
                  Combinez bus, train, taxi et plus pour trouver l'itinéraire le plus rapide et économique pour vos déplacements.
                </p>
              </div>
              
              <div className="fach-card glass-effect text-center p-6">
                <div className="rounded-full bg-fach-purple-tertiary/10 p-4 inline-block mb-4">
                  <MapPin className="h-8 w-8 text-fach-purple-tertiary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Agent IA personnel</h3>
                <p className="text-muted-foreground">
                  Votre assistant virtuel pour répondre à toutes vos questions et vous offrir des recommandations personnalisées.
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      {currentView === 'map' && <NewsAndAlerts />}
      
      <main className="flex-1 pb-16">
        {currentView === 'map' && (showRoutePlanner ? (
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-1 block">De</label>
                  <Input 
                    value={origin} 
                    onChange={(e) => setOrigin(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-1 block">À</label>
                  <Input 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-white"
                  />
                </div>
                <Button 
                  onClick={() => setShowRoutePlanner(true)}
                  className="bg-fach-purple hover:bg-fach-purple-tertiary"
                >
                  Rechercher
                </Button>
              </div>
            </div>
            <RoutePlanner origin={origin} destination={destination} />
          </div>
        ) : <MapView />)}
        {currentView === 'community' && <CommunityView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'messages' && <MessagesView />}
        {currentView === 'chatbot' && <ChatbotView />}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
