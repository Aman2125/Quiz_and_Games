import { useState } from "react";
import { CategorySelection } from "@/components/CategorySelection";
import { QuizQuestion } from "@/components/QuizQuestion";
import { QuizResults } from "@/components/QuizResults";
import { Category, getQuestionsByCategory, shuffleArray } from "@/data/quiz-data";
import { AnimatePresence, motion } from "framer-motion";
import { saveQuizResult } from "@/utils/storage";
import { useToast } from "@/components/ui/use-toast";
import { playSound } from "@/utils/sound";
import ReactConfetti from 'react-confetti';
import { useWindowSize } from "@/hooks/use-window-size";

const TIME_LIMIT = 30;

type QuizState = "category" | "quiz" | "results";

export const QuizSection = () => {
  const [quizState, setQuizState] = useState<QuizState>("category");
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [questions, setQuestions] = useState<ReturnType<typeof getQuestionsByCategory>>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const { toast } = useToast();

  const handleCategorySelect = (category: Category) => {
    playSound('click');
    const shuffledQuestions = shuffleArray(getQuestionsByCategory(category));
    setCurrentCategory(category);
    setQuestions(shuffledQuestions);
    setQuizState("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setSkippedQuestions([]);
  };

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      playSound('success');
      setScore((prev) => prev + 1);
      toast({
        title: "Correct!",
        description: "Well done! Keep going!",
        duration: 1500,
      });
    } else {
      playSound('error');
      toast({
        title: "Incorrect",
        description: "Don't worry, keep trying!",
        duration: 1500,
      });
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        handleQuizComplete();
      }
    }, 1500);
  };

  const handleSkipQuestion = () => {
    playSound('click');
    setSkippedQuestions((prev) => [...prev, currentQuestionIndex]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    playSound('complete');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    
    if (currentCategory) {
      saveQuizResult({
        date: new Date().toISOString(),
        category: currentCategory,
        score,
        totalQuestions: questions.length,
      });
    }
    setQuizState("results");
  };

  const handleTimeout = () => {
    playSound('error');
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = -1;
    setAnswers(newAnswers);

    toast({
      title: "Time's up!",
      description: "Moving to the next question...",
      duration: 1500,
    });

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        handleQuizComplete();
      }
    }, 1000);
  };

  const handleRestart = () => {
    playSound('click');
    setQuizState("category");
    setCurrentCategory(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setSkippedQuestions([]);
  };

  return (
    <>
      {showConfetti && <ReactConfetti width={width} height={height} />}
      <AnimatePresence mode="wait">
        {quizState === "category" && (
          <CategorySelection onSelectCategory={handleCategorySelect} />
        )}

        {quizState === "quiz" && questions[currentQuestionIndex] && (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground text-center"
            >
              Question {currentQuestionIndex + 1} of {questions.length}
            </motion.div>
            
            <QuizQuestion
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              onTimeout={handleTimeout}
              timeLimit={TIME_LIMIT}
              showResult={answers[currentQuestionIndex] !== undefined}
              selectedAnswer={answers[currentQuestionIndex]}
              onSkip={handleSkipQuestion}
            />
          </div>
        )}

        {quizState === "results" && (
          <QuizResults
            score={score}
            totalQuestions={questions.length}
            onRestart={handleRestart}
            skippedQuestions={skippedQuestions.length}
            answers={answers}
            questions={questions}
          />
        )}
      </AnimatePresence>
    </>
  );
};