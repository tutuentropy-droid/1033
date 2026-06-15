import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Philosopher, Question, PhilosopherId, FeedbackState, AffectionLevel } from '@/types';
import { INITIAL_AFFECTION, CORRECT_AFFECTION_GAIN, WRONG_AFFECTION_LOSS, AFFECTION_LEVELS } from '@/types';
import { philosophers, getRandomTaunt, getRandomPraise } from '@/data/philosophers';
import { getRandomQuestion, shuffleArray } from '@/data/questions';

interface GameStore extends GameState {
  feedback: FeedbackState;
  setCurrentPhilosopher: (philosopher: Philosopher | null) => void;
  setCurrentQuestion: (question: Question | null) => void;
  loadNextQuestion: (philosopherId: PhilosopherId) => boolean;
  answerQuestion: (optionId: string) => void;
  updateAffection: (philosopherId: PhilosopherId, change: number) => void;
  getAffectionLevel: (philosopherId: PhilosopherId) => AffectionLevel;
  resetGame: () => void;
  showFeedback: (isCorrect: boolean, message: string, affectionChange: number) => void;
  hideFeedback: () => void;
}

const getInitialAffection = (): Record<PhilosopherId, number> => ({
  socrates: INITIAL_AFFECTION,
  nietzsche: INITIAL_AFFECTION,
  beauvoir: INITIAL_AFFECTION,
});

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentPhilosopher: null,
      currentQuestion: null,
      affection: getInitialAffection(),
      score: 0,
      round: 0,
      answeredQuestions: [],
      feedback: {
        show: false,
        isCorrect: false,
        message: '',
        affectionChange: 0,
      },

      setCurrentPhilosopher: (philosopher) => {
        set({ currentPhilosopher: philosopher });
      },

      setCurrentQuestion: (question) => {
        set({ currentQuestion: question });
      },

      loadNextQuestion: (philosopherId) => {
        const state = get();
        const question = getRandomQuestion(philosopherId, state.answeredQuestions);
        
        if (!question) {
          return false;
        }

        const shuffledOptions = shuffleArray(question.options);
        
        set({
          currentQuestion: {
            ...question,
            options: shuffledOptions,
          },
          round: state.round + 1,
        });
        
        return true;
      },

      answerQuestion: (optionId) => {
        const state = get();
        const { currentQuestion, currentPhilosopher } = state;
        
        if (!currentQuestion || !currentPhilosopher) return;

        const selectedOption = currentQuestion.options.find(o => o.id === optionId);
        if (!selectedOption) return;

        const isCorrect = selectedOption.isCorrect;
        const affectionChange = isCorrect ? CORRECT_AFFECTION_GAIN : -WRONG_AFFECTION_LOSS;
        const message = isCorrect 
          ? getRandomPraise(currentPhilosopher)
          : getRandomTaunt(currentPhilosopher);

        set({
          answeredQuestions: [...state.answeredQuestions, currentQuestion.id],
          score: state.score + (isCorrect ? 10 : 0),
        });

        get().updateAffection(currentPhilosopher.id, affectionChange);
        get().showFeedback(isCorrect, message, affectionChange);
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

      resetGame: () => {
        set({
          currentPhilosopher: null,
          currentQuestion: null,
          score: 0,
          round: 0,
          answeredQuestions: [],
          feedback: {
            show: false,
            isCorrect: false,
            message: '',
            affectionChange: 0,
          },
        });
      },

      showFeedback: (isCorrect, message, affectionChange) => {
        set({
          feedback: {
            show: true,
            isCorrect,
            message,
            affectionChange,
          },
        });
      },

      hideFeedback: () => {
        set({
          feedback: {
            show: false,
            isCorrect: false,
            message: '',
            affectionChange: 0,
          },
        });
      },
    }),
    {
      name: 'tavern-game-storage',
      partialize: (state) => ({
        affection: state.affection,
        score: state.score,
        answeredQuestions: state.answeredQuestions,
      }),
    }
  )
);
