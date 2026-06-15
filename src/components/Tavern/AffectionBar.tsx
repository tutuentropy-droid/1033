import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PhilosopherId } from '@/types';
import { AFFECTION_LEVELS } from '@/types';
import { useGameStore } from '@/store/useGameStore';

interface AffectionBarProps {
  philosopherId: PhilosopherId;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const colorMap: Record<PhilosopherId, string> = {
  socrates: 'bg-socrates',
  nietzsche: 'bg-nietzsche',
  beauvoir: 'bg-beauvoir',
};

export default function AffectionBar({ 
  philosopherId, 
  showLabel = true,
  size = 'md' 
}: AffectionBarProps) {
  const { affection, getAffectionLevel } = useGameStore();
  const value = affection[philosopherId];
  const level = getAffectionLevel(philosopherId);
  const levelInfo = AFFECTION_LEVELS[level];

  const sizeStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const heartSize = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <Heart 
            size={heartSize[size]} 
            className={cn(
              value > 50 ? 'fill-red-500 text-red-500' : 'text-red-400'
            )} 
          />
          <span className={cn(
            'font-serif text-tavern-ink',
            size === 'sm' ? 'text-xs' : 'text-sm'
          )}>
            {value}
          </span>
        </div>
        {showLabel && (
          <span className="flex items-center gap-1 text-sm font-serif text-tavern-wood">
            <span>{levelInfo.emoji}</span>
            <span>{levelInfo.label}</span>
          </span>
        )}
      </div>
      <div className={cn('affection-bar', sizeStyles[size])}>
        <div 
          className={colorMap[philosopherId]}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
