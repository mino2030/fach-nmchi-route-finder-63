
import { Post } from '@/types/community';

export const mockPosts: Post[] = [
  {
    id: '1',
    question: "Comment aller à l'Université Hassan II depuis Sidi Bernoussi ce matin avec les travaux?",
    details: "Je dois être là-bas avant 9h et je vois qu'il y a des travaux sur la route principale. Une alternative?",
    location: "Université Hassan II",
    author: "Youssef M.",
    authorAvatar: "",
    time: "Il y a 15 min",
    answers: 3,
    tags: ['université', 'travaux'],
    isPinned: false,
    likes: 5,
    itinerary: {
      origin: "Sidi Bernoussi",
      destination: "Université Hassan II"
    }
  },
  {
    id: '2',
    question: "Quel est le meilleur moyen d'aller à Morocco Mall depuis Casa Port? Bus ou Taxi?",
    details: "Je cherche l'option la plus économique mais aussi assez rapide pour ce weekend.",
    location: "Morocco Mall",
    author: "Leila T.",
    authorAvatar: "",
    time: "Il y a 45 min",
    answers: 5,
    tags: ['mall', 'transport'],
    isPinned: false,
    likes: 12,
    itinerary: {
      origin: "Casa Port",
      destination: "Morocco Mall"
    }
  },
  {
    id: '3',
    question: "Est-ce que le tram T1 est fonctionnel aujourd'hui? J'ai entendu qu'il y avait une panne.",
    details: "Quelqu'un sait si la panne a été réparée? Je dois prendre le tram dans une heure.",
    author: "Hamid K.",
    authorAvatar: "",
    time: "Il y a 1h",
    answers: 7,
    tags: ['tram', 'panne'],
    isPinned: true,
    pinnedUntil: "11:45",
    likes: 18,
    isLiked: true,
  },
  {
    id: '4',
    question: "Comment éviter les embouteillages pour aller à l'aéroport demain matin?",
    details: "Mon vol est à 10h, je pars de Ain Diab. Quelles routes sont les moins congestionnées vers 7h?",
    location: "Aéroport Mohammed V",
    author: "Sara L.",
    authorAvatar: "",
    time: "Il y a 2h",
    answers: 4,
    tags: ['aéroport', 'embouteillage'],
    isPinned: false,
    likes: 7,
  },
  {
    id: '5',
    question: "Quel est l'impact du marathon ce weekend sur la circulation au centre-ville?",
    details: "Je dois aller au centre-ville dimanche matin. Quelles routes seront fermées pour le marathon?",
    location: "Centre-ville",
    author: "Mohammed A.",
    authorAvatar: "",
    time: "Il y a 5h",
    answers: 12,
    tags: ['événement', 'marathon'],
    isPinned: true,
    pinnedUntil: "Demain",
    likes: 25,
    isLiked: true,
  }
];
