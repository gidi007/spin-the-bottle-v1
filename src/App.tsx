import { useEffect } from 'react';
import { Bottle } from './components/Bottle';
import { PlayerCircle } from './components/PlayerCircle';
import { PromptCard } from './components/PromptCard';
import { useGameStore } from './store/gameStore';
import type { Player, Prompt } from './types';

const SAMPLE_PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Alex',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: '2',
    name: 'Jordan',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
  },
  {
    id: '3',
    name: 'Sam',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
  {
    id: '4',
    name: 'Taylor',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
];

const SAMPLE_PROMPTS: Prompt[] = [
  {
    id: '1',
    type: 'truth',
    content: 'What is the most embarrassing song on your playlist?',
  },
  { id: '2', type: 'dare', content: 'Do your best impression of a celebrity' },
  { id: '3', type: 'confession', content: 'Share your secret talent' },
  {
    id: '4',
    type: 'drama',
    content: 'Act out a dramatic scene from your favorite movie',
  },
  { id: '5', type: 'comedy', content: 'Tell your best dad joke' },
];

function App() {
  const {
    players,
    isSpinning,
    setSpinning,
    setSpinDegrees,
    setCurrentPlayer,
    addPlayer,
  } = useGameStore();

  // Make sure addPlayer is a dependency in useEffect to avoid lint errors
  useEffect(() => {
    SAMPLE_PLAYERS.forEach((player) => addPlayer(player));
  }, [addPlayer]);

  const spinBottle = () => {
    if (isSpinning) return;

    setSpinning(true);

    const spins = 5 + Math.random() * 5; // Random spins between 5 and 10
    const extraDegrees = Math.random() * 360; // Extra random degrees after full spins
    const totalDegrees = spins * 360 + extraDegrees;

    setSpinDegrees(totalDegrees);

    // Calculate the winning player index based on the extra degrees
    setTimeout(() => {
      const winningIndex =
        Math.floor((extraDegrees / 360) * players.length) % players.length;
      setCurrentPlayer(players[winningIndex]);
      setSpinning(false);
    }, 3000); // Simulate a 3-second spin
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">
            Spin the Bottle
          </h1>
          <p className="text-emerald-600">Love, Laughter, and Drama!</p>
        </div>

        <div className="relative aspect-square max-w-[800px] mx-auto mb-8">
          <PlayerCircle />
          <Bottle />

          <button
            onClick={spinBottle}
            disabled={isSpinning}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
              px-6 py-3 rounded-full font-semibold text-white shadow-lg
              transition-all duration-300
              ${
                isSpinning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-xl'
              }`}
          >
            {isSpinning ? 'Spinning...' : 'Spin!'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_PROMPTS.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
