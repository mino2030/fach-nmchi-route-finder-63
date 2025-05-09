
import React from 'react';
import { Post } from '@/types/community';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onLikePost: (postId: string) => void;
  onSharePost: (postId: string) => void;
  onPinPost: (postId: string) => void;
}

const PostList = ({ posts, onLikePost, onSharePost, onPinPost }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucun résultat trouvé
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <PostCard 
          key={post.id}
          post={post} 
          onLike={onLikePost} 
          onShare={onSharePost} 
          onPin={onPinPost} 
        />
      ))}
    </div>
  );
};

export default PostList;
