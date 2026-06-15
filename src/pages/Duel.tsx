import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import TavernBackground from '@/components/Tavern/TavernBackground';
import AffectionBar from '@/components/Tavern/AffectionBar';
import SceneCard from '@/components/Duel/SceneCard';
import OptionCard from '@/components/Duel/OptionCard';
import FeedbackModal from '@/components/Duel/FeedbackModal';
import ParchmentCard from '@/components/shared/ParchmentCard';
import { getPhilosopherById } from '@/data/philosophers';
import { useGameStore } from '@/store/useGameStore';
import { getQuestionsByPhilosopher } from '@/data/questions';

export default function Duel() {
  const { philosopherId } = useParams<{ philosopherId: string }>();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const {
    currentPhilosopher,
    currentQuestion,
    feedback,
    setCurrentPhilosopher,
    loadNextQuestion,
    answerQuestion,
    hideFeedback,
    setCurrentQuestion,
    getAnsweredCountByPhilosopher,
    resetPhilosopherProgress,
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
      setSelectedOption(null);
      setHasAnswered(false);
    }
  }, [philosopherId, philosopher, currentPhilosopher, navigate, setCurrentPhilosopher, hideFeedback, setCurrentQuestion]);

  useEffect(() => {
    if (!currentQuestion && philosopher && currentPhilosopher?.id === philosopher.id) {
      loadNextQuestion(philosopher.id as 'socrates' | 'nietzsche' | 'beauvoir');
    }
  }, [philosopher, currentQuestion, currentPhilosopher, loadNextQuestion]);

  const handleOptionClick = useCallback((optionId: string) => {
    if (hasAnswered) return;
    setSelectedOption(optionId);
  }, [hasAnswered]);

  const handleConfirm = useCallback(() => {
    if (!selectedOption || hasAnswered || !philosopherIdTyped) return;
    setHasAnswered(true);
    answerQuestion(selectedOption, philosopherIdTyped);
  }, [selectedOption, hasAnswered, answerQuestion, philosopherIdTyped]);

  const handleNextQuestion = useCallback(() => {
    if (!philosopherIdTyped) return;
    hideFeedback();
    setSelectedOption(null);
    setHasAnswered(false);
    const hasMore = loadNextQuestion(philosopherIdTyped);
    if (!hasMore) {
      setCurrentQuestion(null);
    }
  }, [philosopherIdTyped, hideFeedback, loadNextQuestion, setCurrentQuestion]);

  const handleBackToTavern = useCallback(() => {
    hideFeedback();
    setCurrentPhilosopher(null);
    setCurrentQuestion(null);
    navigate('/');
  }, [hideFeedback, setCurrentPhilosopher, setCurrentQuestion, navigate]);

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
          </ParchmentCard>
        </div>
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

            <ParchmentCard className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={philosopher.avatar}
                  alt={philosopher.name}
                  className="w-14 h-14 rounded-full border-2 border-tavern-gold object-cover"
                />
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
                  </div>
                  <AffectionBar philosopherId={philosopher.id} size="sm" showLabel={false} />
                </div>
              </div>
            </ParchmentCard>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
          <div className="max-w-4xl w-full space-y-8">
            <SceneCard
              question={currentQuestion}
              philosopherName={philosopher.name}
              philosopherColor={philosopher.color}
            />

            <div>
              <p className="text-parchment-100 font-serif text-center mb-4">
                请选择 {philosopher.name} 最可能说的话：
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
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
          question={currentQuestion}
          onNext={handleNextQuestion}
          onBack={handleBackToTavern}
          hasMoreQuestions={hasMoreQuestions}
        />
      </div>
    </TavernBackground>
  );
}
