import { cn } from '@/lib/utils';
import type { Option } from '@/types';

interface OptionCardProps {
  option: Option;
  onClick: () => void;
  disabled: boolean;
  selected: boolean;
  showResult: boolean;
  index: number;
}

export default function OptionCard({ 
  option, 
  onClick, 
  disabled, 
  selected,
  showResult,
  index 
}: OptionCardProps) {
  const getCardClass = () => {
    if (!showResult) {
      return cn(
        'option-card',
        selected && 'selected',
        disabled && 'opacity-50 cursor-not-allowed'
      );
    }
    
    if (option.isCorrect) {
      return 'option-card correct';
    }
    
    if (selected && !option.isCorrect) {
      return 'option-card wrong';
    }
    
    return 'option-card opacity-50';
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <button
      className={getCardClass()}
      onClick={onClick}
      disabled={disabled}
      style={{ 
        animationDelay: `${index * 150}ms`,
        opacity: showResult ? (option.isCorrect || selected ? 1 : 0.5) : 1
      }}
    >
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-tavern-gold/20 text-tavern-gold font-bold flex items-center justify-center text-lg">
          {optionLabels[index]}
        </span>
        <p className="text-left text-tavern-ink font-serif leading-relaxed flex-1">
          {option.text}
        </p>
      </div>
    </button>
  );
}
