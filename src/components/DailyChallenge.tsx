import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Category, getQuestionsByCategory, shuffleArray } from "@/data/quiz-data";
import { Progress } from "@/components/ui/progress";

export const DailyChallenge = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const checkAvailability = () => {
      const lastPlayed = localStorage.getItem("lastDailyChallenge");
      const today = new Date().toDateString();
      setIsAvailable(!lastPlayed || lastPlayed !== today);
      
      if (lastPlayed && lastPlayed === today) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const timeToNext = tomorrow.getTime() - Date.now();
        const hours = Math.floor(timeToNext / (1000 * 60 * 60));
        const minutes = Math.floor((timeToNext % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${minutes}m`);
      }
    };

    // Load streak from localStorage
    const savedStreak = localStorage.getItem("challengeStreak");
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000);
    return () => clearInterval(interval);
  }, []);

  const startChallenge = () => {
    if (!isAvailable) {
      toast({
        title: "Challenge not available",
        description: `Next challenge available in ${timeLeft}`,
        duration: 3000,
      });
      return;
    }

    localStorage.setItem("lastDailyChallenge", new Date().toDateString());
    setIsAvailable(false);
    
    const categories: Category[] = ["General Knowledge", "Science", "History", "Technology"];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const questions = shuffleArray(getQuestionsByCategory(randomCategory)).slice(0, 5);
    
    // Update streak
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem("challengeStreak", newStreak.toString());
    
    // Simulate progress
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress += 10;
        setProgress(currentProgress);
      } else {
        clearInterval(progressInterval);
      }
    }, 500);

    toast({
      title: "Daily Challenge Started!",
      description: `Category: ${randomCategory} | Current Streak: ${newStreak}`,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Daily Challenge
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm">Streak: {streak}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                {isAvailable ? (
                  <p className="text-green-500">New challenge available!</p>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Next challenge in {timeLeft}</span>
                  </div>
                )}
              </div>
              <Button
                onClick={startChallenge}
                disabled={!isAvailable}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Start Challenge
              </Button>
            </div>
            {progress > 0 && progress < 100 && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-center text-muted-foreground">
                  Challenge in progress...
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};