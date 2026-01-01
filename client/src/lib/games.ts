export interface Game {
  id: string;
  title: string;
  creator: string;
  url: string;
  thumbnail: string;
  category: string[];
  description: string;
}

export const MOCK_GAMES: Game[] = [
  {
    id: "clicker",
    title: "Neon Clicker",
    creator: "ArcadeRoulette",
    url: "/games/clicker.html",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    category: ["Arcade", "Casual"],
    description: "A simple clicker game demonstrating progress saving."
  },
  {
    id: "jump",
    title: "Cyber Jump",
    creator: "ArcadeRoulette",
    url: "/games/jump.html",
    thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
    category: ["Action", "Platformer"],
    description: "A retro-style runner demonstrating high-score persistence."
  },
  {
    id: "1",
    title: "Neon Racer 2049",
    creator: "CyberSoft",
    url: "about:blank",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    category: ["Racing", "Arcade"],
    description: "High speed racing in a futuristic cyberpunk city."
  },
  {
    id: "2",
    title: "Space Defender",
    creator: "PixelLabs",
    url: "about:blank",
    thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
    category: ["Shooter", "Space"],
    description: "Defend your station from incoming asteroids and alien ships."
  }
];

export function getRandomGame(excludeId?: string): Game {
  const filtered = excludeId ? MOCK_GAMES.filter(g => g.id !== excludeId) : MOCK_GAMES;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
