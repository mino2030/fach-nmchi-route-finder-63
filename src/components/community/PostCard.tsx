
import React from 'react';
import { MessageCircle, MapPin, Share, Pin, Flag, Route, Star } from 'lucide-react';
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
      className={`p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        post.isPinned 
          ? 'border-fach-purple border-2 bg-gradient-to-br from-white to-fach-purple-light/10 dark:from-gray-800 dark:to-fach-purple/20' 
          : 'bg-white dark:bg-card hover:bg-gradient-to-br hover:from-white hover:to-fach-blue-soft/10 dark:hover:from-gray-800 dark:hover:to-fach-blue/20'
      }`}
    >
      <div className="space-y-4">
        {post.isPinned && (
          <div className="flex items-center gap-1 text-transparent bg-clip-text bg-gradient-to-r from-fach-purple to-fach-purple-vivid text-sm font-medium animate-pulse-slow">
            <Pin size={14} className="text-fach-purple" />
            <span>Épinglé jusqu'à {post.pinnedUntil}</span>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-fach-purple/20">
            <AvatarImage src={post.authorAvatar} />
            <AvatarFallback className="bg-gradient-to-br from-fach-purple/80 to-fach-blue/80 text-white">
              {post.author[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{post.author}</div>
            <div className="text-xs text-muted-foreground">{post.time}</div>
          </div>
          {post.likes > 5 && (
            <div className="bg-gradient-to-r from-fach-purple-light/20 to-fach-blue-soft/20 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
              <Star size={12} className="text-fach-purple-vivid" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fach-purple to-fach-blue-ocean font-medium">{post.likes} avis</span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-semibold text-lg">{post.question}</h3>
          {post.details && (
            <p className="text-sm text-muted-foreground mt-2">{post.details}</p>
          )}
        </div>
        
        {post.location && (
          <div className="flex items-center gap-2 text-sm text-fach-blue">
            <div className="p-1 rounded-full bg-fach-blue-soft/30">
              <MapPin size={14} />
            </div>
            <span>{post.location}</span>
          </div>
        )}
        
        {post.itinerary && (
          <div className="flex items-center gap-2 text-sm text-fach-purple">
            <div className="p-1 rounded-full bg-fach-purple-light/30">
              <Route size={14} />
            </div>
            <span>Itinéraire: {post.itinerary.origin} → {post.itinerary.destination}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {post.tags && post.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-gradient-to-r from-fach-purple-light/10 to-fach-blue-soft/10 px-3 py-1 rounded-full text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-fach-purple to-fach-blue-ocean hover:from-fach-purple-vivid hover:to-fach-blue-bright transition-all cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-fach-purple/5 text-sm">
          <div className="flex items-center gap-5">
            <button 
              className={`flex items-center gap-2 ${
                post.isLiked 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-fach-purple to-fach-purple-vivid' 
                  : 'text-muted-foreground'
              } hover:text-fach-purple transition-colors duration-200`} 
              onClick={() => onLike(post.id)}
            >
              <Flag 
                size={16} 
                className={post.isLiked 
                  ? 'text-fach-purple-vivid fill-fach-purple/20' 
                  : ''
                } 
              />
              <span>{post.likes}</span>
            </button>
            
            <button className="flex items-center gap-2 text-muted-foreground hover:text-fach-blue-bright transition-colors duration-200">
              <MessageCircle size={16} />
              <span>{post.answers} réponse{post.answers !== 1 ? 's' : ''}</span>
            </button>
          </div>
          
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={`p-1.5 rounded-full hover:bg-fach-blue-soft/20 transition-colors ${post.isShared ? 'text-fach-blue bg-fach-blue-soft/10' : 'text-muted-foreground'}`}
                    onClick={() => onShare(post.id)}
                  >
                    <Share size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gradient-to-r from-fach-blue/90 to-fach-blue-ocean/90 text-white border-none">
                  <p>{post.itinerary ? "Partager l'itinéraire" : "Partager la publication"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={`p-1.5 rounded-full hover:bg-fach-purple-light/20 transition-colors ${post.isPinned ? 'text-fach-purple bg-fach-purple-light/10' : 'text-muted-foreground'}`}
                    onClick={() => onPin(post.id)}
                  >
                    <Pin size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gradient-to-r from-fach-purple/90 to-fach-purple-tertiary/90 text-white border-none">
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
