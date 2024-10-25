export interface Player {
  id: string;
  name: string;
  avatar: string;
}

export interface Prompt {
  id: string;
  type: 'truth' | 'dare' | 'confession' | 'drama' | 'comedy' | 'friendship';
  content: string;
}

export interface GameState {
  players: Player[];
  currentPlayer: Player | null;
  selectedPrompt: Prompt | null;
  isSpinning: boolean;
  spinDegrees: number;
}