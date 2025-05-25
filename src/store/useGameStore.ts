import create from 'zustand';

interface GameState {
  currentScene: string;
  unlockedAreas: string[];
  completedMiniGames: string[];
  starsPerMiniGame: Record<string, number>;
  goToScene: (scene: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial state
  currentScene: 'worldMap', // Start at the world map
  unlockedAreas: ['house'], // Start with house unlocked, assuming pond and farm are locked initially
  completedMiniGames: [],
  starsPerMiniGame: {},

  // Actions
  goToScene: (scene: string) => set({ currentScene: scene }),

  // TODO: Add actions for completing mini-games, unlocking areas, awarding stars
}));
//

  currentScene: string;                         // 'worldMap' | 'house' | …
  unlockedAreas: string[];                      // ['pond', 'farm', …]
  completedMiniGames: string[];                 // ['memoryGame', …]
  starsPerMiniGame: Record<string, number>; // e.g., { memoryGame: 3 }

  currentScene: 'worldMap',
  unlockedAreas: ['house', 'pond', 'farm'], // Assuming all unlocked initially
  goToScene: (scene) => set({ currentScene: scene }),

  unlockedAreas: [],
  goToScene: (scene) => set(() => ({ currentScene: scene })),

import { create } from 'zustand';

// Define the possible scenes in the game
export type Scene = 'worldMap' | 'house' | 'pond' | 'farm' | 'memoryGame' | 'numberGame'; // Added mini-game scenes

// Define the state structure
  currentScene: Scene;
  completedMiniGames: string[]; // Array to store names of completed mini-games
  starsPerMiniGame: { [gameName: string]: number }; // Object to store stars earned per mini-game
  goToScene: (scene: Scene) => void;
  completeMiniGame: (gameName: string, stars: number) => void; // New action signature for completing mini-games

// Create the Zustand store

  // Action to change the current scene

  // New action to complete a mini-game and record stars
  completeMiniGame: (gameName, stars) =>
    set((state) => {
      // Add gameName to completedMiniGames if not already present
      const updatedCompletedMiniGames = state.completedMiniGames.includes(gameName)
        ? state.completedMiniGames
        : [...state.completedMiniGames, gameName];

      // Update stars for the gameName
      // Overwriting existing stars for simplicity as per instruction
      const updatedStarsPerMiniGame = {
        ...state.starsPerMiniGame,
        [gameName]: stars,
      };

      return {
        completedMiniGames: updatedCompletedMiniGames,
        starsPerMiniGame: updatedStarsPerMiniGame,
    }),

// Define the state interface
  starsPerMiniGame: { [key: string]: number };
  completeMiniGame: (gameName: string, stars: number) => void;

// Create the store
  completedMiniGames: [], // Added to track completed mini-games
  starsPerMiniGame: {}, // Added to track stars per mini-game

  // Action to mark a mini-game as completed and record stars

      // Update stars for the game (overwriting existing stars as instructed for simplicity)

type GameScene = 'worldMap' | 'memoryGame' | 'numberPopGame'; // Add more scenes as needed

  currentScene: GameScene;
  goToScene: (scene: GameScene) => void;
  completeMiniGame: (gameName: string, stars: number) => void; // New action signature

        [gameName]: stars, // Overwrite or set stars for the game
