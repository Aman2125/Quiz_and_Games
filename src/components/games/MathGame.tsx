import { useState } from "react";
import { GameLayout } from "@/components/GameLayout";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const MathGame = () => {
  const [score, setScore] = useState(0);
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState("");

  const generateNewProblem = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setUserAnswer("");
  };

  const checkAnswer = () => {
    const correctAnswer = num1 * num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 1);
      toast.success("Correct answer!");
      generateNewProblem();
    } else {
      toast.error("Wrong answer, try again!");
    }
  };

  return (
    <GameLayout title="Math Challenge">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-4xl font-bold">
          {num1} × {num2} = ?
        </div>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="border-2 border-primary rounded-md p-2 w-32 text-center text-2xl"
        />
        <Button onClick={checkAnswer}>Check Answer</Button>
        <div className="text-2xl">Score: {score}</div>
      </div>
    </GameLayout>
  );
};