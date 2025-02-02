import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const games = [
  {
    title: "Snake Game",
    description: "Classic snake game with modern graphics",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    difficulty: "Medium",
    path: "/snake",
  },
  {
    title: "Tic Tac Toe",
    description: "Strategic two-player game",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    difficulty: "Easy",
    path: "/tictactoe",
  },
  {
    title: "Memory Match",
    description: "Test your memory skills",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    difficulty: "Hard",
    path: "/memory",
  },
  {
    title: "Word Puzzle",
    description: "Expand your vocabulary",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    difficulty: "Medium",
    path: "/word",
  },
  {
    title: "15 Puzzle",
    description: "Classic sliding puzzle game",
    image: "https://images.unsplash.com/photo-1509909756405-be0199881695",
    difficulty: "Hard",
    path: "/puzzle",
  },
  {
    title: "Math Challenge",
    description: "Test your multiplication skills",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
    difficulty: "Medium",
    path: "/math",
  },
  {
    title: "Color Match",
    description: "Match the correct colors",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    difficulty: "Easy",
    path: "/color",
  },
  {
    title: "Speed Typing",
    description: "How fast can you type?",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    difficulty: "Medium",
    path: "/typing",
  },
  {
    title: "Simon Says",
    description: "Follow the pattern",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387",
    difficulty: "Hard",
    path: "/simon",
  },
  {
    title: "Hangman",
    description: "Guess the word",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514",
    difficulty: "Medium",
    path: "/hangman",
  }
];

type Difficulty = "All" | "Easy" | "Medium" | "Hard";

export const FeaturedGames = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("All");
  const { toast } = useToast();

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Games loaded successfully!",
        duration: 2000,
      });
    }, 1500);
    return () => clearTimeout(timer);
  });

  const filteredGames = games.filter(
    (game) => selectedDifficulty === "All" || game.difficulty === selectedDifficulty
  );

  const difficulties: Difficulty[] = ["All", "Easy", "Medium", "Hard"];

  if (isLoading) {
    return (
      <div className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Featured Games
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-[250px] w-full rounded-lg" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
        Featured Games
      </h2>
      
      <div className="flex justify-center gap-2 mb-6">
        {difficulties.map((difficulty) => (
          <Button
            key={difficulty}
            variant={selectedDifficulty === difficulty ? "default" : "outline"}
            onClick={() => setSelectedDifficulty(difficulty)}
            className="transition-all duration-300"
          >
            {difficulty}
          </Button>
        ))}
      </div>

      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {filteredGames.map((game, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Link to={game.path} className="block h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 h-full"
                >
                  <Card className="overflow-hidden group h-[400px] flex flex-col">
                    <div className="relative h-[250px] flex-shrink-0">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm text-white
                        ${game.difficulty === 'Easy' ? 'bg-green-500' : 
                          game.difficulty === 'Medium' ? 'bg-yellow-500' : 
                          'bg-red-500'}`}>
                        {game.difficulty}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between bg-card">
                      <h3 className="text-2xl font-semibold mb-2">{game.title}</h3>
                      <p className="text-muted-foreground text-lg">{game.description}</p>
                    </div>
                  </Card>
                </motion.div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
