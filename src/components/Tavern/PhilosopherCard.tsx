import { useState } from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Philosopher } from '@/types';
import AffectionBar from './AffectionBar';

interface PhilosopherCardProps {
  philosopher: Philosopher;
  onSelect: (philosopher: Philosopher) => void;
}

export default function PhilosopherCard({ philosopher, onSelect }: PhilosopherCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const borderColorMap = {
    socrates: 'hover:border-socrates',
    nietzsche: 'hover:border-nietzsche',
    beauvoir: 'hover:border-beauvoir',
  };

  const bgGlowMap = {
    socrates: 'hover:shadow-socrates/20',
    nietzsche: 'hover:shadow-nietzsche/20',
    beauvoir: 'hover:shadow-beauvoir/20',
  };

  return (
    <div
      className={cn(
        'parchment-card p-6 cursor-pointer transition-all duration-500',
        'border-2 border-parchment-400',
        borderColorMap[philosopher.id],
        bgGlowMap[philosopher.id],
        'hover:shadow-2xl hover:-translate-y-2',
        'flex flex-col items-center text-center',
        isHovered ? 'animate-float' : ''
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(philosopher)}
    >
      <div className="relative mb-4">
        <div 
          className="absolute inset-0 rounded-full blur-md opacity-50"
          style={{ backgroundColor: philosopher.color }}
        />
        <img
          src={philosopher.avatar}
          alt={philosopher.name}
          className={cn(
            'philosopher-avatar relative z-10 w-28 h-28 md:w-32 md:h-32 object-cover',
            isHovered ? 'scale-110' : ''
          )}
        />
        <div 
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg z-20"
          style={{ backgroundColor: philosopher.color }}
        >
          <Sparkles size={14} />
        </div>
      </div>

      <h3 className="font-display text-2xl text-tavern-wood mb-1">
        {philosopher.name}
      </h3>
      
      <p 
        className="text-sm font-semibold mb-3"
        style={{ color: philosopher.color }}
      >
        「{philosopher.coreIdea}」
      </p>

      <div className="w-full mb-4">
        <AffectionBar philosopherId={philosopher.id} size="sm" />
      </div>

      {isHovered && (
        <div className="speech-bubble mt-2 animate-bounce-in max-w-full">
          <div className="flex items-start gap-2">
            <Quote size={16} className="text-tavern-gold flex-shrink-0 mt-1" />
            <p className="text-sm italic text-tavern-ink text-left">
              {philosopher.quote}
            </p>
          </div>
        </div>
      )}

      <p className="text-xs text-tavern-wood/70 mt-4 font-serif">
        点击开始对决
      </p>
    </div>
  );
}
