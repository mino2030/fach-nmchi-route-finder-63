
import React from 'react';

const MapPlaceholder = () => {
  return (
    <div className="h-full w-full relative bg-gray-100 rounded-lg">
      <div className="absolute top-4 left-4 bg-white/80 px-3 py-2 rounded-lg shadow-md z-20">
        <div className="text-sm font-semibold">Casablanca, Maroc</div>
      </div>
      
      {/* Compass */}
      <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-white/80 shadow-md flex items-center justify-center z-20">
        <div className="relative h-12 w-12">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-1 bg-red-500"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-6 w-1 bg-gray-500"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-6 bg-gray-500"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-6 bg-gray-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs font-bold">N</div>
        </div>
      </div>
      
      {/* Casablanca text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <span className="text-3xl font-bold text-fach-purple-tertiary/80 bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm">
          CASABLANCA
        </span>
      </div>
    </div>
  );
};

export default MapPlaceholder;
