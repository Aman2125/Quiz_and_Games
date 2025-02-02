import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedGames } from "@/components/FeaturedGames";
import { QuizSection } from "@/components/quiz/QuizSection";
import { DailyChallenge } from "@/components/DailyChallenge";
import { Achievements } from "@/components/Achievements";
import { UserPreferences } from "@/components/UserPreferences";
import { Leaderboard } from "@/components/Leaderboard";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          <HeroSection />
          <DailyChallenge />
          <Achievements />
          <Leaderboard />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <FeaturedGames />
          </motion.div>
          <QuizSection />
        </div>
      </main>
      <UserPreferences />
      <Footer />
    </div>
  );
};

export default Index;