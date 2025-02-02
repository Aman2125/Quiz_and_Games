import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { GameLayout } from "./GameLayout";

const WORDS = ["REACT", "TYPESCRIPT", "JAVASCRIPT", "PROGRAMMING", "DEVELOPER"];

export function WordPuzzle() {
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    newGame();
  }, []);

  const scrambleWord = (word: string) => {
    const arr = word.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  };

  const newGame = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setGuess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.toUpperCase() === currentWord) {
      toast({
        title: "Correct!",
        description: "Well done! Try another word.",
      });
      setScore(s => s + 1);
      newGame();
    } else {
      toast({
        title: "Incorrect",
        description: "Try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <GameLayout title="Word Puzzle">
      <div className="flex flex-col items-center gap-6">
        <div className="text-2xl font-bold">Score: {score}</div>
        <div className="text-4xl font-bold tracking-wider">{scrambledWord}</div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <Input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value.toUpperCase())}
            placeholder="Enter your guess"
            className="text-center uppercase"
            maxLength={currentWord.length}
          />
          <div className="space-x-4">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline" onClick={newGame}>
              New Word
            </Button>
          </div>
        </form>
      </div>
    </GameLayout>
  );
}