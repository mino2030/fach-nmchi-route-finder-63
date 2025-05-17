
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, Bot, User, MapPin, Hotel, Activity, Coffee } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const welcomeMessages = [
  "Bonjour et bienvenue à Casablanca ! Je suis votre guide virtuel. Comment puis-je vous aider aujourd'hui ?",
  "Je peux vous recommander des lieux à visiter, où manger, ou vous aider à naviguer dans la ville."
];

const suggestedQuestions = [
  "Quels sont les meilleurs endroits à visiter à Casablanca ?",
  "Où puis-je trouver de la bonne cuisine marocaine ?",
  "Comment me déplacer dans la ville ?",
  "Quels sont les hôtels les mieux notés ?",
  "Y a-t-il des événements spéciaux aujourd'hui ?"
];

const quickRecommendations = [
  { 
    type: "attraction", 
    name: "Mosquée Hassan II", 
    description: "Chef-d'œuvre architectural au bord de l'océan",
    icon: <MapPin className="h-4 w-4 text-blue-500" />
  },
  { 
    type: "restaurant", 
    name: "La Sqala", 
    description: "Cuisine marocaine authentique dans un cadre charmant",
    icon: <Coffee className="h-4 w-4 text-amber-600" />
  },
  { 
    type: "hotel", 
    name: "Four Seasons Casablanca", 
    description: "Hôtel de luxe avec vue sur l'océan",
    icon: <Hotel className="h-4 w-4 text-purple-600" />
  },
  { 
    type: "activity", 
    name: "Promenade de la Corniche", 
    description: "Belle promenade le long de l'océan Atlantique",
    icon: <Activity className="h-4 w-4 text-green-600" />
  }
];

// Mock responses
const botResponses: Record<string, string> = {
  'default': "Je ne suis pas sûr de comprendre votre question. Pourriez-vous reformuler ?",
  'meilleurs endroits': "Casablanca offre de nombreux sites à visiter. Je vous recommande la Mosquée Hassan II, l'ancienne médina, le quartier des Habous, et la place Mohammed V. La Corniche est également un lieu agréable pour se promener au bord de l'océan.",
  'cuisine marocaine': "Pour de la cuisine marocaine authentique, je vous conseille les restaurants 'La Sqala', 'Al Mounia' ou 'Basmane'. Vous pourrez y déguster de délicieux tajines, couscous et pastillas. Les patisseries marocaines sont également un must !",
  'déplacer': "Pour vous déplacer à Casablanca, vous avez plusieurs options : les taxis rouges sont économiques pour les courts trajets, le tramway est moderne et dessert de nombreux quartiers, et pour plus de confort, vous pouvez utiliser des applications de transport comme Careem.",
  'hôtels': "Les hôtels les mieux notés à Casablanca incluent le Four Seasons, le Hyatt Regency, le Sofitel Casablanca et le Kenzi Tower. Pour un budget plus modeste, l'hôtel Moroccan House et l'hôtel Suisse sont de bonnes options.",
  'événements': "Je vais vérifier les événements du jour à Casablanca. Généralement, vous pouvez trouver des expositions au Villa des Arts, des spectacles au théâtre Mohammed V, ou des concerts dans divers lieux de la ville."
};

const matchResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerQuery.includes(key)) {
      return response;
    }
  }
  
  // Check for specific keywords
  if (lowerQuery.includes('mosquée') || lowerQuery.includes('hassan')) {
    return "La Mosquée Hassan II est l'une des plus grandes mosquées du monde et un chef-d'œuvre architectural. Elle est ouverte aux visites pour les non-musulmans à certaines heures. Je vous recommande de prendre un guide pour mieux apprécier son histoire et son architecture.";
  }
  
  if (lowerQuery.includes('plage') || lowerQuery.includes('océan') || lowerQuery.includes('mer')) {
    return "Casablanca offre plusieurs plages. La plus populaire est Ain Diab, le long de la Corniche. Plus au nord, vous trouverez des plages plus tranquilles comme Dar Bouazza ou Tamaris.";
  }
  
  return botResponses.default;
};

const getReplyDelay = (message: string): number => {
  // Longer messages take longer to "type"
  return Math.min(700 + message.length * 10, 3000);
};

const ChatbotView = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('chat');
  
  useEffect(() => {
    // Initial welcome messages
    const initialMessages: Message[] = welcomeMessages.map((content, index) => ({
      id: `welcome-${index}`,
      content,
      sender: 'bot',
      timestamp: new Date(Date.now() + index * 500) // Stagger timestamps
    }));
    
    // Add messages with a slight delay between them
    let delay = 500;
    initialMessages.forEach((message) => {
      setTimeout(() => {
        setMessages(prev => [...prev, message]);
      }, delay);
      delay += 1000;
    });
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate bot typing and reply
    const response = matchResponse(inputMessage);
    const replyDelay = getReplyDelay(response);
    
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, replyDelay);
  };
  
  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    // Optional: auto-send after a short delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          toast({
            title: "Position partagée",
            description: `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`
          });
          
          // Add a message about the location
          const locationMessage: Message = {
            id: `bot-location-${Date.now()}`,
            content: `J'ai reçu votre position. Je peux maintenant vous donner des recommandations personnalisées pour les lieux autour de vous à Casablanca.`,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, locationMessage]);
        },
        error => {
          toast({
            title: "Erreur",
            description: "Impossible d'accéder à votre localisation.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Non supporté",
        description: "La géolocalisation n'est pas supportée par votre navigateur.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-full bg-fach-blue p-2">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Guide Touristique IA</h2>
            <p className="text-muted-foreground">Votre assistant personnel pour explorer Casablanca</p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Recommandations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat">
            <Card className="mb-4">
              <div className="h-[60vh] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`flex gap-3 max-w-[80%] ${
                          message.sender === 'user' 
                            ? 'flex-row-reverse' 
                            : ''
                        }`}
                      >
                        <div 
                          className={`rounded-full p-2 shrink-0 ${
                            message.sender === 'user' 
                              ? 'bg-fach-purple' 
                              : 'bg-fach-blue'
                          }`}
                        >
                          {message.sender === 'user' ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div 
                          className={`p-3 rounded-lg ${
                            message.sender === 'user' 
                              ? 'bg-fach-purple text-white' 
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Intl.DateTimeFormat('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            }).format(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex gap-1">
                          <span className="animate-bounce">•</span>
                          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>•</span>
                          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>•</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input 
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Posez une question sur Casablanca..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-fach-blue hover:bg-fach-blue-ocean"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={shareLocation}
                      title="Partager ma position"
                    >
                      <MapPin className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-2">Questions suggérées:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => handleQuickQuestion(question)}
                        >
                          {question}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickRecommendations.map((rec, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-3 items-start">
                    <div className="rounded-full bg-muted p-2">
                      {rec.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{rec.name}</h3>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                        Voir plus
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Card className="p-4 md:col-span-2">
                <h3 className="font-medium mb-2">Explorer plus d'endroits?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Posez des questions à notre guide IA pour découvrir les meilleurs endroits à Casablanca selon vos préférences.
                </p>
                <Button 
                  onClick={() => setActiveTab('chat')}
                  className="bg-fach-blue hover:bg-fach-blue-ocean"
                >
                  Discuter avec le guide
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChatbotView;
