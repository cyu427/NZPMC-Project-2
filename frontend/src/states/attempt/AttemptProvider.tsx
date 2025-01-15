import React, { useState } from 'react';
import { AttemptContext, Option } from './AttemptContext';

export const AttemptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Record<string, Option>>({}); // Initial state where all questions have no answer

  const setAnswer = (questionId: string, option: Option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const clearAnswers = () => {
    setAnswers({}); // Resets all answers
  };


  return (
    <AttemptContext.Provider value={{ answers, setAnswer, clearAnswers }}>
      {children}
    </AttemptContext.Provider>
  );
};
