
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import CommunityView from "@/components/CommunityView";
import ProfileView from "@/components/ProfileView";
import MessagesView from "@/components/MessagesView";
import NewsAndAlerts from "@/components/NewsAndAlerts";
import NearbyView from "@/components/NearbyView";
import ChatbotView from "@/components/ChatbotView";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

type View = 'map' | 'community' | 'profile' | 'messages' | 'nearby' | 'chatbot';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('map');
  const [showLanding, setShowLanding] = useState(true);

  const handleExplore = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        
        <main className="flex-1 relative overflow-hidden bg-gradient-to-br from-fach-purple-light via-white to-fach-blue-soft">
          <div className="container mx-auto px-4 pt-12 pb-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Explorez <span className="fach-gradient-text">Casablanca</span> comme jamais auparavant
              </h1>
              <p className="text-lg mb-6 text-muted-foreground">
                Votre compagnon de voyage intelligent pour découvrir la ville blanche. Navigation, conseils personnalisés et recommandations locales en un seul endroit.
              </p>
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
                  onClick={() => {
                    setCurrentView('chatbot');
                    setShowLanding(false);
                  }}
                >
                  Parler au guide IA <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-white/80 p-4 rounded-lg text-center shadow-sm">
                  <h3 className="font-semibold">Naviguez</h3>
                  <p className="text-sm text-muted-foreground">Trouvez votre chemin facilement</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg text-center shadow-sm">
                  <h3 className="font-semibold">Découvrez</h3>
                  <p className="text-sm text-muted-foreground">Les meilleurs lieux à visiter</p>
                </div>
                <div className="bg-white/80 p-4 rounded-lg text-center shadow-sm">
                  <h3 className="font-semibold">Connectez</h3>
                  <p className="text-sm text-muted-foreground">Avec la communauté locale</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center animate-float">
              <div className="w-full max-w-md relative">
                <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white bg-white">
                  <div className="bg-fach-purple text-white text-center py-3 font-semibold">
                    Carte de Casablanca
                  </div>
                  <div className="aspect-square bg-blue-100 relative">
                    {/* Placeholder for Casablanca Map */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-200 to-green-100 flex items-center justify-center">
                        <h2 className="text-3xl font-bold text-blue-800 italic">Casablanca</h2>
                      </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="h-4 w-4 rounded-full bg-red-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Highlight Section */}
          <div className="container mx-auto px-4 py-16 bg-gradient-to-r from-white to-white/0 rounded-t-3xl -mt-6 relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-center">Ce que Move Easy vous offre</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="fach-card text-center p-6">
                <div className="rounded-full bg-fach-purple/10 p-4 inline-block mb-4">
                  <MapPin className="h-8 w-8 text-fach-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Navigation intelligente</h3>
                <p className="text-muted-foreground">
                  Trouvez votre chemin dans Casablanca avec des itinéraires optimisés et des mises à jour en temps réel.
                </p>
              </div>
              
              <div className="fach-card text-center p-6">
                <div className="rounded-full bg-fach-blue/10 p-4 inline-block mb-4">
                  <MapPin className="h-8 w-8 text-fach-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Découverte locale</h3>
                <p className="text-muted-foreground">
                  Explorez les meilleurs hôtels, restaurants et activités recommandés par les habitants et d'autres voyageurs.
                </p>
              </div>
              
              <div className="fach-card text-center p-6">
                <div className="rounded-full bg-fach-purple-tertiary/10 p-4 inline-block mb-4">
                  <MapPin className="h-8 w-8 text-fach-purple-tertiary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Guide IA personnel</h3>
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
      
      <main className="flex-1">
        {currentView === 'map' && <MapView />}
        {currentView === 'community' && <CommunityView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'messages' && <MessagesView />}
        {currentView === 'nearby' && <NearbyView />}
        {currentView === 'chatbot' && <ChatbotView />}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
