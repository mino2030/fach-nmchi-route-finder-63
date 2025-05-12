
import React from 'react';
import { Post } from '@/types/community';
import PostCard from './PostCard';
import { MessageCircle } from 'lucide-react';

interface PostListProps {
  posts: Post[];
  onLikePost: (postId: string) => void;
  onSharePost: (postId: string) => void;
  onPinPost: (postId: string) => void;
}

const PostList = ({ posts, onLikePost, onSharePost, onPinPost }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 glass-effect rounded-xl">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fach-purple-light/30 to-fach-blue-soft/30 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-fach-purple to-fach-blue-ocean">Aucun résultat trouvé</h3>
        <p className="text-muted-foreground">Essayez d'autres termes de recherche</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {posts.map((post, index) => (
        <div 
          key={post.id} 
          className="animate-slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <PostCard 
            post={post} 
            onLike={onLikePost} 
            onShare={onSharePost} 
            onPin={onPinPost} 
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
