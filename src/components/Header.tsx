
import { useState } from 'react';
import { MapPin, MessageCircle, User, Menu, X, MessageSquare, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

interface NavLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const NavLink = ({ icon, text, active, onClick }: NavLinkProps) => (
  <Button
    variant="ghost"
    size="sm"
    className={`gap-2 ${active ? 'bg-muted' : ''}`}
    onClick={onClick}
  >
    {icon}
    <span className="hidden md:inline">{text}</span>
  </Button>
);

type View = 'map' | 'community' | 'profile' | 'messages' | 'nearby' | 'chatbot';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header = ({ currentView, setCurrentView }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Message sent:', messageInput);
      setMessageInput('');
    }
  };

  const renderNavLinks = () => (
    <>
      <NavLink 
        icon={<MapPin size={18} />} 
        text="Explorer" 
        active={currentView === 'map'}
        onClick={() => {
          setCurrentView('map');
          setIsOpen(false);
        }} 
      />
      <NavLink 
        icon={<Coffee size={18} />} 
        text="À proximité" 
        active={currentView === 'nearby'}
        onClick={() => {
          setCurrentView('nearby');
          setIsOpen(false);
        }} 
      />
      <NavLink 
        icon={<MessageCircle size={18} />} 
        text="Communauté" 
        active={currentView === 'community'}
        onClick={() => {
          setCurrentView('community');
          setIsOpen(false);
        }} 
      />
    </>
  );

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-card border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] flex flex-col gap-4 pt-10">
              <div className="flex flex-col items-center gap-4 mb-6">
                <User size={40} className="text-fach-purple" />
                <h3 className="font-semibold">Mon Profil</h3>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2"
                  onClick={() => {
                    setCurrentView('profile');
                    setIsOpen(false);
                  }}
                >
                  <User size={18} />
                  Profil
                </Button>
                
                <Button variant="outline" className="w-full">S'inscrire</Button>
                <Button className="w-full bg-fach-purple hover:bg-fach-purple-tertiary">Se connecter</Button>
              </div>
              
              <div className="border-t my-4"></div>
              
              <div className="flex flex-col gap-2">
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2"
                  onClick={() => {
                    setCurrentView('map');
                    setIsOpen(false);
                  }}
                >
                  <MapPin size={18} />
                  Explorer la carte
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2"
                  onClick={() => {
                    setCurrentView('nearby');
                    setIsOpen(false);
                  }}
                >
                  <Coffee size={18} />
                  À proximité
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2"
                  onClick={() => {
                    setCurrentView('community');
                    setIsOpen(false);
                  }}
                >
                  <MessageCircle size={18} />
                  Communauté
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="font-bold text-xl">
            <span className="fach-gradient-text">Move Easy</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-2 mr-2">
            {!isMobile && renderNavLinks()}
          </nav>
          
          <Button 
            variant={currentView === 'messages' ? "default" : "outline"} 
            size="sm"
            className={currentView === 'messages' ? "bg-fach-purple hover:bg-fach-purple-tertiary" : ""}
            onClick={() => {
              setCurrentView('messages');
              setDrawerOpen(true);
            }}
          >
            <MessageSquare size={18} className="mr-2" />
            Messages
          </Button>
          
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerContent className="max-h-[85vh]">
              <div className="p-4 max-w-md mx-auto w-full">
                <h3 className="text-lg font-semibold mb-4">Messages</h3>
                <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto border rounded-lg p-4 mb-4">
                  <div className="self-start bg-muted p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">Bonjour ! Comment puis-je vous aider aujourd'hui ?</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Saisissez votre message..." 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>Envoyer</Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          
          <Button 
            variant={currentView === 'chatbot' ? "default" : "outline"} 
            size="sm"
            className={currentView === 'chatbot' ? "bg-fach-blue hover:bg-fach-blue-ocean" : ""}
            onClick={() => setCurrentView('chatbot')}
          >
            <MessageCircle size={18} className="mr-2" />
            Guide IA
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
