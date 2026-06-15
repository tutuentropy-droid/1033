import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Philosopher, Question, PhilosopherId, FeedbackState, AffectionLevel } from '@/types';
import { INITIAL_AFFECTION, CORRECT_AFFECTION_GAIN, WRONG_AFFECTION_LOSS, AFFECTION_LEVELS } from '@/types';
import { getPhilosopherById, getRandomTaunt, getRandomPraise } from '@/data/philosophers';
import { getRandomQuestion, shuffleArray, getQuestionsByPhilosopher } from '@/data/questions';

interface GameStore extends GameState {
  feedback: FeedbackState;
  setCurrentPhilosopher: (philosopher: Philosopher | null) => void;
  setCurrentQuestion: (question: Question | null) => void;
  loadNextQuestion: (philosopherId: PhilosopherId) => boolean;
  answerQuestion: (optionId: string, philosopherId: PhilosopherId) => void;
  updateAffection: (philosopherId: PhilosopherId, change: number) => void;
  getAffectionLevel: (philosopherId: PhilosopherId) => AffectionLevel;
  getAnsweredCountByPhilosopher: (philosopherId: PhilosopherId) => number;
  resetGame: () => void;
  resetAffection: () => void;
  resetPhilosopherProgress: (philosopherId: PhilosopherId) => void;
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
        set({ 
          currentPhilosopher: philosopher,
          feedback: {
            show: false,
            isCorrect: false,
            message: '',
            affectionChange: 0,
          },
        });
      },

      setCurrentQuestion: (question) => {
        set({ currentQuestion: question });
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
        const affectionChange = isCorrect ? CORRECT_AFFECTION_GAIN : -WRONG_AFFECTION_LOSS;
        const message = isCorrect 
          ? getRandomPraise(philosopher)
          : getRandomTaunt(philosopher);

        set({
          answeredQuestions: [...state.answeredQuestions, currentQuestion.id],
          score: state.score + (isCorrect ? 10 : 0),
        });

        get().updateAffection(philosopherId, affectionChange);
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

      getAnsweredCountByPhilosopher: (philosopherId) => {
        const state = get();
        const philosopherQuestions = getQuestionsByPhilosopher(philosopherId);
        return state.answeredQuestions.filter(
          qId => philosopherQuestions.some(q => q.id === qId)
        ).length;
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
        const newAnsweredQuestions = state.answeredQuestions.filter(
          qId => !philosopherQuestions.some(q => q.id === qId)
        );
        
        set({
          answeredQuestions: newAnsweredQuestions,
          affection: {
            ...state.affection,
            [philosopherId]: INITIAL_AFFECTION,
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
