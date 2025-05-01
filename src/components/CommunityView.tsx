
import React, { useState } from 'react';
import { MessageCircle, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import PostQuestion from './PostQuestion';

interface Post {
  id: string;
  question: string;
  location?: string;
  author: string;
  time: string;
  answers: number;
  tags?: string[];
}

const CommunityView = () => {
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - would come from an API in real app
  const recentPosts: Post[] = [
    {
      id: '1',
      question: "Comment aller à l'Université Hassan II depuis Sidi Bernoussi ce matin avec les travaux?",
      location: "Université Hassan II",
      author: "Youssef M.",
      time: "Il y a 15 min",
      answers: 3,
      tags: ['université', 'travaux'],
    },
    {
      id: '2',
      question: "Quel est le meilleur moyen d'aller à Morocco Mall depuis Casa Port? Bus ou Taxi?",
      location: "Morocco Mall",
      author: "Leila T.",
      time: "Il y a 45 min",
      answers: 5,
      tags: ['mall', 'transport'],
    },
    {
      id: '3',
      question: "Est-ce que le tram T1 est fonctionnel aujourd'hui? J'ai entendu qu'il y avait une panne.",
      author: "Hamid K.",
      time: "Il y a 1h",
      answers: 7,
      tags: ['tram', 'panne'],
    },
    {
      id: '4',
      question: "Comment éviter les embouteillages pour aller à l'aéroport demain matin?",
      location: "Aéroport Mohammed V",
      author: "Sara L.",
      time: "Il y a 2h",
      answers: 4,
      tags: ['aéroport', 'embouteillage'],
    }
  ];

  const popularPosts: Post[] = [
    {
      id: '5',
      question: "Quel est l'impact du marathon ce weekend sur la circulation au centre-ville?",
      location: "Centre-ville",
      author: "Mohammed A.",
      time: "Il y a 5h",
      answers: 12,
      tags: ['événement', 'marathon'],
    },
    {
      id: '6',
      question: "Comment accéder à Anfa Place avec la fermeture de la Corniche?",
      location: "Anfa Place",
      author: "Nadia B.",
      time: "Hier",
      answers: 9,
      tags: ['corniche', 'fermeture'],
    }
  ];

  const filteredRecentPosts = searchQuery 
    ? recentPosts.filter(post => 
        post.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : recentPosts;

  const filteredPopularPosts = searchQuery 
    ? popularPosts.filter(post => 
        post.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : popularPosts;

  return (
    <div className="container py-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Communauté</h2>
        <Button 
          onClick={() => setOpenPostDialog(true)}
          className="bg-fach-purple hover:bg-fach-purple-tertiary"
        >
          <MessageCircle size={18} className="mr-2" /> Poser une question
        </Button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Rechercher des questions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="recent" className="mb-6">
        <TabsList className="mb-2">
          <TabsTrigger value="recent">Récent</TabsTrigger>
          <TabsTrigger value="popular">Populaire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <div className="space-y-4">
            {filteredRecentPosts.length > 0 ? (
              filteredRecentPosts.map(post => (
                <Card key={post.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{post.question}</h3>
                    </div>
                    
                    {post.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        <span>{post.location}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags && post.tags.map(tag => (
                        <span key={tag} className="bg-muted px-2 py-0.5 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm pt-2">
                      <div className="text-muted-foreground">
                        {post.author} · {post.time}
                      </div>
                      <div className="flex items-center gap-1 text-fach-blue">
                        <MessageCircle size={14} />
                        <span>{post.answers} réponse{post.answers !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Aucun résultat trouvé
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="popular">
          <div className="space-y-4">
            {filteredPopularPosts.length > 0 ? (
              filteredPopularPosts.map(post => (
                <Card key={post.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{post.question}</h3>
                    </div>
                    
                    {post.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        <span>{post.location}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags && post.tags.map(tag => (
                        <span key={tag} className="bg-muted px-2 py-0.5 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm pt-2">
                      <div className="text-muted-foreground">
                        {post.author} · {post.time}
                      </div>
                      <div className="flex items-center gap-1 text-fach-blue">
                        <MessageCircle size={14} />
                        <span>{post.answers} réponse{post.answers !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Aucun résultat trouvé
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <PostQuestion open={openPostDialog} onOpenChange={setOpenPostDialog} />
    </div>
  );
};

export default CommunityView;
