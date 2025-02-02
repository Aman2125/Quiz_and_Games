import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export const UserPreferences = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedSound = localStorage.getItem("soundEnabled");
    const savedTheme = localStorage.getItem("theme");
    if (savedSound) setIsSoundEnabled(savedSound === "true");
    if (savedTheme) setIsDarkMode(savedTheme === "dark");
  }, []);

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    localStorage.setItem("soundEnabled", (!isSoundEnabled).toString());
    toast({
      title: !isSoundEnabled ? "Sound Enabled" : "Sound Disabled",
      duration: 1500,
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
    toast({
      title: !isDarkMode ? "Dark Mode Enabled" : "Light Mode Disabled",
      duration: 1500,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 right-4 flex gap-2"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSound}
        className="rounded-full"
      >
        {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full"
      >
        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </motion.div>
  );
};