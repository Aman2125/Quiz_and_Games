import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Clock } from "lucide-react";
import { getProgress } from "@/utils/storage";

type TimeFrame = "daily" | "weekly" | "allTime";
type LeaderboardEntry = {
  name: string;
  score: number;
  game: string;
  date: string;
};

export const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");
  const progress = getProgress();

  // Simulate leaderboard data (replace with real data when available)
  const leaderboardData: Record<TimeFrame, LeaderboardEntry[]> = {
    daily: [
      { name: "Player 1", score: 1200, game: "Snake", date: new Date().toISOString() },
      { name: "Player 2", score: 1100, game: "Memory Match", date: new Date().toISOString() },
      { name: "Player 3", score: 1000, game: "Word Puzzle", date: new Date().toISOString() },
    ],
    weekly: [
      { name: "Player 4", score: 5000, game: "Snake", date: new Date().toISOString() },
      { name: "Player 5", score: 4800, game: "TicTacToe", date: new Date().toISOString() },
      { name: "Player 6", score: 4600, game: "Memory Match", date: new Date().toISOString() },
    ],
    allTime: [
      { name: "Player 7", score: 10000, game: "Snake", date: new Date().toISOString() },
      { name: "Player 8", score: 9500, game: "Word Puzzle", date: new Date().toISOString() },
      { name: "Player 9", score: 9000, game: "Memory Match", date: new Date().toISOString() },
    ],
  };

  const getIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Global Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily" onClick={() => setTimeFrame("daily")}>
                <Clock className="h-4 w-4 mr-2" />
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" onClick={() => setTimeFrame("weekly")}>
                Weekly
              </TabsTrigger>
              <TabsTrigger value="allTime" onClick={() => setTimeFrame("allTime")}>
                All Time
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {["daily", "weekly", "allTime"].map((period) => (
                <TabsContent key={period} value={period}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {leaderboardData[period as TimeFrame].map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-card rounded-lg border"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8">
                            {getIcon(index)}
                          </div>
                          <div>
                            <p className="font-semibold">{entry.name}</p>
                            <p className="text-sm text-muted-foreground">{entry.game}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{entry.score.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};