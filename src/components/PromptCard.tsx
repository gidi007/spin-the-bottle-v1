import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Heart, Theater, Laugh, Users, MessageCircleQuestion } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import type { Prompt } from '../types';

const PROMPT_ICONS = {
  truth: MessageCircleQuestion,
  dare: MessageCircleQuestion,
  confession: Heart,
  drama: Theater,
  comedy: Laugh,
  friendship: Users,
};

export const PromptCard = ({ prompt }: { prompt: Prompt }) => {
  const [isHovered, setHovered] = useState(false);
  const Icon = PROMPT_ICONS[prompt.type];
  
  const spring = useSpring({
    scale: isHovered ? 1.05 : 1,
    shadow: isHovered ? 15 : 5,
  });

  return (
    <animated.div
      style={{
        ...spring,
        boxShadow: spring.shadow.to(s => `0 ${s}px ${s * 2}px rgba(0,0,0,0.1)`),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-lg p-6 cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="text-emerald-600" />
        <h3 className="font-semibold capitalize">{prompt.type}</h3>
      </div>
      <p className="text-gray-600">{prompt.content}</p>
    </animated.div>
  );
};