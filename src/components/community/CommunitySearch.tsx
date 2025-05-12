
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CommunitySearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CommunitySearch = ({ searchQuery, setSearchQuery }: CommunitySearchProps) => {
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="mt-4 relative animate-fade-in">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-fach-purple-secondary" />
        </div>
        <Input
          type="text"
          placeholder="Rechercher une question, un lieu ou un tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 py-6 shadow-md rounded-xl border border-fach-purple/20 focus-visible:ring-fach-blue-bright focus-visible:border-fach-blue-bright transition-all bg-gradient-to-r from-white to-fach-blue-soft/5"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-fach-purple transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="absolute -z-10 -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-br from-fach-purple/10 to-fach-blue/10 blur-xl rounded-xl opacity-50"></div>
    </div>
  );
};

export default CommunitySearch;
