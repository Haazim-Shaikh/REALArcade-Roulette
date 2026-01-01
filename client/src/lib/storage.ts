import { Game } from "./games";

const SAVED_GAMES_KEY = "arcade_roulette_saved";

export function getSavedGames(): string[] {
  try {
    const saved = localStorage.getItem(SAVED_GAMES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function saveGame(gameId: string) {
  const saved = getSavedGames();
  if (!saved.includes(gameId)) {
    localStorage.setItem(SAVED_GAMES_KEY, JSON.stringify([...saved, gameId]));
  }
}

export function removeGame(gameId: string) {
  const saved = getSavedGames();
  localStorage.setItem(SAVED_GAMES_KEY, JSON.stringify(saved.filter(id => id !== gameId)));
}

export function isGameSaved(gameId: string): boolean {
  return getSavedGames().includes(gameId);
}
