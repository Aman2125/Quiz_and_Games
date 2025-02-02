import { useState, useEffect } from "react";
import { GameLayout } from "@/components/GameLayout";
import { Button } from "../ui/button";
import { toast } from "sonner";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

export const ColorMatch = () => {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const generateRound = () => {
    const newTargetColor = colors[Math.floor(Math.random() * colors.length)];
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!shuffledColors.includes(newTargetColor)) {
      shuffledColors[0] = newTargetColor;
    }
    setTargetColor(newTargetColor);
    setOptions(shuffledColors.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleColorClick = (color: string) => {
    if (color === targetColor) {
      setScore(score + 1);
      toast.success("Correct match!");
      generateRound();
    } else {
      toast.error("Wrong match, try again!");
    }
  };

  return (
    <GameLayout title="Color Match">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-2xl font-bold">Match this color: {targetColor}</div>
        <div className="grid grid-cols-2 gap-4">
          {options.map((color, index) => (
            <Button
              key={index}
              className="w-32 h-32"
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>
        <div className="text-2xl">Score: {score}</div>
      </div>
    </GameLayout>
  );
};