
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import CommunityView from "@/components/CommunityView";
import ProfileView from "@/components/ProfileView";

type View = 'map' | 'community' | 'profile';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('map');

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1">
        {currentView === 'map' && <MapView />}
        {currentView === 'community' && <CommunityView />}
        {currentView === 'profile' && <ProfileView />}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
