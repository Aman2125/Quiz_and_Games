import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster as SonnerToaster } from "sonner";
import Index from "./pages/Index";
import Progress from "./pages/Progress";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const SnakeGame = lazy(() => import("./components/games/SnakeGame").then(module => ({ default: module.SnakeGame })));
const TicTacToe = lazy(() => import("./components/games/TicTacToe").then(module => ({ default: module.TicTacToe })));
const MemoryMatch = lazy(() => import("./components/games/MemoryMatch").then(module => ({ default: module.MemoryMatch })));
const WordPuzzle = lazy(() => import("./components/games/WordPuzzle").then(module => ({ default: module.WordPuzzle })));
const PuzzleGame = lazy(() => import("./components/games/PuzzleGame").then(module => ({ default: module.PuzzleGame })));
const MathGame = lazy(() => import("./components/games/MathGame").then(module => ({ default: module.MathGame })));
const ColorMatch = lazy(() => import("./components/games/ColorMatch").then(module => ({ default: module.ColorMatch })));
const SpeedTyping = lazy(() => import("./components/games/SpeedTyping").then(module => ({ default: module.SpeedTyping })));
const SimonSays = lazy(() => import("./components/games/SimonSays").then(module => ({ default: module.SimonSays })));
const Hangman = lazy(() => import("./components/games/Hangman").then(module => ({ default: module.Hangman })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
        throwOnError: true,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/snake" element={<SnakeGame />} />
              <Route path="/tictactoe" element={<TicTacToe />} />
              <Route path="/memory" element={<MemoryMatch />} />
              <Route path="/word" element={<WordPuzzle />} />
              <Route path="/puzzle" element={<PuzzleGame />} />
              <Route path="/math" element={<MathGame />} />
              <Route path="/color" element={<ColorMatch />} />
              <Route path="/typing" element={<SpeedTyping />} />
              <Route path="/simon" element={<SimonSays />} />
              <Route path="/hangman" element={<Hangman />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;