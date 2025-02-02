import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const { toast } = useToast();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    
    toast({
      title: `${theme.charAt(0).toUpperCase() + theme.slice(1)} mode activated`,
      duration: 1500
    });
    
    console.log('Theme:', theme); // Log the current theme to check it
  }, [theme, toast]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="relative overflow-hidden transition-colors hover:bg-accent"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'light' ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className="relative w-5 h-5"
        >
          <Sun className={`absolute inset-0 transition-all duration-300 
            ${theme === 'light' ? 'opacity-100 transform-none' : 'opacity-0 rotate-90'}`} 
          />
          <Moon className={`absolute inset-0 transition-all duration-300
            ${theme === 'dark' ? 'opacity-100 transform-none' : 'opacity-0 rotate-0'}`} 
          />
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}
