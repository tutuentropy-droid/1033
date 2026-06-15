import { X, CheckCircle, XCircle, ArrowRight, Home, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import ParchmentCard from '@/components/shared/ParchmentCard';
import TypewriterText from '@/components/shared/TypewriterText';
import type { FeedbackState, Philosopher, Question } from '@/types';

interface FeedbackModalProps {
  feedback: FeedbackState;
  philosopher: Philosopher;
  question: Question | null;
  onNext: () => void;
  onBack: () => void;
  hasMoreQuestions: boolean;
}

export default function FeedbackModal({ 
  feedback, 
  philosopher, 
  question,
  onNext, 
  onBack,
  hasMoreQuestions 
}: FeedbackModalProps) {
  if (!feedback.show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onNext}
      />
      
      <div className="relative z-10 w-full max-w-lg animate-bounce-in">
        <ParchmentCard className="p-6 md:p-8 relative">
          <button 
            onClick={onNext}
            className="absolute top-4 right-4 text-tavern-wood/50 hover:text-tavern-wood transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div 
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center mb-4',
                feedback.isCorrect 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              )}
            >
              {feedback.isCorrect ? (
                <CheckCircle size={32} />
              ) : (
                <XCircle size={32} />
              )}
            </div>

            <h3 
              className="font-display text-2xl mb-2"
              style={{ color: philosopher.color }}
            >
              {feedback.isCorrect ? '答对了！' : '答错了...'}
            </h3>

            <div className="flex items-center gap-4 mb-4">
              <img 
                src={philosopher.avatar} 
                alt={philosopher.name}
                className="w-16 h-16 rounded-full border-2 border-tavern-gold object-cover"
              />
              <div 
                className={cn(
                  'speech-bubble text-left',
                  feedback.isCorrect ? 'animate-bounce-in' : 'animate-shake'
                )}
              >
                <TypewriterText 
                  text={feedback.message}
                  speed={30}
                  className="text-tavern-ink font-serif"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-tavern-wood font-serif">好感度：</span>
              <span className={cn(
                'font-bold text-lg',
                feedback.affectionChange > 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {feedback.affectionChange > 0 ? '+' : ''}{feedback.affectionChange}
              </span>
            </div>

            {question && (
              <div className="w-full bg-parchment-200/50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={16} className="text-tavern-gold" />
                  <span className="text-sm font-semibold text-tavern-wood">
                    哲学解析
                  </span>
                </div>
                <p className="text-sm text-tavern-ink/80 font-serif">
                  {question.explanation}
                </p>
              </div>
            )}

            <div className="flex gap-3 w-full">
              <button
                onClick={onBack}
                className="btn-parchment flex-1 flex items-center justify-center gap-2"
              >
                <Home size={18} />
                返回酒馆
              </button>
              {hasMoreQuestions && (
                <button
                  onClick={onNext}
                  className="btn-gold flex-1 flex items-center justify-center gap-2"
                >
                  继续挑战
                  <ArrowRight size={18} />
                </button>
              )}
              {!hasMoreQuestions && (
                <button
                  onClick={onBack}
                  className="btn-gold flex-1 flex items-center justify-center gap-2"
                >
                  <Home size={18} />
                  全部完成！
                </button>
              )}
            </div>
          </div>
        </ParchmentCard>
      </div>
    </div>
  );
}
