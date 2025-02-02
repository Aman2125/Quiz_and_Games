import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Question } from "@/data/quiz-data";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, SkipForward } from "lucide-react";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: number) => void;
  onTimeout: () => void;
  onSkip: () => void;
  timeLimit: number;
  showResult?: boolean;
  selectedAnswer?: number;
}

export const QuizQuestion = ({
  question,
  onAnswer,
  onTimeout,
  onSkip,
  timeLimit,
  showResult,
  selectedAnswer
}: QuizQuestionProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !answered) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, answered, onTimeout]);

  const handleAnswer = (index: number) => {
    if (!answered) {
      setAnswered(true);
      onAnswer(index);
    }
  };

  const getOptionClassName = (index: number) => {
    if (!showResult || selectedAnswer === undefined) return "quiz-option";
    if (index === question.correctAnswer) return "quiz-option correct";
    if (index === selectedAnswer && index !== question.correctAnswer)
      return "quiz-option incorrect";
    return "quiz-option";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
          <Progress value={(timeLeft / timeLimit) * 100} className="w-full max-w-[200px]" />
        </div>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
          <div className="grid gap-4">
            <AnimatePresence>
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={getOptionClassName(index)}
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              variant="ghost"
              onClick={onSkip}
              className="flex items-center gap-2"
              disabled={answered}
            >
              <SkipForward className="w-4 h-4" />
              Skip Question
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};