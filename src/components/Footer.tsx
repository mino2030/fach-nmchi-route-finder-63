
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-border py-4 text-xs text-muted-foreground">
      <div className="container flex flex-col md:flex-row items-center justify-center md:justify-between gap-2">
        <p>© 2025 FACH NMCHI - MVP Version</p>
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
