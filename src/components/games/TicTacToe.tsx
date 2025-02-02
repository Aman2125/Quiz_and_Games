import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { GameLayout } from "./GameLayout";

export function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || calculateWinner(board)) return;
    
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      toast({
        title: "Game Over!",
        description: `Player ${winner} wins!`,
      });
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <GameLayout title="Tic Tac Toe">
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {board.map((square, i) => (
            <Button
              key={i}
              variant="outline"
              className="h-16 text-2xl font-bold"
              onClick={() => handleClick(i)}
            >
              {square}
            </Button>
          ))}
        </div>
        <Button onClick={resetGame}>Reset Game</Button>
      </div>
    </GameLayout>
  );
}