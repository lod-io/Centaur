export interface Question {
  id: string;
  content: string;
  column: number;
  choices: string[];
  answer: string;
}

export interface Answer {
  id: string;
  questionId: string;
  horseId: number;
  content: string;
  status: "approved" | "rejected" | "pending";
  timestamp: string;
}

export interface Horse {
  id: number;
  emoji: string;
  color: string;
  position: number;
  name: string;
  modelValue: string;
  isProcessing?: boolean;
  isWaiting?: boolean;
  finishTime?: number;
}

export interface GameState {
  questions: Question[];
  answers: Answer[];
  horses: Horse[];
  currentColumn: number;
}

export interface ModelOption {
  name: string;
  value: string;
  id: number;
}

export type QuestionBankEntry = Omit<Question, 'column'>; 

export type AttemptedQuestion = {
  horseId: number;
  questionId: string;
};

export interface CustomQuestion {
  question: string;
  correctAnswer: string;
  decoy1: string;
  decoy2: string;
  decoy3: string;
}