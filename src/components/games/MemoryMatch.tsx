import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { GameLayout } from "./GameLayout";
import { motion } from "framer-motion";

const CARDS = [
  "🌟", "🎮", "🎲", "🎯", "🎨", "🎭",
  "🌟", "🎮", "🎲", "🎯", "🎨", "🎭"
];

export function MemoryMatch() {
  const [cards, setCards] = useState(() => shuffleCards([...CARDS]));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length === 2) {
      if (cards[flipped[0]] === cards[flipped[1]]) {
        setMatched([...matched, ...flipped]);
        setFlipped([]);
        if (matched.length === cards.length - 2) {
          toast({
            title: "Congratulations!",
            description: `You won in ${moves + 1} moves!`,
          });
        }
      } else {
        const timer = setTimeout(() => setFlipped([]), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, cards, matched, moves]);

  const handleCardClick = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped([...flipped, index]);
      setMoves(m => m + 1);
    }
  };

  const resetGame = () => {
    setCards(shuffleCards([...CARDS]));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <GameLayout title="Memory Match">
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg mb-4">Moves: {moves}</div>
        <div className="grid grid-cols-4 gap-4 w-full max-w-md mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square flex items-center justify-center text-3xl cursor-pointer rounded-lg ${
                flipped.includes(index) || matched.includes(index)
                  ? "bg-primary text-white"
                  : "bg-secondary"
              }`}
              onClick={() => handleCardClick(index)}
            >
              {(flipped.includes(index) || matched.includes(index)) && card}
            </motion.div>
          ))}
        </div>
        <Button onClick={resetGame} className="mt-4">Reset Game</Button>
      </div>
    </GameLayout>
  );
}

function shuffleCards(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}