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
    id: "1",
    title: "Neon Racer 2049",
    creator: "CyberSoft",
    url: "https://v6p9d9t4.rocketcdn.me/wp-content/uploads/2019/06/breakout-game-html5.jpg", // Placeholder URL that won't actually play but represents the idea
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
  },
  {
    id: "3",
    title: "Geometry Dash Clone",
    creator: "IndieDev99",
    url: "about:blank",
    thumbnail: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
    category: ["Platformer", "Rhythm"],
    description: "Jump and fly your way through danger in this rhythm-based action platformer."
  },
  {
    id: "4",
    title: "Pixel Quest",
    creator: "RetroMasters",
    url: "about:blank",
    thumbnail: "https://images.unsplash.com/photo-1642479753763-02d291980833?w=800&q=80",
    category: ["RPG", "Adventure"],
    description: "A classic 8-bit adventure in a dangerous dungeon."
  },
  {
    id: "5",
    title: "Bubble Pop Legends",
    creator: "CasualKing",
    url: "about:blank",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80",
    category: ["Puzzle", "Casual"],
    description: "Match 3 or more bubbles to pop them."
  },
  {
    id: "6",
    title: "Cyber Chess",
    creator: "BrainGames",
    url: "about:blank",
    thumbnail: "https://images.unsplash.com/photo-1529699213352-73f9b726b9b6?w=800&q=80",
    category: ["Strategy", "Board"],
    description: "Classic chess with a futuristic twist."
  }
];

export function getRandomGame(excludeId?: string): Game {
  const filtered = excludeId ? MOCK_GAMES.filter(g => g.id !== excludeId) : MOCK_GAMES;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
