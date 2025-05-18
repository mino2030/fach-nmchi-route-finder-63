
import React from 'react';

export default function CasablancaMap() {
  return (
    <div className="md:w-1/2 flex justify-center animate-float">
      <div className="w-full max-w-md relative">
        <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white bg-white">
          <div className="bg-fach-purple text-white text-center py-3 font-semibold">
            Carte de Casablanca
          </div>
          <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl font-bold text-fach-purple-tertiary/80 bg-white/30 px-4 py-2 rounded-lg backdrop-blur-sm">
                CASABLANCA
              </span>
              <p className="mt-4 text-gray-600">La ville blanche</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
