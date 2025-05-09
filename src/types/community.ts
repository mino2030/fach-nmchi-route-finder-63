
export interface Post {
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
