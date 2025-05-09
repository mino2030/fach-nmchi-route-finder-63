
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import CommunityView from "@/components/CommunityView";
import ProfileView from "@/components/ProfileView";
import MessagesView from "@/components/MessagesView";
import NewsAndAlerts from "@/components/NewsAndAlerts";
import { Button } from "@/components/ui/button";

type View = 'map' | 'community' | 'profile' | 'messages';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('map');

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="fach-gradient-text">FACH NMCHI</span>
          <span className="text-sm block text-muted-foreground">Votre compagnon de trajet quotidien</span>
        </h1>
        <Button className="bg-fach-purple hover:bg-fach-purple-tertiary">
          Se connecter
        </Button>
      </div>
      
      {currentView === 'map' && <NewsAndAlerts />}
      
      <main className="flex-1">
        {currentView === 'map' && <MapView />}
        {currentView === 'community' && <CommunityView />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'messages' && <MessagesView />}
      </main>
      
      <div className="container mx-auto px-4 py-4 flex justify-center sm:justify-between flex-wrap items-center gap-4 border-t">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Informations</a>
          <a href="#" className="hover:text-foreground">Conditions d'utilisation</a>
          <a href="#" className="hover:text-foreground">Confidentialité</a>
        </div>
        <Button className="bg-fach-purple hover:bg-fach-purple-tertiary">
          Se connecter
        </Button>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
