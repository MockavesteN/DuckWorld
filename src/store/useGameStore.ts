import { create } from 'zustand';

interface GameState {
  currentScene: string;                 // 'worldMap' | 'house' | …
  unlockedAreas: string[];              // ['pond', 'farm', …]
  completedMiniGames: string[];         // ['memoryGame', …]
  starsPerMiniGame: Record<string, number>; // e.g., { memoryGame: 3 }
  goToScene: (scene: string) => void;
}

const useGameStore = create<GameState>((set) => ({
  currentScene: 'worldMap',
  unlockedAreas: [],
  completedMiniGames: [],
  starsPerMiniGame: {},
  goToScene: (scene) => set({ currentScene: scene }),
}));

export default useGameStore;