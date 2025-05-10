
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import PostQuestion from './PostQuestion';
import CommunitySearch from './community/CommunitySearch';
import PostList from './community/PostList';
import { Post } from '@/types/community';
import { sortPosts, sharePost, copyToClipboard } from '@/utils/communityUtils';
import { mockPosts } from '@/data/posts';

const CommunityView = () => {
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>(mockPosts);

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
    
    if (!postToShare) return;
    
    const shareableLink = sharePost(postToShare);
    
    // Try to use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: postToShare.itinerary 
          ? `Itinéraire de ${postToShare.itinerary.origin} à ${postToShare.itinerary.destination}`
          : "Publication partagée",
        text: postToShare.question || "Découvrez cette publication sur Fach Nmchi",
        url: shareableLink,
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard(shareableLink);
      });
    } else {
      // Fallback to clipboard
      copyToClipboard(shareableLink);
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

  const handlePinPost = (postId: string) => {
    // In a real app, this would be controlled by time and permissions
    const postToBePinned = posts.find(post => post.id === postId);
    
    if (postToBePinned?.isPinned) {
      toast({
        description: "Le post n'est plus épinglé.",
      });
    } else {
      toast({
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

  return (
    <div className="container py-4 max-w-3xl mx-auto relative z-10">
      <div className="absolute -z-10 top-0 left-0 right-0 h-64 bg-gradient-to-br from-fach-purple/30 to-fach-blue/30 blur-3xl opacity-70 animate-pulse-slow rounded-full"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-fach-purple to-fach-blue-ocean">Communauté</h2>
        <Button 
          onClick={() => setOpenPostDialog(true)}
          className="bg-fach-purple hover:bg-fach-purple-tertiary transition-all duration-300 hover:scale-105 shadow-lg shadow-fach-purple/20"
        >
          <MessageCircle size={18} className="mr-2 animate-pulse-slow" /> Poser une question
        </Button>
      </div>

      <CommunitySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Tabs defaultValue="recent" className="mb-6">
        <TabsList className="mb-4 bg-gradient-to-r from-fach-purple/20 to-fach-blue/20 shadow-md">
          <TabsTrigger 
            value="recent" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fach-purple data-[state=active]:to-fach-purple-tertiary data-[state=active]:text-white transition-all duration-300 data-[state=active]:shadow-md"
          >
            Récent
          </TabsTrigger>
          <TabsTrigger 
            value="popular"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fach-blue data-[state=active]:to-fach-blue-ocean data-[state=active]:text-white transition-all duration-300 data-[state=active]:shadow-md"
          >
            Populaire
          </TabsTrigger>
        </TabsList>
        
        <div className="relative">
          <div className="absolute -z-10 top-20 right-10 w-32 h-32 bg-fach-blue/10 rounded-full blur-2xl"></div>
          <div className="absolute -z-10 bottom-10 left-10 w-40 h-40 bg-fach-purple/10 rounded-full blur-2xl"></div>
          
          <TabsContent value="recent" className="animate-fade-in">
            <PostList 
              posts={filteredRecentPosts} 
              onLikePost={handleLikePost} 
              onSharePost={handleSharePost} 
              onPinPost={handlePinPost} 
            />
          </TabsContent>
          
          <TabsContent value="popular" className="animate-fade-in">
            <PostList 
              posts={filteredPopularPosts} 
              onLikePost={handleLikePost} 
              onSharePost={handleSharePost} 
              onPinPost={handlePinPost} 
            />
          </TabsContent>
        </div>
      </Tabs>
      
      <PostQuestion open={openPostDialog} onOpenChange={setOpenPostDialog} />
    </div>
  );
};

export default CommunityView;
