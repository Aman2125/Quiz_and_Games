import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Trophy, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAchievements, getDailyStreak } from "@/utils/storage";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Confetti from 'react-confetti';
import { useWindowSize } from "@/hooks/use-window-size";
import { playSound } from "@/utils/sound";

export const Achievements = () => {
  const [achievements, setAchievements] = useState(() => getAchievements());
  const [animateAchievement, setAnimateAchievement] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(() => getDailyStreak());
  const { width, height } = useWindowSize();

  useEffect(() => {
    const updateAchievements = () => {
      const newAchievements = getAchievements();
      const currentStreak = getDailyStreak();
      
      // Check for newly completed achievements
      Object.entries(newAchievements).forEach(([key, value]) => {
        if (value.progress === value.total && achievements[key].progress !== value.total) {
          setAnimateAchievement(key);
          setShowConfetti(true);
          playSound('success');
          setTimeout(() => {
            setAnimateAchievement(null);
            setShowConfetti(false);
          }, 3000);
        }
      });
      
      setAchievements(newAchievements);
      setStreak(currentStreak);
    };

    updateAchievements();
    window.addEventListener('storage', updateAchievements);
    window.addEventListener('gameCompleted', updateAchievements);

    return () => {
      window.removeEventListener('storage', updateAchievements);
      window.removeEventListener('gameCompleted', updateAchievements);
    };
  }, [achievements]);

  const achievementsList = [
    {
      key: "dailyChallenger",
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Daily Challenger",
      description: "Complete 5 daily challenges",
      progress: achievements.dailyChallenger.progress,
      total: achievements.dailyChallenger.total
    },
    {
      key: "perfectScore",
      icon: <Star className="h-8 w-8 text-purple-500" />,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      progress: achievements.perfectScore.progress,
      total: achievements.perfectScore.total,
      completed: achievements.perfectScore.completed
    },
    {
      key: "quizMaster",
      icon: <Award className="h-8 w-8 text-blue-500" />,
      title: "Quiz Master",
      description: "Complete all category quizzes",
      progress: achievements.quizMaster.progress,
      total: achievements.quizMaster.total
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      <Card className="md:p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl">Achievements</CardTitle>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-yellow-500" />
            <span className="font-bold">{streak} Day Streak!</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <AnimatePresence>
              {achievementsList.map((achievement) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: animateAchievement === achievement.key ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    delay: 0.1,
                    duration: animateAchievement === achievement.key ? 0.5 : 0.2
                  }}
                  className={`p-4 rounded-lg border ${
                    achievement.completed
                      ? "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20"
                      : "bg-card border-border"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    {achievement.icon}
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    {!achievement.completed && (
                      <div className="w-full space-y-2">
                        <Progress 
                          value={(achievement.progress / achievement.total) * 100} 
                          className="h-2"
                        />
                        <p className="text-sm font-medium">
                          Progress: {achievement.progress}/{achievement.total}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};