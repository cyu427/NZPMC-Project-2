export interface Choice {
    text: string;
    isCorrect: boolean;
    id?: number;
}

interface QuestionType {
    title: string;
    options: Choice[];
    id?: string;
}

export default QuestionType;