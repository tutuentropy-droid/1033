import { Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionTimerProps {
  timeLeft: number;
  totalTime: number;
  isFrenchMode: boolean;
}

export default function QuestionTimer({ timeLeft, totalTime, isFrenchMode }: QuestionTimerProps) {
  const percentage = (timeLeft / totalTime) * 100;
  const isUrgent = timeLeft <= 10;
  const isCritical = timeLeft <= 5;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="parchment-card p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-tavern-wood font-display">
          <Clock size={16} className={cn(
            isCritical && "animate-pulse text-red-500",
            isUrgent && !isCritical && "text-orange-500"
          )} />
          <span className="text-sm">
            {isFrenchMode ? 'Temps restant' : '剩余时间'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isCritical && (
            <AlertCircle size={14} className="text-red-500 animate-pulse" />
          )}
          <span className={cn(
            "text-lg font-bold font-mono",
            isCritical ? "text-red-600 animate-pulse" : 
            isUrgent ? "text-orange-600" : 
            "text-tavern-wood"
          )}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      <div className="h-2.5 bg-parchment-300 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-linear",
            isCritical 
              ? "bg-gradient-to-r from-red-500 to-red-600" 
              : isUrgent 
                ? "bg-gradient-to-r from-orange-400 to-orange-500"
                : isFrenchMode
                  ? "bg-gradient-to-r from-pink-400 to-pink-600"
                  : "bg-gradient-to-r from-green-400 to-emerald-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isFrenchMode && (
        <div className="mt-2 text-center">
          <span className="text-xs text-pink-600 font-serif italic">
            « Le regard de l'Autre »
          </span>
        </div>
      )}
    </div>
  );
}
