
import React from 'react';

const MapPlaceholder = () => {
  // In a real implementation, this would be replaced with an actual
  // map integration using Mapbox, Google Maps, or a similar service
  return (
    <div className="w-full h-full bg-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-muted/10">
        {/* Simulate roads */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-border/60"></div>
        <div className="absolute top-2/4 left-0 right-0 h-px bg-border/60"></div>
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-border/60"></div>
        
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border/60"></div>
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-border/60"></div>
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-border/60"></div>
        
        {/* Simulate city blocks */}
        {Array.from({ length: 9 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-16 h-16 rounded-md bg-background/50 border border-border/30"
            style={{ 
              top: `${15 + Math.random() * 70}%`, 
              left: `${15 + Math.random() * 70}%`,
              transform: `rotate(${Math.random() * 10}deg)`
            }}
          />
        ))}
        
        {/* Simulate point of interest */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-fach-purple rounded-full animate-pulse">
          <div className="absolute -inset-1 bg-fach-purple/20 rounded-full"></div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-md text-xs border border-border">
        Carte de démonstration
      </div>
    </div>
  );
};

export default MapPlaceholder;
