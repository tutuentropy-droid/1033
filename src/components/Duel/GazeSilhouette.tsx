import { GAZE_THRESHOLD, MAX_GAZE_VALUE } from '@/types';
import { cn } from '@/lib/utils';

interface GazeSilhouetteProps {
  gazeValue: number;
  isFrenchMode: boolean;
}

export default function GazeSilhouette({ gazeValue, isFrenchMode }: GazeSilhouetteProps) {
  const gazeIntensity = gazeValue / MAX_GAZE_VALUE;
  const blurAmount = Math.max(2, 12 - gazeIntensity * 10);
  const opacity = 0.2 + gazeIntensity * 0.6;

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <div className="relative">
        <svg
          width="180"
          height="320"
          viewBox="0 0 180 320"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `blur(${blurAmount}px)`,
            opacity,
          }}
        >
          <defs>
            <linearGradient id="silhouetteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C2185B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#880E4F" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          <ellipse cx="90" cy="55" rx="38" ry="42" fill="url(#silhouetteGradient)" />
          
          <path
            d="M52 95 Q45 110 42 140 Q38 180 50 220 Q58 260 70 290 L75 320 L105 320 L110 290 Q122 260 130 220 Q142 180 138 140 Q135 110 128 95 Q115 85 90 82 Q65 85 52 95 Z"
            fill="url(#silhouetteGradient)"
          />
          
          <path
            d="M55 60 Q40 70 35 95 Q30 120 38 145 Q42 160 50 165"
            stroke="url(#silhouetteGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M125 60 Q140 70 145 95 Q150 120 142 145 Q138 160 130 165"
            stroke="url(#silhouetteGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {isFrenchMode && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-pink-200 font-display text-sm opacity-80 animate-pulse">
              « Mode Français »
            </div>
            <div className="text-pink-300/60 font-serif text-xs mt-1">
              他者的凝视
            </div>
          </div>
        )}

        {gazeValue >= GAZE_THRESHOLD && (
          <div className="absolute -left-4 top-1/3 w-2 h-2 rounded-full bg-pink-400 animate-ping" />
        )}
      </div>

      {gazeIntensity > 0.3 && (
        <div 
          className={cn(
            "absolute -left-16 top-1/2 -translate-y-1/2 transition-all duration-500",
            gazeValue >= GAZE_THRESHOLD && "animate-pulse"
          )}
        >
          <div className="text-pink-300/40 text-4xl">
            👁️
          </div>
        </div>
      )}
    </div>
  );
}
