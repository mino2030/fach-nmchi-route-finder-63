
import React, { useState } from 'react';
import { MessageCircle, Images, Paintbrush } from 'lucide-react';
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
      toast("Le post n'est plus épinglé.");
    } else {
      toast("Le post sera épinglé pendant 10 minutes.");
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
    <div className="container py-6 max-w-3xl mx-auto relative z-10">
      {/* Enhanced decorative background elements */}
      <div className="absolute -z-10 top-0 left-0 right-0 h-64 bg-gradient-to-br from-fach-purple/40 to-fach-blue/40 blur-3xl opacity-80 animate-pulse-slow rounded-full"></div>
      <div className="absolute -z-10 top-40 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-fach-purple-light/30 to-fach-blue-soft/30 blur-3xl animate-float"></div>
      <div className="absolute -z-10 bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-tl from-fach-blue-bright/20 to-fach-purple-vivid/20 blur-3xl animate-float"></div>
      
      {/* Illustration elements */}
      <div className="absolute -z-10 top-40 right-4 opacity-10 rotate-12">
        <Images className="w-24 h-24 text-fach-purple-vivid" />
      </div>
      <div className="absolute -z-10 bottom-20 left-4 opacity-10 -rotate-12">
        <Paintbrush className="w-20 h-20 text-fach-blue-ocean" />
      </div>
      
      <div className="glass-effect p-6 rounded-2xl mb-8 shadow-lg shadow-fach-purple/10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fach-purple-vivid to-fach-blue-ocean animate-fade-in">Communauté</h2>
          <Button 
            onClick={() => setOpenPostDialog(true)}
            className="bg-gradient-to-r from-fach-purple to-fach-purple-tertiary hover:from-fach-purple-vivid hover:to-fach-purple-secondary transition-all duration-300 hover:scale-105 shadow-lg shadow-fach-purple/20"
          >
            <MessageCircle size={18} className="mr-2 animate-pulse-slow" /> Poser une question
          </Button>
        </div>

        <CommunitySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <Tabs defaultValue="recent" className="mb-6">
        <TabsList className="mb-6 bg-gradient-to-r from-fach-purple/20 to-fach-blue/20 shadow-md rounded-xl p-1 w-full">
          <TabsTrigger 
            value="recent" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fach-purple data-[state=active]:to-fach-purple-tertiary data-[state=active]:text-white transition-all duration-300 data-[state=active]:shadow-lg rounded-lg py-3 flex-1"
          >
            Récent
          </TabsTrigger>
          <TabsTrigger 
            value="popular"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-fach-blue data-[state=active]:to-fach-blue-ocean data-[state=active]:text-white transition-all duration-300 data-[state=active]:shadow-lg rounded-lg py-3 flex-1"
          >
            Populaire
          </TabsTrigger>
        </TabsList>
        
        <div className="relative">
          <div className="absolute -z-10 top-20 right-10 w-32 h-32 bg-fach-blue/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute -z-10 bottom-10 left-10 w-40 h-40 bg-fach-purple/10 rounded-full blur-2xl animate-pulse-slow"></div>
          
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
