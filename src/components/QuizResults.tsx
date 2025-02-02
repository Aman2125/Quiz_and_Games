import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Trophy, SkipForward, CheckCircle, XCircle } from "lucide-react";
import { Question } from "@/data/quiz-data";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  skippedQuestions: number;
  onRestart: () => void;
  answers: number[];
  questions: Question[];
}

export const QuizResults = ({ 
  score, 
  totalQuestions, 
  skippedQuestions,
  onRestart,
  answers,
  questions
}: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8"
    >
      <div className="inline-flex p-4 rounded-full bg-primary/10">
        <Trophy className="w-8 h-8 text-primary" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Quiz Complete!</h1>
        <p className="text-xl text-muted-foreground">
          You scored {score} out of {totalQuestions}
        </p>
      </div>

      <Card className="p-6 max-w-sm mx-auto">
        <div className="space-y-4">
          <div className="text-5xl font-bold text-primary">{percentage}%</div>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              {percentage >= 80
                ? "Excellent work!"
                : percentage >= 60
                ? "Good job!"
                : "Keep practicing!"}
            </p>
            <p className="text-sm text-muted-foreground">
              Skipped questions: {skippedQuestions}
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Question Review</h2>
        {questions.map((question, index) => (
          <Card key={index} className="p-4 text-left">
            <div className="flex items-start gap-4">
              {answers[index] === question.correctAnswer ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              ) : answers[index] === -1 ? (
                <SkipForward className="w-5 h-5 text-yellow-500 mt-1" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 mt-1" />
              )}
              <div>
                <p className="font-medium">{question.question}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Correct answer: {question.options[question.correctAnswer]}
                </p>
                {answers[index] !== -1 && answers[index] !== question.correctAnswer && (
                  <p className="text-sm text-red-500 mt-1">
                    Your answer: {question.options[answers[index]]}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={onRestart} size="lg">
        Try Again
      </Button>
    </motion.div>
  );
};