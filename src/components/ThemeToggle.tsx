
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setTheme(isDarkMode ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 bg-background/50 backdrop-blur-sm"
    >
      <Sun className={`h-4 w-4 rotate-0 scale-100 transition-all ${theme === "dark" ? "opacity-0" : "opacity-100"}`} />
      <Moon className={`absolute h-4 w-4 rotate-90 scale-0 transition-all ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
