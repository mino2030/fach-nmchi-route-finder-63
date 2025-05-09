import React, { useState } from 'react';
import { MessageCircle, MapPin, Search, User, Share, Pin, Flag, Clock, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import PostQuestion from './PostQuestion';

interface Post {
  id: string;
  question: string;
  details?: string;
  location?: string;
  author: string;
  authorAvatar?: string;
  time: string;
  answers: number;
  tags?: string[];
  isPinned?: boolean;
  pinnedUntil?: string;
  likes: number;
  isLiked?: boolean;
  isShared?: boolean;
  itinerary?: {
    origin: string;
    destination: string;
    routeId?: string;
  };
}

const CommunityView = () => {
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      question: "Comment aller à l'Université Hassan II depuis Sidi Bernoussi ce matin avec les travaux?",
      details: "Je dois être là-bas avant 9h et je vois qu'il y a des travaux sur la route principale. Une alternative?",
      location: "Université Hassan II",
      author: "Youssef M.",
      authorAvatar: "",
      time: "Il y a 15 min",
      answers: 3,
      tags: ['université', 'travaux'],
      isPinned: false,
      likes: 5,
      itinerary: {
        origin: "Sidi Bernoussi",
        destination: "Université Hassan II"
      }
    },
    {
      id: '2',
      question: "Quel est le meilleur moyen d'aller à Morocco Mall depuis Casa Port? Bus ou Taxi?",
      details: "Je cherche l'option la plus économique mais aussi assez rapide pour ce weekend.",
      location: "Morocco Mall",
      author: "Leila T.",
      authorAvatar: "",
      time: "Il y a 45 min",
      answers: 5,
      tags: ['mall', 'transport'],
      isPinned: false,
      likes: 12,
      itinerary: {
        origin: "Casa Port",
        destination: "Morocco Mall"
      }
    },
    {
      id: '3',
      question: "Est-ce que le tram T1 est fonctionnel aujourd'hui? J'ai entendu qu'il y avait une panne.",
      details: "Quelqu'un sait si la panne a été réparée? Je dois prendre le tram dans une heure.",
      author: "Hamid K.",
      authorAvatar: "",
      time: "Il y a 1h",
      answers: 7,
      tags: ['tram', 'panne'],
      isPinned: true,
      pinnedUntil: "11:45",
      likes: 18,
      isLiked: true,
    },
    {
      id: '4',
      question: "Comment éviter les embouteillages pour aller à l'aéroport demain matin?",
      details: "Mon vol est à 10h, je pars de Ain Diab. Quelles routes sont les moins congestionnées vers 7h?",
      location: "Aéroport Mohammed V",
      author: "Sara L.",
      authorAvatar: "",
      time: "Il y a 2h",
      answers: 4,
      tags: ['aéroport', 'embouteillage'],
      isPinned: false,
      likes: 7,
    },
    {
      id: '5',
      question: "Quel est l'impact du marathon ce weekend sur la circulation au centre-ville?",
      details: "Je dois aller au centre-ville dimanche matin. Quelles routes seront fermées pour le marathon?",
      location: "Centre-ville",
      author: "Mohammed A.",
      authorAvatar: "",
      time: "Il y a 5h",
      answers: 12,
      tags: ['événement', 'marathon'],
      isPinned: true,
      pinnedUntil: "Demain",
      likes: 25,
      isLiked: true,
    },
  ]);

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.isLiked;
        return {
          ...post,
          isLiked: !wasLiked,
          likes: wasLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleSharePost = (postId: string) => {
    // Find the post to share
    const postToShare = posts.find(post => post.id === postId);
    
    // If the post has an itinerary, create a shareable link
    if (postToShare?.itinerary) {
      const { origin, destination, routeId } = postToShare.itinerary;
      let shareableLink = `${window.location.origin}/itinerary?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
      
      // If there's a specific routeId, add it to the link
      if (routeId) {
        shareableLink += `&routeId=${routeId}`;
      }
      
      // Try to use Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: `Itinéraire de ${origin} à ${destination}`,
          text: postToShare.question,
          url: shareableLink,
        }).catch(() => {
          // Fallback to clipboard
          copyToClipboard(shareableLink);
        });
      } else {
        // Fallback to clipboard
        copyToClipboard(shareableLink);
      }
    } else {
      // Share just the post without itinerary
      const shareableLink = `${window.location.origin}/community/post/${postId}`;
      
      // Try to use Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: "Publication partagée",
          text: postToShare?.question || "Découvrez cette publication sur Fach Nmchi",
          url: shareableLink,
        }).catch(() => {
          // Fallback to clipboard
          copyToClipboard(shareableLink);
        });
      } else {
        // Fallback to clipboard
        copyToClipboard(shareableLink);
      }
    }
    
    // Update post state to indicate it's been shared
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isShared: true,
        };
      }
      return post;
    }));
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Post partagé",
        description: "Le lien a été copié dans votre presse-papiers.",
      });
    }).catch(() => {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien dans votre presse-papiers.",
      });
    });
  };

  const handlePinPost = (postId: string) => {
    // In a real app, this would be controlled by time and permissions
    const postToBePinned = posts.find(post => post.id === postId);
    
    if (postToBePinned?.isPinned) {
      toast({
        title: "Post désépinglé",
        description: "Le post n'est plus épinglé.",
      });
    } else {
      toast({
        title: "Post épinglé",
        description: "Le post sera épinglé pendant 10 minutes.",
      });
    }
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isPinned: !post.isPinned,
          pinnedUntil: !post.isPinned ? "10 minutes" : undefined,
        };
      }
      return post;
    }));
  };

  const sortPosts = (postsToSort: Post[]) => {
    // Sort by pinned first, then by time
    return [...postsToSort].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      // Then sort by most recent
      const timeA = a.time.toLowerCase();
      const timeB = b.time.toLowerCase();
      if (timeA.includes('min') && !timeB.includes('min')) return -1;
      if (!timeA.includes('min') && timeB.includes('min')) return 1;
      if (timeA.includes('h') && !timeB.includes('h') && !timeB.includes('min')) return -1;
      if (!timeA.includes('h') && !timeA.includes('min') && timeB.includes('h')) return 1;
      
      return 0;
    });
  };

  const recentPosts = sortPosts(posts);
  
  const popularPosts = sortPosts([...posts].sort((a, b) => b.likes - a.likes));

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

  const renderPost = (post: Post) => (
    <Card 
      key={post.id} 
      className={`p-4 ${post.isPinned ? 'border-fach-purple border-2' : ''}`}
    >
      <div className="space-y-3">
        {post.isPinned && (
          <div className="flex items-center gap-1 text-fach-purple text-sm font-medium">
            <Pin size={14} />
            <span>Épinglé jusqu'à {post.pinnedUntil}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.authorAvatar} />
            <AvatarFallback>{post.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium text-sm">{post.author}</div>
            <div className="text-xs text-muted-foreground">{post.time}</div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold">{post.question}</h3>
          {post.details && (
            <p className="text-sm text-muted-foreground mt-1">{post.details}</p>
          )}
        </div>
        
        {post.location && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin size={14} />
            <span>{post.location}</span>
          </div>
        )}
        
        {post.itinerary && (
          <div className="flex items-center gap-1 text-sm text-fach-blue mt-1">
            <Route size={14} />
            <span>Itinéraire: {post.itinerary.origin} → {post.itinerary.destination}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {post.tags && post.tags.map(tag => (
            <span key={tag} className="bg-muted px-2 py-0.5 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t text-sm">
          <div className="flex items-center gap-4">
            <button 
              className={`flex items-center gap-1 ${post.isLiked ? 'text-fach-purple' : 'text-muted-foreground'} hover:text-fach-purple`} 
              onClick={() => handleLikePost(post.id)}
            >
              <Flag size={16} className={post.isLiked ? 'fill-fach-purple' : ''} />
              <span>{post.likes}</span>
            </button>
            
            <button className="flex items-center gap-1 text-muted-foreground hover:text-fach-blue">
              <MessageCircle size={16} />
              <span>{post.answers} réponse{post.answers !== 1 ? 's' : ''}</span>
            </button>
          </div>
          
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={`p-1.5 rounded-full hover:bg-muted ${post.isShared ? 'text-fach-blue' : 'text-muted-foreground'}`}
                    onClick={() => handleSharePost(post.id)}
                  >
                    <Share size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{post.itinerary ? "Partager l'itinéraire" : "Partager la publication"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={`p-1.5 rounded-full hover:bg-muted ${post.isPinned ? 'text-fach-purple' : 'text-muted-foreground'}`}
                    onClick={() => handlePinPost(post.id)}
                  >
                    <Pin size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{post.isPinned ? 'Désépingler' : 'Épingler pour 10 minutes'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </Card>
  );

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
              filteredRecentPosts.map(renderPost)
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
              filteredPopularPosts.map(renderPost)
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
