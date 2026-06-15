export type PhilosopherId = 'socrates' | 'nietzsche' | 'beauvoir';

export interface Philosopher {
  id: PhilosopherId;
  name: string;
  coreIdea: string;
  avatar: string;
  color: string;
  description: string;
  quote: string;
  taunts: string[];
  praises: string[];
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  philosopherId: PhilosopherId;
}

export interface Question {
  id: string;
  philosopherId: PhilosopherId;
  scene: string;
  options: Option[];
  explanation: string;
}

export type AffectionLevel = 'enemy' | 'neutral' | 'friendly' | 'bosom';

export interface GameState {
  currentPhilosopher: Philosopher | null;
  currentQuestion: Question | null;
  affection: Record<PhilosopherId, number>;
  score: number;
  round: number;
  answeredQuestions: string[];
}

export interface FeedbackState {
  show: boolean;
  isCorrect: boolean;
  message: string;
  affectionChange: number;
}

export const AFFECTION_LEVELS: Record<AffectionLevel, { min: number; max: number; emoji: string; label: string }> = {
  enemy: { min: 0, max: 30, emoji: '😠', label: '敌对' },
  neutral: { min: 31, max: 60, emoji: '😐', label: '中立' },
  friendly: { min: 61, max: 80, emoji: '🙂', label: '友好' },
  bosom: { min: 81, max: 100, emoji: '❤️', label: '挚友' },
};

export const INITIAL_AFFECTION = 50;
export const CORRECT_AFFECTION_GAIN = 10;
export const WRONG_AFFECTION_LOSS = 5;
