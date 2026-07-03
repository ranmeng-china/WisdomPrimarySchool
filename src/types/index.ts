export type QuestionType = 'choice' | 'fill' | 'drag' | 'match' | 'diagram' | 'write';
export type DifficultyLevel = 'basic' | 'medium' | 'hard';
export type PetType = 'cat' | 'dog';

export interface Question {
  id: string;
  grade: '1';
  semester: 'up' | 'down';
  moduleId: string;
  levelId: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  stem: string;
  assets: {
    images?: string[];
    emojis?: string[];
    options?: string[];
    targets?: string[];
  };
  answer: unknown;
  explanation: string;
  tags: string[];
}

export interface ModuleStat {
  moduleId: string;
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;
}

export interface LearningProgress {
  completedLevelIds: string[];
  starsByLevel: Record<string, number>;
  badges: string[];
  moduleStats: Record<string, ModuleStat>;
  totalAnswered: number;
  totalCorrect: number;
  studyDays: string[];
  updatedAt: string;
}

export interface MistakeRecord {
  questionId: string;
  moduleId: string;
  levelId: string;
  wrongAnswer: unknown;
  correctAnswer: unknown;
  mistakeCount: number;
  masteredCount: number;
  lastWrongAt: string;
}

export interface StrokePoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface WritingRecord {
  id: string;
  targetText: string;
  strokes: StrokePoint[][];
  createdAt: string;
}

export interface Wallet {
  yuan: number;
  jiao: number;
  fen: number;
}

export interface PetData {
  chosenPet: PetType | null;
  name: string;
  level: number;
  exp: number;
  satiety: number;
  cleanliness: number;
  shieldCount: number;
  wallet: Wallet;
  backpack: Record<string, number>;
  lastUpdateTime: string;
}
