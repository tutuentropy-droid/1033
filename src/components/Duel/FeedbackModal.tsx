import { X, CheckCircle, XCircle, ArrowRight, Home, Info, Award, Sparkles, Link, Link2Off, Trophy, Dices, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import ParchmentCard from '@/components/shared/ParchmentCard';
import TypewriterText from '@/components/shared/TypewriterText';
import type { FeedbackState, Philosopher, Question, FollowUpQuestion, Badge, EasterEgg, DiceResult } from '@/types';

interface FeedbackModalProps {
  feedback: FeedbackState;
  philosopher: Philosopher;
  question: Question | FollowUpQuestion | null;
  onNext: () => void;
  onBack: () => void;
  hasMoreQuestions: boolean;
  onUnlockEasterEgg?: () => void;
}

const getRarityLabel = (rarity: Badge['rarity']) => {
  switch (rarity) {
    case 'legendary': return { text: '传说', color: 'text-orange-500', bg: 'bg-gradient-to-r from-yellow-100 to-orange-100 border-orange-300' };
    case 'rare': return { text: '稀有', color: 'text-purple-500', bg: 'bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-300' };
    default: return { text: '普通', color: 'text-gray-500', bg: 'bg-gray-100 border-gray-300' };
  }
};

const diceFaces: Record<DiceResult, string> = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅',
};

const getDiceToneStyle = (tone: string) => {
  switch (tone) {
    case 'ecstasy':
      return {
        bg: 'bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100',
        border: 'border-yellow-500',
        text: 'text-yellow-800',
        glow: 'shadow-lg shadow-yellow-500/30',
      };
    case 'joy':
      return {
        bg: 'bg-gradient-to-r from-green-100 to-emerald-100',
        border: 'border-green-500',
        text: 'text-green-800',
        glow: 'shadow-md shadow-green-500/20',
      };
    case 'suffering':
      return {
        bg: 'bg-gradient-to-r from-orange-100 to-amber-100',
        border: 'border-orange-500',
        text: 'text-orange-800',
        glow: 'shadow-md shadow-orange-500/20',
      };
    case 'agony':
      return {
        bg: 'bg-gradient-to-r from-red-100 via-rose-100 to-pink-100',
        border: 'border-red-500',
        text: 'text-red-800',
        glow: 'shadow-lg shadow-red-500/30',
      };
    default:
      return {
        bg: 'bg-parchment-100',
        border: 'border-tavern-gold/50',
        text: 'text-tavern-wood',
        glow: '',
      };
  }
};

export default function FeedbackModal({ 
  feedback, 
  philosopher, 
  question,
  onNext, 
  onBack,
  hasMoreQuestions,
  onUnlockEasterEgg,
}: FeedbackModalProps) {
  if (!feedback.show) return null;

  const chainState = feedback.chainState;
  const isChainQuestion = chainState?.isChainQuestion;
  const isChainContinuing = isChainQuestion && !chainState?.chainBroken && !chainState?.chainCompleted && chainState?.chainDepth < (chainState?.chainTotal || 0);
  const isChainBroken = chainState?.chainBroken;
  const isChainCompleted = chainState?.chainCompleted;

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
            {isChainQuestion && (
              <div className={cn(
                'w-full mb-4 p-3 rounded-lg flex items-center justify-between border',
                isChainCompleted ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400' :
                isChainBroken ? 'bg-gradient-to-r from-red-100 to-rose-100 border-red-400' :
                'bg-gradient-to-r from-green-100 to-emerald-100 border-green-400'
              )}>
                <div className="flex items-center gap-2">
                  {isChainCompleted ? <Trophy size={18} className="text-yellow-600" /> :
                   isChainBroken ? <Link2Off size={18} className="text-red-600" /> :
                   <Link size={18} className="text-green-600" />}
                  <span className={cn(
                    'font-display text-sm',
                    isChainCompleted ? 'text-yellow-700' :
                    isChainBroken ? 'text-red-700' :
                    'text-green-700'
                  )}>
                    {isChainCompleted ? '追问链完成！' :
                     isChainBroken ? '追问链断裂' :
                     `助产术追问链 ${chainState?.chainDepth}/${chainState?.chainTotal}`}
                  </span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: chainState?.chainTotal || 0 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-2.5 h-2.5 rounded-full transition-all',
                        isChainBroken && i < (chainState?.chainDepth || 0) ? 'bg-green-500' :
                        isChainBroken && i === (chainState?.chainDepth || 0) - 0 ? 'bg-red-500' :
                        isChainCompleted ? 'bg-yellow-500' :
                        i < (chainState?.chainDepth || 0) ? 'bg-green-500' :
                        'bg-gray-300'
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            {feedback.diceState && (
              <div className={cn(
                'w-full mb-4 p-4 rounded-xl border-2 flex items-center justify-between',
                getDiceToneStyle(feedback.diceState.tone).bg,
                getDiceToneStyle(feedback.diceState.tone).border,
                getDiceToneStyle(feedback.diceState.tone).glow
              )}>
                <div className="flex items-center gap-3">
                  <Dices size={20} className={getDiceToneStyle(feedback.diceState.tone).text} />
                  <div>
                    <div className={cn('font-display text-sm', getDiceToneStyle(feedback.diceState.tone).text)}>
                      永恒轮回骰子
                    </div>
                    {feedback.diceState.isEternalRecurrence && (
                      <div className="text-xs text-yellow-700 font-bold animate-pulse">
                        ✨ 永恒轮回！无论对错都算正确，双倍分数！
                      </div>
                    )}
                    {feedback.diceState.isHalfScore && (
                      <div className="text-xs text-red-700 font-bold">
                        💀 深渊凝视... 即使答对也只有一半分数
                      </div>
                    )}
                    {!feedback.diceState.isEternalRecurrence && !feedback.diceState.isHalfScore && (
                      <div className={cn('text-xs', getDiceToneStyle(feedback.diceState.tone).text + '/70')}>
                        命运之骰已落下
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-5xl">
                  {diceFaces[feedback.diceState.result]}
                </div>
              </div>
            )}

            {feedback.badgeUnlocked && (
              <div className="w-full mb-4 p-4 rounded-xl bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 border-2 border-yellow-400 shadow-lg shadow-yellow-200/50 animate-pulse">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-5xl drop-shadow-lg">{feedback.badgeUnlocked.icon}</div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="text-yellow-600" size={20} />
                      <span className="font-display text-xl text-yellow-800">
                        {feedback.badgeUnlocked.name}
                      </span>
                      <span className={cn(
                        'text-xs px-2 py-0.5 rounded-full border',
                        getRarityLabel(feedback.badgeUnlocked.rarity).bg,
                        getRarityLabel(feedback.badgeUnlocked.rarity).color
                      )}>
                        {getRarityLabel(feedback.badgeUnlocked.rarity).text}
                      </span>
                    </div>
                    <p className="text-sm text-yellow-900/70 font-serif max-w-xs">
                      {feedback.badgeUnlocked.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

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
              {isChainCompleted ? '🎉 追问链完美通关！' :
               isChainBroken ? '💔 追问链中断' :
               feedback.isCorrect ? '答对了！' : '答错了...'}
            </h3>

            <div className="flex items-center justify-center gap-3 mb-4">
              {feedback.scoreChange !== 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-tavern-wood font-serif">得分：</span>
                  <span className={cn(
                    'font-bold text-lg',
                    feedback.scoreChange > 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {feedback.scoreChange > 0 ? '+' : ''}{feedback.scoreChange}
                  </span>
                </div>
              )}
              {feedback.scoreChange === 0 && isChainContinuing && (
                <div className="text-green-600 font-serif text-sm flex items-center gap-1">
                  <Sparkles size={14} />
                  继续深入思考，全对才能得分
                </div>
              )}
            </div>

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
                feedback.affectionChange > 0 ? 'text-green-600' : 
                feedback.affectionChange < 0 ? 'text-red-600' : 'text-gray-500'
              )}>
                {feedback.affectionChange > 0 ? '+' : ''}{feedback.affectionChange}
                {feedback.affectionChange === 0 && ' 0'}
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

            {feedback.easterEggAvailable && onUnlockEasterEgg && (
              <button
                onClick={onUnlockEasterEgg}
                className="w-full mb-4 py-3 px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white rounded-lg font-display text-lg hover:from-purple-700 hover:via-indigo-700 hover:to-violet-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-purple-500/30 animate-pulse"
              >
                <Sparkles size={20} />
                ✨ 解锁历史对话彩蛋：{feedback.easterEggAvailable.title}
              </button>
            )}

            <div className="flex gap-3 w-full">
              <button
                onClick={onBack}
                className="btn-parchment flex-1 flex items-center justify-center gap-2"
              >
                <Home size={18} />
                返回酒馆
              </button>
              {isChainContinuing && (
                <button
                  onClick={onNext}
                  className="btn-gold flex-1 flex items-center justify-center gap-2"
                >
                  继续追问
                  <ArrowRight size={18} />
                </button>
              )}
              {!isChainContinuing && hasMoreQuestions && (
                <button
                  onClick={onNext}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2',
                    isChainCompleted 
                      ? 'py-3 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-display hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg shadow-yellow-500/30'
                      : 'btn-gold'
                  )}
                >
                  {isChainCompleted ? '🎉 继续挑战' : '继续挑战'}
                  <ArrowRight size={18} />
                </button>
              )}
              {!isChainContinuing && !hasMoreQuestions && (
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
