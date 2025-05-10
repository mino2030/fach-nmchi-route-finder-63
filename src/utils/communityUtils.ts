
import { Post } from '@/types/community';
import { toast } from "@/components/ui/sonner";

export const sortPosts = (postsToSort: Post[]) => {
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

export const sharePost = (post: Post): string => {
  // If the post has an itinerary, create a shareable link
  if (post?.itinerary) {
    const { origin, destination, routeId } = post.itinerary;
    let shareableLink = `${window.location.origin}/itinerary?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    
    // If there's a specific routeId, add it to the link
    if (routeId) {
      shareableLink += `&routeId=${routeId}`;
    }
    
    return shareableLink;
  } else {
    // Share just the post without itinerary
    return `${window.location.origin}/community/post/${post.id}`;
  }
};

// Modified to use direct toast import instead of passing useToast() return value
export const copyToClipboard = (text: string, options: { toast?: any } = {}) => {
  navigator.clipboard.writeText(text).then(() => {
    toast("Le lien a été copié dans votre presse-papiers.");
  }).catch(() => {
    toast("Impossible de copier le lien dans votre presse-papiers.");
  });
};
