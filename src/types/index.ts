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
  specialBadge?: Badge;
  easterEgg?: EasterEgg;
  diceEcstasy?: string[];
  diceJoy?: string[];
  diceNeutral?: string[];
  diceSuffering?: string[];
  diceAgony?: string[];
}

export interface Option {
  id: string;
  text: string;
  frenchText?: string;
  isCorrect: boolean;
  philosopherId: PhilosopherId;
}

export interface FollowUpQuestion {
  id: string;
  scene: string;
  options: Option[];
  explanation: string;
  depth: number;
}

export interface Question {
  id: string;
  philosopherId: PhilosopherId;
  scene: string;
  options: Option[];
  explanation: string;
  followUpQuestions?: FollowUpQuestion[];
  baseFollowUpLength?: number;
}

export type AffectionLevel = 'enemy' | 'neutral' | 'friendly' | 'bosom';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'legendary';
  unlockCondition: string;
}

export interface EasterEgg {
  id: string;
  title: string;
  description: string;
  unlockBadgeId: string;
  dialogues: EasterEggDialogue[];
}

export interface EasterEggDialogue {
  speaker: string;
  text: string;
  avatar?: string;
}

export interface MaieuticChainState {
  isActive: boolean;
  mainQuestionId: string | null;
  currentDepth: number;
  totalDepth: number;
  answeredCorrectlyInChain: string[];
  broken: boolean;
  completed: boolean;
}

export type DiceResult = 1 | 2 | 3 | 4 | 5 | 6;

export interface DiceState {
  isRolling: boolean;
  result: DiceResult | null;
  hasRerolled: boolean;
  showResult: boolean;
}

export interface GazeState {
  gazeValue: number;
  showOtherPerspective: string | null;
  isFrenchMode: boolean;
  timeLeft: number;
  isTimerRunning: boolean;
}

export interface GameState {
  currentPhilosopher: Philosopher | null;
  currentQuestion: Question | null;
  affection: Record<PhilosopherId, number>;
  score: number;
  round: number;
  answeredQuestions: string[];
  unlockedBadges: string[];
  unlockedEasterEggs: string[];
  maieuticChain: MaieuticChainState;
  currentFollowUpQuestion: FollowUpQuestion | null;
  showEasterEgg: boolean;
  showBadgeUnlock: boolean;
  newlyUnlockedBadge: Badge | null;
  ubermenschWill: number;
  dice: DiceState;
  gaze: GazeState;
}

export interface FeedbackState {
  show: boolean;
  isCorrect: boolean;
  message: string;
  affectionChange: number;
  scoreChange: number;
  chainState?: {
    isChainQuestion: boolean;
    chainDepth: number;
    chainTotal: number;
    chainBroken: boolean;
    chainCompleted: boolean;
  };
  badgeUnlocked?: Badge;
  easterEggAvailable?: EasterEgg;
  diceState?: {
    result: DiceResult;
    isEternalRecurrence: boolean;
    isHalfScore: boolean;
    tone: 'ecstasy' | 'joy' | 'neutral' | 'suffering' | 'agony';
  };
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

export const GAZE_THRESHOLD = 70;
export const GAZE_INCREASE_PER_USE = 25;
export const GAZE_DECREASE_ON_CORRECT = 15;
export const BASE_QUESTION_TIME = 30;
export const FRENCH_MODE_TIME_PENALTY = 5;
export const MAX_GAZE_VALUE = 100;
