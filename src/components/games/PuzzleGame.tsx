import { useState, useEffect } from "react";
import { GameLayout } from "./GameLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const PuzzleGame = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);

  const initializePuzzle = () => {
    const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
    numbers.push(0); // Empty tile
    shuffleTiles(numbers);
  };

  const shuffleTiles = (numbers: number[]) => {
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setTiles(numbers);
    setIsWon(false);
    setMoves(0);
  };

  const handleTileClick = (index: number) => {
    if (isWon) return;

    const emptyIndex = tiles.indexOf(0);
    if (!isAdjacent(index, emptyIndex)) return;

    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);
    setMoves(moves + 1);

    if (isSolved(newTiles)) {
      setIsWon(true);
      toast.success("Congratulations! You solved the puzzle!", {
        description: `You completed it in ${moves + 1} moves!`
      });
    }
  };

  const isAdjacent = (index1: number, index2: number) => {
    const row1 = Math.floor(index1 / 4);
    const col1 = index1 % 4;
    const row2 = Math.floor(index2 / 4);
    const col2 = index2 % 4;
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  const isSolved = (currentTiles: number[]) => {
    return currentTiles.every((tile, index) => 
      index === currentTiles.length - 1 ? tile === 0 : tile === index + 1
    );
  };

  useEffect(() => {
    initializePuzzle();
  }, []);

  return (
    <GameLayout title="15 Puzzle">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-4 gap-2 p-4 bg-card rounded-lg shadow-lg">
          {tiles.map((tile, index) => (
            <Button
              key={index}
              onClick={() => handleTileClick(index)}
              variant={tile === 0 ? "ghost" : "secondary"}
              className={`h-16 w-full text-xl font-bold ${
                tile === 0 ? "invisible" : ""
              } transition-all hover:scale-105`}
              disabled={isWon}
            >
              {tile === 0 ? "" : tile}
            </Button>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg">Moves: {moves}</p>
          <Button onClick={() => initializePuzzle()} variant="outline">
            New Game
          </Button>
        </div>
      </div>
    </GameLayout>
  );
};