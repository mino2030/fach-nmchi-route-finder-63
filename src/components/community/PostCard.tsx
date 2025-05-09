
import React from 'react';
import { MessageCircle, MapPin, Share, Pin, Flag, Route } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Post } from '@/types/community';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onShare: (postId: string) => void;
  onPin: (postId: string) => void;
}

const PostCard = ({ post, onLike, onShare, onPin }: PostCardProps) => {
  return (
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
              onClick={() => onLike(post.id)}
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
                    onClick={() => onShare(post.id)}
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
                    onClick={() => onPin(post.id)}
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
};

export default PostCard;
