
import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-border py-4 text-xs text-muted-foreground bg-background/95 backdrop-blur-sm">
      <div className="container flex flex-col md:flex-row items-center justify-center md:justify-between gap-2">
        <p>© 2025 Move Easy - Explorez Casablanca en toute simplicité</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground">À propos</a>
          <a href="#" className="hover:text-foreground">Conditions d'utilisation</a>
          <a href="#" className="hover:text-foreground">Aide</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
