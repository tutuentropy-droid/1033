import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Award, Sparkles } from 'lucide-react';
import TavernBackground from '@/components/Tavern/TavernBackground';
import AffectionBar from '@/components/Tavern/AffectionBar';
import SceneCard from '@/components/Duel/SceneCard';
import OptionCard from '@/components/Duel/OptionCard';
import FeedbackModal from '@/components/Duel/FeedbackModal';
import ParchmentCard from '@/components/shared/ParchmentCard';
import SocratesDeathEasterEgg from '@/components/Duel/SocratesDeathEasterEgg';
import BadgeUnlockModal from '@/components/Duel/BadgeUnlockModal';
import { getPhilosopherById } from '@/data/philosophers';
import { useGameStore } from '@/store/useGameStore';
import { getQuestionsByPhilosopher } from '@/data/questions';
import { cn } from '@/lib/utils';

export default function Duel() {
  const { philosopherId } = useParams<{ philosopherId: string }>();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const {
    currentPhilosopher,
    currentQuestion,
    currentFollowUpQuestion,
    feedback,
    maieuticChain,
    unlockedBadges,
    showEasterEgg,
    showBadgeUnlock,
    newlyUnlockedBadge,
    setCurrentPhilosopher,
    loadNextQuestion,
    answerQuestion,
    answerFollowUpQuestion,
    hideFeedback,
    setCurrentQuestion,
    getAnsweredCountByPhilosopher,
    resetPhilosopherProgress,
    setShowEasterEgg,
    setShowBadgeUnlock,
    setNewlyUnlockedBadge,
    setCurrentFollowUpQuestion,
    proceedAfterFeedback,
  } = useGameStore();

  const philosopher = getPhilosopherById(philosopherId || '');
  const philosopherIdTyped = philosopher?.id as 'socrates' | 'nietzsche' | 'beauvoir';

  useEffect(() => {
    if (!philosopher) {
      navigate('/');
      return;
    }

    if (!currentPhilosopher || currentPhilosopher.id !== philosopher.id) {
      setCurrentPhilosopher(philosopher);
      hideFeedback();
      setCurrentQuestion(null);
      setCurrentFollowUpQuestion(null);
      setSelectedOption(null);
      setHasAnswered(false);
    }
  }, [philosopherId, philosopher, currentPhilosopher, navigate, setCurrentPhilosopher, hideFeedback, setCurrentQuestion, setCurrentFollowUpQuestion]);

  useEffect(() => {
    if (!currentQuestion && philosopher && currentPhilosopher?.id === philosopher.id) {
      loadNextQuestion(philosopher.id as 'socrates' | 'nietzsche' | 'beauvoir');
    }
  }, [philosopher, currentQuestion, currentPhilosopher, loadNextQuestion]);

  const activeQuestionId = currentFollowUpQuestion?.id || currentQuestion?.id;
  useEffect(() => {
    setSelectedOption(null);
    setHasAnswered(false);
  }, [activeQuestionId]);

  const handleOptionClick = useCallback((optionId: string) => {
    if (hasAnswered) return;
    setSelectedOption(optionId);
  }, [hasAnswered]);

  const handleConfirm = useCallback(() => {
    if (!selectedOption || hasAnswered || !philosopherIdTyped) return;
    setHasAnswered(true);
    
    if (maieuticChain.isActive && currentFollowUpQuestion) {
      answerFollowUpQuestion(selectedOption, philosopherIdTyped);
    } else {
      answerQuestion(selectedOption, philosopherIdTyped);
    }
  }, [selectedOption, hasAnswered, answerQuestion, answerFollowUpQuestion, philosopherIdTyped, maieuticChain.isActive, currentFollowUpQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (!philosopherIdTyped) return;
    
    const chainIsActive = maieuticChain.isActive && !maieuticChain.broken && !maieuticChain.completed && currentFollowUpQuestion;
    const chainIsFinished = maieuticChain.completed || maieuticChain.broken;
    
    setSelectedOption(null);
    setHasAnswered(false);
    proceedAfterFeedback(philosopherIdTyped);
    
    if (chainIsActive) {
      return;
    }

    if (chainIsFinished) {
      setTimeout(() => {
        const hasMore = loadNextQuestion(philosopherIdTyped);
        if (!hasMore) {
          setCurrentQuestion(null);
        }
      }, newlyUnlockedBadge && !showBadgeUnlock ? 300 : 0);
      return;
    }
    
    setTimeout(() => {
      const hasMore = loadNextQuestion(philosopherIdTyped);
      if (!hasMore) {
        setCurrentQuestion(null);
      }
    }, newlyUnlockedBadge && !showBadgeUnlock ? 300 : 0);
  }, [philosopherIdTyped, proceedAfterFeedback, loadNextQuestion, setCurrentQuestion, maieuticChain, currentFollowUpQuestion, newlyUnlockedBadge, showBadgeUnlock]);

  const handleBackToTavern = useCallback(() => {
    hideFeedback();
    setCurrentPhilosopher(null);
    setCurrentQuestion(null);
    setCurrentFollowUpQuestion(null);
    navigate('/');
  }, [hideFeedback, setCurrentPhilosopher, setCurrentQuestion, setCurrentFollowUpQuestion, navigate]);

  const handleReset = useCallback(() => {
    if (!philosopherIdTyped) return;
    hideFeedback();
    setSelectedOption(null);
    setHasAnswered(false);
    resetPhilosopherProgress(philosopherIdTyped);
    loadNextQuestion(philosopherIdTyped);
  }, [philosopherIdTyped, hideFeedback, resetPhilosopherProgress, loadNextQuestion]);

  if (!philosopher) {
    return null;
  }

  const totalQuestions = philosopher ? getQuestionsByPhilosopher(philosopherIdTyped).length : 0;
  const answeredCount = philosopher ? getAnsweredCountByPhilosopher(philosopherIdTyped) : 0;
  const currentRound = philosopher && currentQuestion ? answeredCount + 1 : 0;
  const hasMoreQuestions = answeredCount < totalQuestions;

  const hasBadge = philosopher.specialBadge && unlockedBadges.includes(philosopher.specialBadge.id);
  const activeQuestion = currentFollowUpQuestion || currentQuestion;

  if (!currentQuestion && !hasMoreQuestions) {
    return (
      <TavernBackground>
        <div className="min-h-screen flex items-center justify-center p-4">
          <ParchmentCard className="max-w-md w-full p-8 text-center animate-bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-display text-3xl text-tavern-wood mb-4">
              对决完成！
            </h2>
            <p className="text-tavern-ink font-serif mb-6">
              你已经完成了与 {philosopher.name} 的所有质问对决。
              相信你对「{philosopher.coreIdea}」有了更深的理解。
            </p>
            {hasBadge && philosopher.specialBadge && (
              <div className="mb-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-2 border-tavern-gold">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">{philosopher.specialBadge.icon}</span>
                  <div className="text-left">
                    <div className="font-display text-lg text-tavern-wood flex items-center gap-2">
                      <Award size={18} className="text-tavern-gold" />
                      {philosopher.specialBadge.name}
                    </div>
                    <div className="text-xs text-tavern-ink/70 font-serif">
                      {philosopher.specialBadge.rarity === 'legendary' ? '传说徽章' : philosopher.specialBadge.rarity === 'rare' ? '稀有徽章' : '普通徽章'}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <AffectionBar philosopherId={philosopher.id} size="lg" />
            <div className="mt-8 flex gap-4">
              <button onClick={handleBackToTavern} className="btn-parchment flex-1">
                返回酒馆
              </button>
              <button onClick={handleReset} className="btn-gold flex-1 flex items-center justify-center gap-2">
                <RotateCcw size={18} />
                再来一轮
              </button>
            </div>
            {philosopher.easterEgg && unlockedBadges.includes(philosopher.easterEgg.unlockBadgeId) && (
              <button
                onClick={() => setShowEasterEgg(true)}
                className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-display text-lg hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles size={20} />
                查看历史对话彩蛋：{philosopher.easterEgg.title}
              </button>
            )}
          </ParchmentCard>
        </div>
        {showEasterEgg && philosopher.easterEgg && philosopher.id === 'socrates' && (
          <SocratesDeathEasterEgg
            easterEgg={philosopher.easterEgg}
            onClose={() => setShowEasterEgg(false)}
            socratesAvatar={philosopher.avatar}
          />
        )}
      </TavernBackground>
    );
  }

  if (!currentQuestion) {
    return (
      <TavernBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-parchment-100 font-serif text-xl">
            加载中...
          </div>
        </div>
      </TavernBackground>
    );
  }

  return (
    <TavernBackground>
      <div className="min-h-screen flex flex-col">
        <header className="pt-4 pb-4 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBackToTavern}
                className="flex items-center gap-2 text-parchment-100 hover:text-white transition-colors font-serif"
              >
                <ArrowLeft size={20} />
                返回酒馆
              </button>
              <div className="flex items-center gap-4">
                <div className="text-parchment-100 font-serif">
                  第 <span className="text-tavern-gold font-bold">{currentRound}</span> / {totalQuestions} 题
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-parchment-100/70 hover:text-parchment-100 transition-colors"
                  title="换一题"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>

            {maieuticChain.isActive && (
              <div className="mb-4 p-3 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-lg border border-green-500/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-green-300 font-display">
                    <Sparkles size={16} />
                    助产术追问链进行中
                  </div>
                  <div className="text-green-200 font-serif text-sm">
                    深度 {maieuticChain.currentDepth} / {maieuticChain.totalDepth}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: maieuticChain.totalDepth }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-2 flex-1 rounded-full transition-all duration-300',
                        i < maieuticChain.currentDepth
                          ? 'bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-500/30'
                          : 'bg-green-900/30'
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            <ParchmentCard className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={philosopher.avatar}
                    alt={philosopher.name}
                    className="w-14 h-14 rounded-full border-2 border-tavern-gold object-cover"
                  />
                  {hasBadge && philosopher.specialBadge && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs border-2 border-white shadow-lg" title={`已获得：${philosopher.specialBadge.name}`}>
                      {philosopher.specialBadge.icon}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-xl text-tavern-wood">
                      {philosopher.name}
                    </h3>
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: philosopher.color }}
                    >
                      {philosopher.coreIdea}
                    </span>
                    {currentFollowUpQuestion && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-600 text-white flex items-center gap-1">
                        追问 Lv.{currentFollowUpQuestion.depth}
                      </span>
                    )}
                  </div>
                  <AffectionBar philosopherId={philosopher.id} size="sm" showLabel={false} />
                </div>
              </div>
            </ParchmentCard>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
          <div className="max-w-4xl w-full space-y-8">
            {activeQuestion && (
              <SceneCard
                question={activeQuestion}
                philosopherName={philosopher.name}
                philosopherColor={philosopher.color}
                chainDepth={currentFollowUpQuestion?.depth}
                chainTotal={maieuticChain.isActive ? maieuticChain.totalDepth : undefined}
                isFollowUp={!!currentFollowUpQuestion}
              />
            )}

            <div>
              <p className="text-parchment-100 font-serif text-center mb-4">
                请选择 {philosopher.name} 最可能说的话：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeQuestion?.options.map((option, index) => (
                  <OptionCard
                    key={option.id}
                    option={option}
                    onClick={() => handleOptionClick(option.id)}
                    disabled={hasAnswered}
                    selected={selectedOption === option.id}
                    showResult={hasAnswered}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleConfirm}
                disabled={!selectedOption || hasAnswered}
                className={`btn-gold text-lg px-12 ${
                  !selectedOption || hasAnswered
                    ? 'opacity-50 cursor-not-allowed'
                    : 'animate-glow'
                }`}
              >
                确认选择
              </button>
            </div>
          </div>
        </main>

        <FeedbackModal
          feedback={feedback}
          philosopher={philosopher}
          question={activeQuestion}
          onNext={handleNextQuestion}
          onBack={handleBackToTavern}
          hasMoreQuestions={hasMoreQuestions}
          onUnlockEasterEgg={() => setShowEasterEgg(true)}
        />

        {showBadgeUnlock && newlyUnlockedBadge && (
          <BadgeUnlockModal
            badge={newlyUnlockedBadge}
            onClose={() => {
              setShowBadgeUnlock(false);
              setNewlyUnlockedBadge(null);
            }}
          />
        )}

        {showEasterEgg && philosopher.easterEgg && philosopher.id === 'socrates' && (
          <SocratesDeathEasterEgg
            easterEgg={philosopher.easterEgg}
            onClose={() => setShowEasterEgg(false)}
            socratesAvatar={philosopher.avatar}
          />
        )}
      </div>
    </TavernBackground>
  );
}
