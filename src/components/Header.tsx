import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Trophy, LogIn } from "lucide-react";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm w-full">
      <div className="max-w-[2000px] mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
        >
          Quiz & Games
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/progress")}
            className="flex items-center gap-2 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <Trophy className="h-4 w-4" />
            Progress & Games
          </Button>
          {isLoggedIn ? (
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Button>
              <Button
                variant="default"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};