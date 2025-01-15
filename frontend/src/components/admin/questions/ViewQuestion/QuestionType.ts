export interface Choice {
    text: string;
    isCorrect: boolean;
    id?: number;
}

interface QuestionType {
    question: string;
    options: Choice[];
}

export default QuestionType;