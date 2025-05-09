
import { useState } from 'react';
import { MessageCircle, Search, User, Send, Route, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: string;
  senderAvatar?: string;
  time: string;
  isMe: boolean;
  itinerary?: {
    origin: string;
    destination: string;
    routeId?: string;
  };
}

interface Conversation {
  id: string;
  user: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
}

const MessagesView = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      user: 'Sarah Amir',
      avatar: '',
      lastMessage: 'Merci pour l\'info sur le tram!',
      time: '10:45',
      unread: 2,
    },
    {
      id: '2',
      user: 'Karim Benani',
      avatar: '',
      lastMessage: 'Je suis au carrefour, où es-tu exactement?',
      time: 'Hier',
      unread: 0,
    },
    {
      id: '3',
      user: 'Leila Tazi',
      avatar: '',
      lastMessage: 'Le bus 33 est en retard aujourd\'hui',
      time: 'Lun',
      unread: 0,
    },
  ];

  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1-1',
        content: 'Bonjour! Est-ce que tu sais si le tram fonctionne aujourd\'hui?',
        sender: 'Sarah Amir',
        time: '10:30',
        isMe: false,
      },
      {
        id: '1-2',
        content: 'Oui, le tram fonctionne normalement, mais il y a un petit retard sur la ligne T1.',
        sender: 'Moi',
        time: '10:35',
        isMe: true,
      },
      {
        id: '1-3',
        content: 'Merci pour l\'info sur le tram!',
        sender: 'Sarah Amir',
        time: '10:45',
        isMe: false,
      },
    ],
    '2': [
      {
        id: '2-1',
        content: 'Je suis près de la station Casa Voyageurs, tu arrives quand?',
        sender: 'Moi',
        time: '15:20',
        isMe: true,
      },
      {
        id: '2-2',
        content: 'Je suis au carrefour, où es-tu exactement?',
        sender: 'Karim Benani',
        time: '15:25',
        isMe: false,
      },
      {
        id: '2-3',
        content: 'Voici un itinéraire depuis Casa Voyageurs',
        sender: 'Moi',
        time: '15:30',
        isMe: true,
        itinerary: {
          origin: 'Casa Voyageurs',
          destination: 'Maarif',
          routeId: '1'
        }
      },
    ],
    '3': [
      {
        id: '3-1',
        content: 'Le bus 33 est en retard aujourd\'hui',
        sender: 'Leila Tazi',
        time: 'Lun 14:05',
        isMe: false,
      },
      {
        id: '3-2',
        content: 'Voici un autre itinéraire que tu peux prendre:',
        sender: 'Moi',
        time: 'Lun 14:10',
        isMe: true,
        itinerary: {
          origin: 'Ain Diab',
          destination: 'Centre Ville',
          routeId: '4'
        }
      },
    ],
  };

  const filteredConversations = searchQuery
    ? conversations.filter(conv => conv.user.toLowerCase().includes(searchQuery.toLowerCase()))
    : conversations;

  const handleShareItinerary = (msg: Message) => {
    if (!msg.itinerary) return;
    
    const { origin, destination, routeId } = msg.itinerary;
    let shareableLink = `${window.location.origin}/itinerary?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    
    if (routeId) {
      shareableLink += `&routeId=${routeId}`;
    }
    
    // Try to use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: `Itinéraire de ${origin} à ${destination}`,
        text: `Consultez cet itinéraire de ${origin} à ${destination}`,
        url: shareableLink,
      }).catch(() => {
        // Fallback to clipboard
        copyToClipboard(shareableLink);
      });
    } else {
      // Fallback to clipboard
      copyToClipboard(shareableLink);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Lien copié",
        description: "L'itinéraire a été copié dans votre presse-papiers",
      });
    }).catch(() => {
      toast({
        title: "Erreur",
        description: "Impossible de copier l'itinéraire",
      });
    });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !activeChat) return;
    
    // In a real app, this would send the message to an API
    console.log('Sending message:', inputMessage);
    
    // Reset input
    setInputMessage('');
  };

  const renderChatList = () => (
    <div className="space-y-2">
      {filteredConversations.map(conv => (
        <Card
          key={conv.id}
          className={`p-3 cursor-pointer hover:bg-muted/50 ${activeChat === conv.id ? 'bg-muted/70' : ''}`}
          onClick={() => setActiveChat(conv.id)}
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={conv.avatar} />
              <AvatarFallback>{conv.user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{conv.user}</h3>
                <span className="text-xs text-muted-foreground">{conv.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
            </div>
            {conv.unread > 0 && (
              <div className="bg-fach-purple text-white rounded-full min-w-5 h-5 flex items-center justify-center text-xs">
                {conv.unread}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderChatWindow = () => {
    if (!activeChat) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground">
          <MessageCircle size={48} className="mb-4" />
          <h3 className="text-lg font-medium">Sélectionnez une conversation</h3>
          <p className="text-sm">Choisissez un chat dans la liste pour commencer à discuter</p>
        </div>
      );
    }

    const currentMessages = messages[activeChat] || [];
    const currentConversation = conversations.find(c => c.id === activeChat);

    return (
      <div className="flex flex-col h-full">
        {/* Chat header */}
        <div className="border-b p-3 flex items-center gap-3">
          <Avatar>
            <AvatarImage src={currentConversation?.avatar} />
            <AvatarFallback>{currentConversation?.user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{currentConversation?.user}</h3>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isMe
                    ? 'bg-fach-purple text-white rounded-br-none'
                    : 'bg-muted rounded-bl-none'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                
                {message.itinerary && (
                  <div className={`mt-2 p-2 rounded flex flex-col gap-1 ${
                    message.isMe ? 'bg-fach-purple-tertiary' : 'bg-white/50'
                  }`}>
                    <div className="text-xs font-medium flex items-center gap-1">
                      <Route size={12} /> Itinéraire partagé:
                    </div>
                    <div className="text-xs">
                      De: {message.itinerary.origin}
                    </div>
                    <div className="text-xs">
                      À: {message.itinerary.destination}
                    </div>
                    <Button
                      size="sm"
                      variant={message.isMe ? "secondary" : "outline"}
                      className="mt-1 text-xs py-0.5 h-6"
                      onClick={() => handleShareItinerary(message)}
                    >
                      <Share size={12} className="mr-1" /> Partager
                    </Button>
                  </div>
                )}
                
                <div className={`text-xs ${message.isMe ? 'text-white/70' : 'text-muted-foreground'} text-right mt-1`}>
                  {message.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="border-t p-3 flex gap-2">
          <Input
            placeholder="Écrivez un message..."
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="flex-1"
          />
          <Button
            className="bg-fach-purple hover:bg-fach-purple-tertiary"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-4 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>
      
      <Tabs defaultValue="chats">
        <TabsList className="mb-4">
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chats" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Rechercher des conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 h-[70vh]">
            <div className="md:col-span-1 border rounded-lg overflow-hidden">
              <div className="p-3 border-b">
                <h3 className="font-semibold">Messages récents</h3>
              </div>
              <div className="overflow-y-auto p-2 h-[calc(70vh-60px)]">
                {renderChatList()}
              </div>
            </div>
            <div className="md:col-span-2 border rounded-lg overflow-hidden">
              {renderChatWindow()}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="contacts">
          <div className="p-8 text-center text-muted-foreground">
            <User size={48} className="mx-auto mb-4" />
            <h3 className="text-lg font-medium">Contacts</h3>
            <p className="text-sm">Cette fonctionnalité sera disponible bientôt</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessagesView;
