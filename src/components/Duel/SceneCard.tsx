import { useState, useEffect } from 'react';
import { Scroll } from 'lucide-react';
import ParchmentCard from '@/components/shared/ParchmentCard';
import TypewriterText from '@/components/shared/TypewriterText';
import type { Question } from '@/types';

interface SceneCardProps {
  question: Question;
  philosopherName: string;
  philosopherColor: string;
}

export default function SceneCard({ question, philosopherName, philosopherColor }: SceneCardProps) {
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
          className="wax-seal"
          style={{ backgroundColor: philosopherColor }}
        >
          <Scroll size={28} />
        </div>
      </div>

      <ParchmentCard 
        variant="scroll" 
        className={`pt-12 pb-10 px-8 relative origin-top ${isUnfolding ? 'animate-scroll-unfold' : ''}`}
      >
        <div className="text-center mb-4">
          <span 
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: philosopherColor }}
          >
            {philosopherName} 的质问
          </span>
        </div>

        <div className="mb-6">
          <p className="text-sm text-tavern-wood/70 mb-2 font-serif">
            场景：
          </p>
          {showScene && (
            <p className="text-lg md:text-xl text-tavern-ink font-serif leading-relaxed">
              <TypewriterText 
                text={question.scene} 
                speed={40}
                onComplete={handleTypewriterComplete}
              />
            </p>
          )}
        </div>

        <div className="border-t-2 border-parchment-300 pt-4">
          <p className="text-tavern-wood font-serif text-center italic">
            此时，{philosopherName} 开口说道...
          </p>
        </div>
      </ParchmentCard>
    </div>
  );
}
