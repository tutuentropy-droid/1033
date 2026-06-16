import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Option } from '@/types';

interface OptionCardProps {
  option: Option;
  onClick: () => void;
  disabled: boolean;
  selected: boolean;
  showResult: boolean;
  index: number;
  isBeauvoirMode?: boolean;
  showOtherPerspective?: boolean;
  onShowOtherPerspective?: () => void;
  isFrenchMode?: boolean;
}

export default function OptionCard({ 
  option, 
  onClick, 
  disabled, 
  selected,
  showResult,
  index,
  isBeauvoirMode = false,
  showOtherPerspective = false,
  onShowOtherPerspective,
  isFrenchMode = false,
}: OptionCardProps) {
  const getCardClass = () => {
    if (!showResult) {
      return cn(
        'option-card',
        selected && 'selected',
        disabled && 'opacity-50 cursor-not-allowed',
        showOtherPerspective && 'ring-2 ring-pink-400/50 border-pink-400'
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
  
  const displayText = isFrenchMode && option.frenchText 
    ? option.frenchText 
    : option.text;

  const handleGazeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShowOtherPerspective && !disabled) {
      onShowOtherPerspective();
    }
  };

  return (
    <div className="relative group">
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
            {displayText}
          </p>
        </div>

        {showOtherPerspective && (
          <div className="mt-3 pt-3 border-t border-pink-200">
            <div className="flex items-start gap-2">
              <Eye size={16} className="text-pink-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-pink-600 font-display mb-1">他者视角</p>
                <p className="text-sm text-pink-700 font-serif italic">
                  {option.philosopherId === 'beauvoir' 
                    ? '这是从第二性视角出发的回应——质疑被给定的角色，揭示社会规训的力量。' 
                    : '从他者的位置看，这个选项代表了' + getPhilosopherLabel(option.philosopherId) + '的视角——但要警惕：谁在定义"正确"？'}
                </p>
              </div>
            </div>
          </div>
        )}
      </button>

      {isBeauvoirMode && !showResult && (
        <button
          onClick={handleGazeClick}
          disabled={disabled}
          className={cn(
            "absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "flex items-center gap-1 px-2 py-1 rounded-lg",
            "bg-pink-500/90 text-white text-xs font-display",
            "hover:bg-pink-600 hover:scale-105 transition-all",
            "shadow-lg shadow-pink-500/30",
            disabled && "cursor-not-allowed opacity-50"
          )}
          title="查看他者视角（会增加凝视值）"
        >
          {showOtherPerspective ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>他者视角</span>
        </button>
      )}
    </div>
  );
}

function getPhilosopherLabel(id: string): string {
  const labels: Record<string, string> = {
    socrates: '苏格拉底式追问',
    nietzsche: '尼采式超人哲学',
    beauvoir: '波伏娃式第二性视角',
  };
  return labels[id] || '另一种哲学';
}
