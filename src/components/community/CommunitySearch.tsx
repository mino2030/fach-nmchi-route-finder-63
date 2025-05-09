
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CommunitySearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CommunitySearch = ({ searchQuery, setSearchQuery }: CommunitySearchProps) => {
  return (
    <div className="mb-6 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
      <Input
        placeholder="Rechercher des questions..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default CommunitySearch;
