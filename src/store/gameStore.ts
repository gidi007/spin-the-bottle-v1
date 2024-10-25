import { create } from 'zustand';
import type { GameState, Player, Prompt } from '../types';

interface GameStore extends GameState {
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  setCurrentPlayer: (player: Player | null) => void;
  setSelectedPrompt: (prompt: Prompt | null) => void;
  setSpinning: (isSpinning: boolean) => void;
  setSpinDegrees: (degrees: number) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  players: [],
  currentPlayer: null,
  selectedPrompt: null,
  isSpinning: false,
  spinDegrees: 0,
  
  addPlayer: (player) => set((state) => ({ 
    players: [...state.players, player] 
  })),
  
  removePlayer: (playerId) => set((state) => ({ 
    players: state.players.filter(p => p.id !== playerId) 
  })),
  
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setSelectedPrompt: (prompt) => set({ selectedPrompt: prompt }),
  setSpinning: (isSpinning) => set({ isSpinning }),
  setSpinDegrees: (spinDegrees) => set({ spinDegrees }),
}));