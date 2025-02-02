import { useState, useEffect } from "react";
import { GameLayout } from "@/components/GameLayout";
import { Button } from "../ui/button";
import { toast } from "sonner";

const words = ["typescript", "react", "javascript", "programming", "developer", "coding"];

export const SpeedTyping = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    generateNewWord();
  };

  const generateNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setUserInput("");
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      toast.info(`Game Over! Final score: ${score}`);
    }
  }, [isPlaying, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    if (e.target.value === currentWord) {
      setScore(score + 1);
      generateNewWord();
    }
  };

  return (
    <GameLayout title="Speed Typing">
      <div className="flex flex-col items-center space-y-6">
        {!isPlaying ? (
          <Button onClick={startGame}>Start Game</Button>
        ) : (
          <>
            <div className="text-2xl font-bold">Type: {currentWord}</div>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="border-2 border-primary rounded-md p-2 w-64"
              autoFocus
            />
            <div className="text-xl">Time left: {timeLeft}s</div>
            <div className="text-xl">Score: {score}</div>
          </>
        )}
      </div>
    </GameLayout>
  );
};