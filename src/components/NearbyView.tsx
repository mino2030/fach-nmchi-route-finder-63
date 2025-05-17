
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, Utensils, Map } from "lucide-react";

const NearbyView = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">À proximité</h1>
      
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <Hotel size={16} />
            <span>Hôtels</span>
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="flex items-center gap-2">
            <Utensils size={16} />
            <span>Restaurants</span>
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Map size={16} />
            <span>Activités</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="hotels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-muted"></div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">Hôtel Royal Mansour</h3>
                  <p className="text-sm text-muted-foreground">5 étoiles · Centre ville</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">4.8</span>
                      <div className="flex text-yellow-400 ml-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <span className="font-semibold">1500 MAD</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="restaurants" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-muted"></div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">La Sqala</h3>
                  <p className="text-sm text-muted-foreground">Cuisine marocaine · $$</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">4.5</span>
                      <div className="flex text-yellow-400 ml-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm">Ouvert jusqu'à 23h</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-muted"></div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">Mosquée Hassan II</h3>
                  <p className="text-sm text-muted-foreground">Monument historique</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">4.9</span>
                      <div className="flex text-yellow-400 ml-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm">120 MAD</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NearbyView;
