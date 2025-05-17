
import React from 'react';

const MapPlaceholder = () => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-100 to-green-50 flex items-center justify-center relative">
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNGMUYxRjEiPjwvcmVjdD4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNGMUYxRjEiPjwvcmVjdD4KPC9zdmc+Cg==')", backgroundSize: "20px 20px"}}></div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-5xl font-bold text-blue-800/80 italic">Casablanca</h2>
        <div className="mt-2 h-4 w-4 mx-auto rounded-full bg-red-500 animate-ping"></div>
      </div>
      
      <div className="absolute inset-0">
        {/* Simulated map elements */}
        <div className="absolute top-[20%] left-[30%] h-1 w-12 bg-blue-500 rotate-45"></div>
        <div className="absolute top-[25%] left-[35%] h-1 w-16 bg-blue-500 rotate-[120deg]"></div>
        <div className="absolute top-[45%] left-[40%] h-1 w-20 bg-blue-500"></div>
        <div className="absolute top-[50%] left-[55%] h-1 w-24 bg-blue-500 rotate-[210deg]"></div>
        <div className="absolute top-[60%] left-[25%] h-1 w-32 bg-blue-500 rotate-[30deg]"></div>
        
        {/* Ocean area */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-blue-200/30"></div>
        
        {/* Landmarks */}
        <div className="absolute top-[30%] left-[40%] flex flex-col items-center">
          <div className="h-2 w-2 rounded-full bg-purple-600"></div>
          <div className="text-xs text-purple-800 font-semibold mt-1">Centre Ville</div>
        </div>
        
        <div className="absolute top-[42%] left-[60%] flex flex-col items-center">
          <div className="h-2 w-2 rounded-full bg-green-600"></div>
          <div className="text-xs text-green-800 font-semibold mt-1">Mosquée Hassan II</div>
        </div>
        
        <div className="absolute bottom-[40%] left-[45%] flex flex-col items-center">
          <div className="h-2 w-2 rounded-full bg-amber-600"></div>
          <div className="text-xs text-amber-800 font-semibold mt-1">La Corniche</div>
        </div>
      </div>
      
      {/* Compass */}
      <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-white/80 shadow-md flex items-center justify-center">
        <div className="relative h-12 w-12">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-1 bg-red-500"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-6 w-1 bg-gray-500"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-6 bg-gray-500"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-6 bg-gray-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs font-bold">N</div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-2 rounded-lg shadow-md">
        <div className="text-xs text-muted-foreground">Casablanca, Maroc</div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
