import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Philosopher, Question, PhilosopherId, FeedbackState, AffectionLevel, FollowUpQuestion, Badge, EasterEgg } from '@/types';
import { INITIAL_AFFECTION, CORRECT_AFFECTION_GAIN, WRONG_AFFECTION_LOSS, AFFECTION_LEVELS } from '@/types';
import { getPhilosopherById, getRandomTaunt, getRandomPraise } from '@/data/philosophers';
import { getRandomQuestion, shuffleArray, getQuestionsByPhilosopher } from '@/data/questions';

interface GameStore extends GameState {
  feedback: FeedbackState;
  setCurrentPhilosopher: (philosopher: Philosopher | null) => void;
  setCurrentQuestion: (question: Question | null) => void;
  loadNextQuestion: (philosopherId: PhilosopherId) => boolean;
  answerQuestion: (optionId: string, philosopherId: PhilosopherId) => void;
  answerFollowUpQuestion: (optionId: string, philosopherId: PhilosopherId) => void;
  updateAffection: (philosopherId: PhilosopherId, change: number) => void;
  getAffectionLevel: (philosopherId: PhilosopherId) => AffectionLevel;
  getAnsweredCountByPhilosopher: (philosopherId: PhilosopherId) => number;
  resetGame: () => void;
  resetAffection: () => void;
  resetPhilosopherProgress: (philosopherId: PhilosopherId) => void;
  showFeedback: (params: {
    isCorrect: boolean;
    message: string;
    affectionChange: number;
    scoreChange: number;
    chainState?: FeedbackState['chainState'];
    badgeUnlocked?: Badge;
    easterEggAvailable?: EasterEgg;
  }) => void;
  hideFeedback: () => void;
  setCurrentFollowUpQuestion: (question: FollowUpQuestion | null) => void;
  breakMaieuticChain: () => void;
  completeMaieuticChain: (philosopherId: PhilosopherId) => void;
  unlockBadge: (badge: Badge, philosopherId: PhilosopherId) => void;
  unlockEasterEgg: (easterEgg: EasterEgg) => void;
  setShowEasterEgg: (show: boolean) => void;
  setShowBadgeUnlock: (show: boolean) => void;
  setNewlyUnlockedBadge: (badge: Badge | null) => void;
  getChainDepthByLevel: (philosopherId: PhilosopherId, baseLength: number) => number;
  proceedAfterFeedback: (philosopherId: PhilosopherId) => void;
}

const getInitialAffection = (): Record<PhilosopherId, number> => ({
  socrates: INITIAL_AFFECTION,
  nietzsche: INITIAL_AFFECTION,
  beauvoir: INITIAL_AFFECTION,
});

const getInitialMaieuticChain = () => ({
  isActive: false,
  mainQuestionId: null,
  currentDepth: 0,
  totalDepth: 0,
  answeredCorrectlyInChain: [],
  broken: false,
  completed: false,
});

const getInitialFeedback = (): FeedbackState => ({
  show: false,
  isCorrect: false,
  message: '',
  affectionChange: 0,
  scoreChange: 0,
});

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentPhilosopher: null,
      currentQuestion: null,
      currentFollowUpQuestion: null,
      affection: getInitialAffection(),
      score: 0,
      round: 0,
      answeredQuestions: [],
      unlockedBadges: [],
      unlockedEasterEggs: [],
      maieuticChain: getInitialMaieuticChain(),
      showEasterEgg: false,
      showBadgeUnlock: false,
      newlyUnlockedBadge: null,
      feedback: getInitialFeedback(),

      setCurrentPhilosopher: (philosopher) => {
        set({ 
          currentPhilosopher: philosopher,
          feedback: getInitialFeedback(),
          maieuticChain: getInitialMaieuticChain(),
          currentFollowUpQuestion: null,
        });
      },

      setCurrentQuestion: (question) => {
        set({ currentQuestion: question });
      },

      setCurrentFollowUpQuestion: (question) => {
        set({ currentFollowUpQuestion: question });
      },

      getChainDepthByLevel: (philosopherId, baseLength) => {
        const answered = get().getAnsweredCountByPhilosopher(philosopherId);
        const totalQuestions = getQuestionsByPhilosopher(philosopherId).length;
        const progressRatio = totalQuestions > 0 ? answered / totalQuestions : 0;
        
        if (progressRatio < 0.33) return baseLength;
        if (progressRatio < 0.66) return baseLength + 1;
        return baseLength + 2;
      },

      loadNextQuestion: (philosopherId) => {
        const state = get();
        const philosopherQuestions = getQuestionsByPhilosopher(philosopherId);
        const answeredForPhilosopher = state.answeredQuestions.filter(
          qId => philosopherQuestions.some(q => q.id === qId)
        );
        
        const availableQuestions = philosopherQuestions.filter(
          q => !answeredForPhilosopher.includes(q.id)
        );
        
        if (availableQuestions.length === 0) {
          return false;
        }

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const question = availableQuestions[randomIndex];
        const shuffledOptions = shuffleArray(question.options);
        
        set({
          currentQuestion: {
            ...question,
            options: shuffledOptions,
          },
          currentFollowUpQuestion: null,
          maieuticChain: getInitialMaieuticChain(),
        });
        
        return true;
      },

      answerQuestion: (optionId, philosopherId) => {
        const state = get();
        const { currentQuestion } = state;
        
        if (!currentQuestion) return;

        const philosopher = getPhilosopherById(philosopherId);
        if (!philosopher) return;

        const selectedOption = currentQuestion.options.find(o => o.id === optionId);
        if (!selectedOption) return;

        const isCorrect = selectedOption.isCorrect;

        if (isCorrect && currentQuestion.followUpQuestions && currentQuestion.followUpQuestions.length > 0) {
          const totalDepth = get().getChainDepthByLevel(philosopherId, currentQuestion.baseFollowUpLength || 3);
          const followUpCount = Math.min(totalDepth, currentQuestion.followUpQuestions.length);
          const firstFollowUp = currentQuestion.followUpQuestions[0];
          const shuffledFollowUpOptions = shuffleArray(firstFollowUp.options);
          
          const affectionChange = 0;
          const scoreChange = 0;
          const message = '很好！但追问还未结束——助产术才刚刚开始。';

          set({
            maieuticChain: {
              isActive: true,
              mainQuestionId: currentQuestion.id,
              currentDepth: 1,
              totalDepth: followUpCount,
              answeredCorrectlyInChain: [currentQuestion.id],
              broken: false,
              completed: false,
            },
            currentFollowUpQuestion: {
              ...firstFollowUp,
              options: shuffledFollowUpOptions,
            },
          });

          get().showFeedback({
            isCorrect: true,
            message,
            affectionChange,
            scoreChange,
            chainState: {
              isChainQuestion: true,
              chainDepth: 0,
              chainTotal: followUpCount,
              chainBroken: false,
              chainCompleted: false,
            },
          });
          return;
        }

        const affectionChange = isCorrect ? CORRECT_AFFECTION_GAIN : -WRONG_AFFECTION_LOSS;
        const scoreChange = isCorrect ? 10 : 0;
        const message = isCorrect 
          ? getRandomPraise(philosopher)
          : getRandomTaunt(philosopher);

        if (isCorrect) {
          set({
            answeredQuestions: [...state.answeredQuestions, currentQuestion.id],
            score: state.score + scoreChange,
          });
        }

        get().updateAffection(philosopherId, affectionChange);
        get().showFeedback({
          isCorrect,
          message,
          affectionChange,
          scoreChange,
        });
      },

      answerFollowUpQuestion: (optionId, philosopherId) => {
        const state = get();
        const { currentFollowUpQuestion, maieuticChain, currentQuestion } = state;
        
        if (!currentFollowUpQuestion || !maieuticChain.isActive || !currentQuestion) return;

        const philosopher = getPhilosopherById(philosopherId);
        if (!philosopher) return;

        const selectedOption = currentFollowUpQuestion.options.find(o => o.id === optionId);
        if (!selectedOption) return;

        const isCorrect = selectedOption.isCorrect;
        const isLastQuestion = maieuticChain.currentDepth >= maieuticChain.totalDepth;

        if (!isCorrect) {
          const affectionChange = -Math.floor(WRONG_AFFECTION_LOSS / 2);
          const scoreChange = -5;
          const message = '追问链断裂了...但你答对了主问题，获得一半分数。下次继续深入思考吧。';
          
          get().breakMaieuticChain();
          
          set({
            answeredQuestions: [...state.answeredQuestions, currentQuestion.id],
            score: state.score + 5,
          });

          get().updateAffection(philosopherId, affectionChange);
          get().showFeedback({
            isCorrect: false,
            message,
            affectionChange,
            scoreChange,
            chainState: {
              isChainQuestion: true,
              chainDepth: maieuticChain.currentDepth,
              chainTotal: maieuticChain.totalDepth,
              chainBroken: true,
              chainCompleted: false,
            },
          });
          return;
        }

        if (isCorrect && !isLastQuestion) {
          const nextDepth = maieuticChain.currentDepth + 1;
          const nextFollowUp = currentQuestion.followUpQuestions?.[nextDepth - 1];
          if (!nextFollowUp) return;
          
          const shuffledNextOptions = shuffleArray(nextFollowUp.options);

          set({
            maieuticChain: {
              ...maieuticChain,
              currentDepth: nextDepth,
              answeredCorrectlyInChain: [...maieuticChain.answeredCorrectlyInChain, currentFollowUpQuestion.id],
            },
            currentFollowUpQuestion: {
              ...nextFollowUp,
              options: shuffledNextOptions,
            },
          });

          const message = '答得好！但这还不够深——继续！';
          get().showFeedback({
            isCorrect: true,
            message,
            affectionChange: 0,
            scoreChange: 0,
            chainState: {
              isChainQuestion: true,
              chainDepth: maieuticChain.currentDepth,
              chainTotal: maieuticChain.totalDepth,
              chainBroken: false,
              chainCompleted: false,
            },
          });
          return;
        }

        if (isCorrect && isLastQuestion) {
          get().completeMaieuticChain(philosopherId);
          
          const newChainAnswers = [...maieuticChain.answeredCorrectlyInChain, currentFollowUpQuestion.id];
          const fullScore = 10 + maieuticChain.totalDepth * 5;
          const affectionChange = CORRECT_AFFECTION_GAIN + 5;
          const message = '太棒了！你完整走完了助产术追问链！真正的思考者！';

          let badgeUnlocked: Badge | undefined;
          let easterEggAvailable: EasterEgg | undefined;
          
          if (philosopher.specialBadge && !state.unlockedBadges.includes(philosopher.specialBadge.id)) {
            badgeUnlocked = philosopher.specialBadge;
            set({
              unlockedBadges: [...state.unlockedBadges, philosopher.specialBadge.id],
              newlyUnlockedBadge: philosopher.specialBadge,
            });
            
            if (philosopher.easterEgg) {
              easterEggAvailable = philosopher.easterEgg;
              get().unlockEasterEgg(philosopher.easterEgg);
            }
          }

          set({
            answeredQuestions: [...state.answeredQuestions, currentQuestion.id, ...newChainAnswers.slice(1)],
            score: state.score + fullScore,
          });

          get().updateAffection(philosopherId, affectionChange);
          get().showFeedback({
            isCorrect: true,
            message,
            affectionChange,
            scoreChange: fullScore,
            chainState: {
              isChainQuestion: true,
              chainDepth: maieuticChain.totalDepth,
              chainTotal: maieuticChain.totalDepth,
              chainBroken: false,
              chainCompleted: true,
            },
            badgeUnlocked,
            easterEggAvailable,
          });
          return;
        }
      },

      breakMaieuticChain: () => {
        set(state => ({
          maieuticChain: {
            ...state.maieuticChain,
            broken: true,
            isActive: false,
          },
        }));
      },

      completeMaieuticChain: (_philosopherId) => {
        set(state => ({
          maieuticChain: {
            ...state.maieuticChain,
            completed: true,
            isActive: false,
          },
        }));
      },

      unlockBadge: (badge, _philosopherId) => {
        set(state => ({
          unlockedBadges: [...state.unlockedBadges, badge.id],
          showBadgeUnlock: true,
          newlyUnlockedBadge: badge,
        }));
      },

      unlockEasterEgg: (easterEgg) => {
        set(state => ({
          unlockedEasterEggs: [...state.unlockedEasterEggs, easterEgg.id],
        }));
      },

      setShowEasterEgg: (show) => {
        set({ showEasterEgg: show });
      },

      setShowBadgeUnlock: (show) => {
        set({ showBadgeUnlock: show });
      },

      setNewlyUnlockedBadge: (badge) => {
        set({ newlyUnlockedBadge: badge });
      },

      updateAffection: (philosopherId, change) => {
        set((state) => ({
          affection: {
            ...state.affection,
            [philosopherId]: Math.max(0, Math.min(100, state.affection[philosopherId] + change)),
          },
        }));
      },

      getAffectionLevel: (philosopherId) => {
        const value = get().affection[philosopherId];
        if (value <= 30) return 'enemy';
        if (value <= 60) return 'neutral';
        if (value <= 80) return 'friendly';
        return 'bosom';
      },

      getAnsweredCountByPhilosopher: (philosopherId) => {
        const state = get();
        const philosopherQuestions = getQuestionsByPhilosopher(philosopherId);
        const mainQuestionIds = philosopherQuestions.map(q => q.id);
        return state.answeredQuestions.filter(
          qId => mainQuestionIds.includes(qId)
        ).length;
      },

      resetGame: () => {
        set({
          currentPhilosopher: null,
          currentQuestion: null,
          currentFollowUpQuestion: null,
          score: 0,
          round: 0,
          answeredQuestions: [],
          unlockedBadges: [],
          unlockedEasterEggs: [],
          maieuticChain: getInitialMaieuticChain(),
          showEasterEgg: false,
          showBadgeUnlock: false,
          newlyUnlockedBadge: null,
          feedback: getInitialFeedback(),
        });
        get().resetAffection();
      },

      resetAffection: () => {
        set({
          affection: getInitialAffection(),
        });
      },

      resetPhilosopherProgress: (philosopherId) => {
        const state = get();
        const philosopherQuestions = getQuestionsByPhilosopher(philosopherId);
        const mainQuestionIds = philosopherQuestions.map(q => q.id);
        const followUpIds = philosopherQuestions.flatMap(q => 
          (q.followUpQuestions || []).map(f => f.id)
        );
        const allIds = [...mainQuestionIds, ...followUpIds];
        
        const newAnsweredQuestions = state.answeredQuestions.filter(
          qId => !allIds.includes(qId)
        );
        
        set({
          answeredQuestions: newAnsweredQuestions,
          affection: {
            ...state.affection,
            [philosopherId]: INITIAL_AFFECTION,
          },
          maieuticChain: getInitialMaieuticChain(),
          currentFollowUpQuestion: null,
        });
      },

      proceedAfterFeedback: (philosopherId) => {
        const state = get();
        const chain = state.maieuticChain;
        const hasNewBadge = state.newlyUnlockedBadge !== null && !state.showBadgeUnlock;

        if (chain.isActive && !chain.broken && !chain.completed && state.currentFollowUpQuestion) {
          return;
        }

        if (chain.completed || chain.broken) {
          set({
            maieuticChain: getInitialMaieuticChain(),
            currentFollowUpQuestion: null,
          });
        }

        get().hideFeedback();

        if (hasNewBadge) {
          setTimeout(() => {
            set({ showBadgeUnlock: true });
          }, 300);
        }
      },

      showFeedback: (params) => {
        set({
          feedback: {
            show: true,
            isCorrect: params.isCorrect,
            message: params.message,
            affectionChange: params.affectionChange,
            scoreChange: params.scoreChange,
            chainState: params.chainState,
            badgeUnlocked: params.badgeUnlocked,
            easterEggAvailable: params.easterEggAvailable,
          },
        });
      },

      hideFeedback: () => {
        set({
          feedback: getInitialFeedback(),
        });
      },
    }),
    {
      name: 'tavern-game-storage',
      partialize: (state) => ({
        affection: state.affection,
        score: state.score,
        answeredQuestions: state.answeredQuestions,
        unlockedBadges: state.unlockedBadges,
        unlockedEasterEggs: state.unlockedEasterEggs,
      }),
    }
  )
);
