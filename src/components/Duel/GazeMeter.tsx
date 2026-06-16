import { Eye, AlertTriangle } from 'lucide-react';
import { GAZE_THRESHOLD, MAX_GAZE_VALUE } from '@/types';
import { cn } from '@/lib/utils';

interface GazeMeterProps {
  gazeValue: number;
}

export default function GazeMeter({ gazeValue }: GazeMeterProps) {
  const isHigh = gazeValue >= GAZE_THRESHOLD;
  const percentage = (gazeValue / MAX_GAZE_VALUE) * 100;

  return (
    <div className="parchment-card p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-pink-700 font-display">
          <Eye size={16} />
          <span className="text-sm">凝视值</span>
        </div>
        <div className="flex items-center gap-1">
          {isHigh && (
            <AlertTriangle size={14} className="text-red-500 animate-pulse" />
          )}
          <span className={cn(
            "text-sm font-bold",
            isHigh ? "text-red-600" : "text-pink-700"
          )}>
            {Math.round(gazeValue)}
          </span>
        </div>
      </div>
      
      <div className="h-2.5 bg-pink-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            isHigh 
              ? "bg-gradient-to-r from-pink-500 to-red-500" 
              : "bg-gradient-to-r from-pink-400 to-pink-600"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between mt-1 text-xs text-pink-400 font-serif">
        <span>安全</span>
        <span className={isHigh ? "text-red-500 font-bold" : ""}>
          阈值 {GAZE_THRESHOLD}
        </span>
        <span>危险</span>
      </div>

      {isHigh && (
        <div className="mt-2 p-2 bg-red-50 rounded border border-red-200 text-xs text-red-600 font-serif text-center">
          ⚠️ 凝视值过高！下一题将切换为法语模式
        </div>
      )}
    </div>
  );
}
