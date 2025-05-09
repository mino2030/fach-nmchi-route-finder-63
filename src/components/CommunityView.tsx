
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

      <CommunitySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Tabs defaultValue="recent" className="mb-6">
        <TabsList className="mb-2">
          <TabsTrigger value="recent">Récent</TabsTrigger>
          <TabsTrigger value="popular">Populaire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <PostList 
            posts={filteredRecentPosts} 
            onLikePost={handleLikePost} 
            onSharePost={handleSharePost} 
            onPinPost={handlePinPost} 
          />
        </TabsContent>
        
        <TabsContent value="popular">
          <PostList 
            posts={filteredPopularPosts} 
            onLikePost={handleLikePost} 
            onSharePost={handleSharePost} 
            onPinPost={handlePinPost} 
          />
        </TabsContent>
      </Tabs>
      
      <PostQuestion open={openPostDialog} onOpenChange={setOpenPostDialog} />
    </div>
  );
};

export default CommunityView;
