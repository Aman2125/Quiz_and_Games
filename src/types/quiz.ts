export interface QuizHistory {
  date: string;
  category: string;
  score: number;
  totalQuestions: number;
}

export interface UserProgress {
  history: QuizHistory[];
  highScores: Record<string, number>;
}