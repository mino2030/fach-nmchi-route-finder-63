
import { useState } from 'react';
import { MapPin, MessageCircle, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

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

type View = 'map' | 'community' | 'profile';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header = ({ currentView, setCurrentView }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

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
        icon={<MessageCircle size={18} />} 
        text="Communauté" 
        active={currentView === 'community'}
        onClick={() => {
          setCurrentView('community');
          setIsOpen(false);
        }} 
      />
      <NavLink 
        icon={<User size={18} />} 
        text="Profil" 
        active={currentView === 'profile'}
        onClick={() => {
          setCurrentView('profile');
          setIsOpen(false);
        }} 
      />
    </>
  );

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-card border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl">
            <span className="fach-gradient-text">FACH NMCHI</span>
          </h1>
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] flex flex-col gap-2 pt-10">
              {renderNavLinks()}
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center gap-2">
            {renderNavLinks()}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
