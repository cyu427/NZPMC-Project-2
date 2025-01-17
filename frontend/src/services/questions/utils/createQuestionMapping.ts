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

export const mapToQuestionFormData = (question: QuestionPayload): CreateQuestionFormData => {
    return {
        question: question.question,
        difficulty: question.difficulty as DifficultyType,
        topic: question.topic as TopicType,
        option1: question.options[0].text,
        answer1: question.options[0].isCorrect,
        option2: question.options[1].text,
        answer2: question.options[1].isCorrect,
        option3: question.options[2].text,
        answer3: question.options[2].isCorrect,
        option4: question.options[3].text,
        answer4: question.options[3].isCorrect,
    };
};

