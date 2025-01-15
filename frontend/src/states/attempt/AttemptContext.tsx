import { createContext } from 'react';

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Answer {
  attempt: Record<string, Option>;
}

export interface AttemptContextType {
  answers: Answer['attempt'];
  setAnswer: (questionId: string, option: Option) => void;
  clearAnswers: () => void;
}

export const AttemptContext = createContext<AttemptContextType | undefined>(undefined);