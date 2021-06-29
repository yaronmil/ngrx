export interface ServerQuestion {
  id: string
  difficulty?: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[]
  allAnswersRandomly?: string[];
}

export interface Question {
  id: number
  question: string;
  answers: answer[];
}
export interface answer {
  answerText: string, isCorrect: boolean, isSelected?: boolean
}
