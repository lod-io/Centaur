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
  { name: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
  { name: "Gemini 1.5 Flash 8B", value: "gemini-1.5-flash-8b" },
  { name: "Gemma 2 9B", value: "gemma-2-9b" },
  { name: "Gemma 7B", value: "gemma-7b" },
  { name: "GPT-4o", value: "gpt-4o" },
  { name: "GPT-4 Turbo", value: "gpt-4-turbo" },
  { name: "GPT-4o Mini", value: "gpt-4o-mini" },
  { name: "GPT-4o Mini (2024-07-18)", value: "gpt-4o-mini-2024-07-18" },
  { name: "Claude 3 Opus", value: "claude-3-opus-latest" },
  { name: "Claude 3 Haiku", value: "claude-3-haiku-20240307" },
  { name: "Claude 3.5 Sonnet", value: "claude-3-5-sonnet-latest" },
  { name: "Meta Llama 3 70B", value: "meta-llama-3-70b" },
  { name: "Meta Llama 3 8B", value: "meta-llama-3-8b" },
  { name: "Llama 3.1 70B", value: "llama-3-1-70b" },
  { name: "Llama 3.2 3B", value: "llama-3-2-3b" },
  { name: "Llama 3.1 8B", value: "llama-3-1-8b" },
  { name: "Llama 3.1 405B", value: "llama-3-1-405b" },
  { name: "Mixtral 8x7B", value: "mixtral-8x7b" },
  { name: "Open Mixtral 8x7B", value: "open-mixtral-8x7b" },
  { name: "Open Mixtral 8x22B", value: "open-mixtral-8x22b" },
  { name: "Open Mistral 7B", value: "open-mistral-7b" },
];

export type QuestionBankEntry = Omit<Question, 'column'>; 