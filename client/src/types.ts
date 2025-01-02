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
}

export const MODEL_OPTIONS: ModelOption[] = [
  { name: "Claude 3 Haiku", value: "claude-3-haiku-20240307" }, // Good
  { name: "Claude 3 Opus", value: "claude-3-opus-latest" }, // Someimes delays
  { name: "Claude 3.5 Sonnet", value: "claude-3-5-sonnet-latest" }, // Sometimes delays
  { name: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }, // Good
  { name: "Gemini 1.5 Flash 8B", value: "gemini-1.5-flash-8b" }, // Good
  { name: "GPT-4o", value: "gpt-4o" }, // Good
  { name: "GPT-4 Turbo", value: "gpt-4-turbo" }, // Good
  { name: "GPT-4o Mini", value: "gpt-4o-mini" }, // Good
  { name: "Llama 3.1 8B Instruct", value: "Meta-Llama-3.1-8B-Instruct" }, // Good
  { name: "Llama 3.1 8B Instant", value: "llama-3.1-8b-instant" }, // Good
  // { name: "Llama 3.1 8B FireworksAI", value: "accounts/fireworks/models/llama-v3p1-8b-instruct" }, // Redundant
  // { name: "Llama 3.1 8B TogetherAI", value: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo" }, // Redundant
  // { name: "Llama 3.1 405B FireworksAI", value: "accounts/fireworks/models/llama-v3p1-405b-instruct" },
  // { name: "Llama 3.1 405B Instruct", value: "Meta-Llama-3.1-405B-Instruct" }, // Rate limited
  { name: "Llama 3.1 405B Instruct Turbo", value: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo" }, // Good
  // { name: "Mixtral 8x7B", value: "mixtral-8x7b-32768" }, // Inconsistent JSON output
  // { name: "Open Mixtral 8x7B", value: "open-mixtral-8x7b" }, // Inconsistent JSON output
  // { name: "Open Mixtral 8x22B", value: "open-mixtral-8x22b" }, // Rate limited
  // { name: "Open Mistral 7B", value: "open-mistral-7b" } // Inconsistent JSON output
  // { name: "Llama 3.3 70B Instruct", value: "accounts/fireworks/models/llama-v3p3-70b-instruct" }, // Redundant
  { name: "Llama 3.3 70B Instruct Turbo", value: "meta-llama/Llama-3.3-70B-Instruct-Turbo" },
  { name: "Llama 3.3 70B Versatile", value: "llama-3.3-70b-versatile" },
  { name: "Llama 3.3 70B Instruct", value: "Meta-Llama-3.3-70B-Instruct" },
];

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