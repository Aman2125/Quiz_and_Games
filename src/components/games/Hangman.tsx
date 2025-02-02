import { useState, useEffect } from "react";
import { GameLayout } from "@/components/GameLayout";
import { Button } from "../ui/button";
import { toast } from "sonner";

const words = ["REACT", "TYPESCRIPT", "JAVASCRIPT", "PROGRAMMING", "DEVELOPER"];

export const Hangman = () => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [remainingGuesses, setRemainingGuesses] = useState(6);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setRemainingGuesses(6);
    setGameStatus("playing");
  };

  useEffect(() => {
    startGame();
  }, []);

  const guessLetter = (letter: string) => {
    if (gameStatus !== "playing") return;

    if (!guessedLetters.includes(letter)) {
      const newGuessedLetters = [...guessedLetters, letter];
      setGuessedLetters(newGuessedLetters);

      if (!word.includes(letter)) {
        const newRemainingGuesses = remainingGuesses - 1;
        setRemainingGuesses(newRemainingGuesses);
        
        if (newRemainingGuesses === 0) {
          setGameStatus("lost");
          toast.error("Game Over! The word was: " + word);
        }
      } else if (word.split("").every(char => newGuessedLetters.includes(char))) {
        setGameStatus("won");
        toast.success("Congratulations! You won!");
      }
    }
  };

  const displayWord = word
    .split("")
    .map(letter => guessedLetters.includes(letter) ? letter : "_")
    .join(" ");

  return (
    <GameLayout title="Hangman">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-4xl font-mono">{displayWord}</div>
        <div className="text-xl">Remaining Guesses: {remainingGuesses}</div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
            <Button
              key={letter}
              onClick={() => guessLetter(letter)}
              disabled={guessedLetters.includes(letter) || gameStatus !== "playing"}
              className="w-10 h-10"
            >
              {letter}
            </Button>
          ))}
        </div>
        {gameStatus !== "playing" && (
          <Button onClick={startGame}>Play Again</Button>
        )}
      </div>
    </GameLayout>
  );
};