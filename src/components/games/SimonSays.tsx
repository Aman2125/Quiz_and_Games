import { useState, useEffect } from "react";
import { GameLayout } from "@/components/GameLayout";
import { Button } from "../ui/button";
import { toast } from "sonner";

const colors = ["red", "blue", "green", "yellow"];

export const SimonSays = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);

  const startGame = () => {
    setSequence([colors[Math.floor(Math.random() * colors.length)]]);
    setPlayerSequence([]);
    setIsPlaying(true);
    playSequence();
  };

  const playSequence = async () => {
    setIsShowingSequence(true);
    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setIsShowingSequence(false);
  };

  const handleColorClick = (color: string) => {
    if (isShowingSequence) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      toast.error("Game Over!");
      setIsPlaying(false);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      toast.success("Correct sequence!");
      const newSequence = [...sequence, colors[Math.floor(Math.random() * colors.length)]];
      setSequence(newSequence);
      setPlayerSequence([]);
      setTimeout(playSequence, 1000);
    }
  };

  return (
    <GameLayout title="Simon Says">
      <div className="flex flex-col items-center space-y-6">
        {!isPlaying ? (
          <Button onClick={startGame}>Start Game</Button>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {colors.map((color) => (
                <Button
                  key={color}
                  className="w-32 h-32 transition-opacity duration-200"
                  style={{
                    backgroundColor: color,
                    opacity: isShowingSequence && sequence[playerSequence.length] === color ? 1 : 0.7,
                  }}
                  onClick={() => handleColorClick(color)}
                  disabled={isShowingSequence}
                />
              ))}
            </div>
            <div className="text-xl">
              Sequence Length: {sequence.length}
            </div>
          </>
        )}
      </div>
    </GameLayout>
  );
};