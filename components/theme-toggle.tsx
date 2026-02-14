"use client";

import { Moon, Sun } from "lucide-react";
import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorageState<"light" | "dark">("theme", {
    defaultValue: "light"
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="cursor-pointer">
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
}
