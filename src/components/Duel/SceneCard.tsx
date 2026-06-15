import { useState, useEffect } from 'react';
import { Scroll, Layers } from 'lucide-react';
import ParchmentCard from '@/components/shared/ParchmentCard';
import TypewriterText from '@/components/shared/TypewriterText';
import type { Question, FollowUpQuestion } from '@/types';
import { cn } from '@/lib/utils';

interface SceneCardProps {
  question: Question | FollowUpQuestion;
  philosopherName: string;
  philosopherColor: string;
  chainDepth?: number;
  chainTotal?: number;
  isFollowUp?: boolean;
}

export default function SceneCard({ question, philosopherName, philosopherColor, chainDepth, chainTotal, isFollowUp }: SceneCardProps) {
  const [showScene, setShowScene] = useState(false);
  const [isUnfolding, setIsUnfolding] = useState(true);

  useEffect(() => {
    setIsUnfolding(true);
    setShowScene(false);
    const timer = setTimeout(() => {
      setShowScene(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [question.id]);

  const handleTypewriterComplete = () => {
    setIsUnfolding(false);
  };

  return (
    <div className="relative">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
        <div 
          className={cn(
            'wax-seal',
            isFollowUp && 'ring-4 ring-green-400/50 animate-pulse'
          )}
          style={{ backgroundColor: philosopherColor }}
        >
          <Scroll size={28} />
        </div>
      </div>

      {isFollowUp && chainDepth && chainTotal && (
        <div className="absolute -top-2 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-xs font-display shadow-lg border border-green-400">
          <Layers size={14} />
          <span>追问 Lv.{chainDepth} / {chainTotal}</span>
        </div>
      )}

      <ParchmentCard 
        variant="scroll" 
        className={cn(
          'pt-12 pb-10 px-8 relative origin-top',
          isUnfolding ? 'animate-scroll-unfold' : '',
          isFollowUp ? 'ring-2 ring-green-500/40 shadow-green-500/10 shadow-xl' : ''
        )}
      >
        <div className="text-center mb-4">
          <span 
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: philosopherColor }}
          >
            {philosopherName} {isFollowUp ? '的追问' : '的质问'}
          </span>
        </div>

        {isFollowUp && chainDepth && chainTotal && (
          <div className="mb-4 flex items-center justify-center gap-2">
            {Array.from({ length: chainTotal }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  i < chainDepth
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 scale-110 shadow-lg shadow-green-500/40'
                    : 'bg-green-900/30'
                )}
              />
            ))}
          </div>
        )}

        <div className="mb-6">
          <p className="text-sm text-tavern-wood/70 mb-2 font-serif">
            {isFollowUp ? '深入追问：' : '场景：'}
          </p>
          {showScene && (
            <p className="text-lg md:text-xl text-tavern-ink font-serif leading-relaxed">
              <TypewriterText 
                text={question.scene} 
                speed={isFollowUp ? 30 : 40}
                onComplete={handleTypewriterComplete}
              />
            </p>
          )}
        </div>

        <div className="border-t-2 border-parchment-300 pt-4">
          <p className="text-tavern-wood font-serif text-center italic">
            {isFollowUp 
              ? `此时，${philosopherName} 继续追问道...`
              : `此时，${philosopherName} 开口说道...`
            }
          </p>
        </div>
      </ParchmentCard>
    </div>
  );
}
