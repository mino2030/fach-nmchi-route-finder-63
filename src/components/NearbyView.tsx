
import { useState } from 'react';
import { Hotel, Activity, Coffee, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsItem, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type PlaceCategory = 'hotels' | 'activities' | 'restaurants';

interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  rating: number;
  image: string;
  distance: string;
  price: string;
  tags: string[];
}

// Sample data
const NEARBY_PLACES: Place[] = [
  {
    id: '1',
    name: 'Hôtel Casablanca',
    category: 'hotels',
    rating: 4.7,
    image: '/placeholder.svg',
    distance: '0.5 km',
    price: '€€€',
    tags: ['Vue mer', 'Piscine', 'Spa']
  },
  {
    id: '2',
    name: 'Hôtel Royal',
    category: 'hotels',
    rating: 4.5,
    image: '/placeholder.svg',
    distance: '1.2 km',
    price: '€€€€',
    tags: ['Luxe', 'Restaurant', 'Centre-ville']
  },
  {
    id: '3',
    name: 'Visite de la Mosquée Hassan II',
    category: 'activities',
    rating: 4.9,
    image: '/placeholder.svg',
    distance: '2.1 km',
    price: '€',
    tags: ['Culturel', 'Historique', 'Vue']
  },
  {
    id: '4',
    name: 'Balade en bateau',
    category: 'activities',
    rating: 4.4,
    image: '/placeholder.svg',
    distance: '3.0 km',
    price: '€€',
    tags: ['Mer', 'Relaxant', 'Groupe']
  },
  {
    id: '5',
    name: 'Restaurant Marocain Authentique',
    category: 'restaurants',
    rating: 4.8,
    image: '/placeholder.svg',
    distance: '0.7 km',
    price: '€€',
    tags: ['Tajine', 'Couscous', 'Vue']
  },
  {
    id: '6',
    name: 'Café de la Corniche',
    category: 'restaurants',
    rating: 4.6,
    image: '/placeholder.svg',
    distance: '1.5 km',
    price: '€',
    tags: ['Café', 'Pâtisseries', 'Vue mer']
  }
];

const NearbyView = () => {
  const [activeCategory, setActiveCategory] = useState<PlaceCategory>('hotels');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPlaces = NEARBY_PLACES.filter(place => 
    place.category === activeCategory && 
    (searchQuery === '' || place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );
  
  const renderStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(rating));
  };
  
  const getCategoryIcon = (category: PlaceCategory) => {
    switch(category) {
      case 'hotels': return <Hotel className="h-5 w-5" />;
      case 'activities': return <Activity className="h-5 w-5" />;
      case 'restaurants': return <Coffee className="h-5 w-5" />;
    }
  };
  
  const getCategoryTitle = (category: PlaceCategory) => {
    switch(category) {
      case 'hotels': return 'Hôtels';
      case 'activities': return 'Activités';
      case 'restaurants': return 'Restaurants & Cafés';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Search className="h-6 w-6 text-fach-purple" />
        <span>Découvrir à proximité</span>
      </h2>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un lieu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </div>
        
        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as PlaceCategory)}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="hotels" className="flex gap-2 items-center">
              <Hotel className="h-4 w-4" />
              <span className="hidden sm:inline">Hôtels</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex gap-2 items-center">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Activités</span>
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="flex gap-2 items-center">
              <Coffee className="h-4 w-4" />
              <span className="hidden sm:inline">Restaurants & Cafés</span>
            </TabsTrigger>
          </TabsList>
          
          {['hotels', 'activities', 'restaurants'].map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlaces.length > 0 ? (
                  filteredPlaces.map((place) => (
                    <Card key={place.id} className="overflow-hidden hover:shadow-md transition-shadow card-hover">
                      <div className="aspect-video relative bg-muted">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="object-cover w-full h-full"
                        />
                        <Badge className="absolute top-2 right-2 bg-background/80 text-foreground">
                          {place.distance}
                        </Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{place.name}</CardTitle>
                          <div className="flex items-center gap-1 text-amber-500">
                            <span className="text-sm">{place.rating}</span>
                            <span>{renderStars(place.rating)}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {place.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="bg-muted/50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Prix: <span>{place.price}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="default" className="w-full bg-fach-purple hover:bg-fach-purple-tertiary">
                          Voir les détails
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-muted-foreground">Aucun résultat trouvé</p>
                    <Button variant="link" onClick={() => setSearchQuery('')}>Réinitialiser la recherche</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default NearbyView;
