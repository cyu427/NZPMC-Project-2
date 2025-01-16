import DifficultyType from "../../../components/admin/questions/CreateQuestion/fields/fieldTypes/DifficultyType";
import TopicType from "../../../components/admin/questions/CreateQuestion/fields/fieldTypes/TopicType";
import { CreateQuestionFormData } from "../../../schema/question/createQuestionSchema";

export interface Option {
    text: string;
    isCorrect: boolean;
    id?: number;
}

export interface QuestionPayload {
    question: string;
    options: Option[];
    difficulty: string;
    topic: string;
}

export const createQuestionMapping = (data: CreateQuestionFormData): QuestionPayload => {
    return {
        question: data.question,
        difficulty: data.difficulty,
        topic: data.topic,
        options: [
          { text: data.option1, isCorrect: data.answer1 },
          { text: data.option2, isCorrect: data.answer2 },
          { text: data.option3, isCorrect: data.answer3 },
          { text: data.option4, isCorrect: data.answer4 },
        ],
      };
  };

