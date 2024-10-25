import { useSpring, animated } from '@react-spring/web';
import { Wine } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const Bottle = () => {
  const { spinDegrees, isSpinning } = useGameStore();
  
  const styles = useSpring({
    to: { transform: `rotate(${spinDegrees}deg)` },
    config: { tension: 120, friction: isSpinning ? 10 : 50 },
  });

  return (
    <animated.div 
      style={styles}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Wine 
        size={64} 
        className="text-emerald-600 transform -rotate-90"
      />
    </animated.div>
  );
};