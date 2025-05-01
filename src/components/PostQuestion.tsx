
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface PostQuestionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostQuestion: React.FC<PostQuestionProps> = ({ open, onOpenChange }) => {
  const [question, setQuestion] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir votre question",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would submit to an API
    toast({
      title: "Question publiée!",
      description: "Votre question a été publiée avec succès.",
    });
    
    // Reset form
    setQuestion('');
    setDetails('');
    setLocation('');
    setTags('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setQuestion('');
    setDetails('');
    setLocation('');
    setTags('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Poser une question à la communauté</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">
              Votre question*
            </label>
            <Input
              id="question"
              placeholder="Ex: Comment aller à Morocco Mall depuis Casa Port?"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="details" className="text-sm font-medium">
              Détails (facultatif)
            </label>
            <Textarea
              id="details"
              placeholder="Ajoutez plus d'informations pour aider la communauté à vous répondre..."
              value={details}
              onChange={e => setDetails(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Lieu concerné (facultatif)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="location"
                placeholder="Ex: Morocco Mall, Université Hassan II..."
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags (facultatif)
            </label>
            <Input
              id="tags"
              placeholder="Ex: transport, travaux, université (séparés par des virgules)"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </div>
          
          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="bg-fach-purple hover:bg-fach-purple-tertiary"
            >
              Publier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostQuestion;
