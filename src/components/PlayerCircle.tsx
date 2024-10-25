import { useGameStore } from '../store/gameStore';

export const PlayerCircle = () => {
  const { players, currentPlayer } = useGameStore();
  const totalPlayers = players.length;
  
  return (
    <div className="relative w-[600px] h-[600px]">
      {players.map((player, index) => {
        const angle = (index * 360) / totalPlayers;
        const radians = (angle * Math.PI) / 180;
        const x = 300 + 250 * Math.cos(radians);
        const y = 300 + 250 * Math.sin(radians);
        
        return (
          <div
            key={player.id}
            style={{ left: x, top: y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300
              ${currentPlayer?.id === player.id ? 'scale-110 ring-4 ring-emerald-400' : 'scale-100'}`}
          >
            <img
              src={player.avatar}
              alt={player.name}
              className="w-16 h-16 rounded-full object-cover shadow-lg"
            />
            <p className="text-center mt-2 font-medium text-sm text-emerald-800">{player.name}</p>
          </div>
        );
      })}
    </div>
  );
};