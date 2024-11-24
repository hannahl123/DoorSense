import React, { createContext, useContext, useState } from "react";
import { getColors } from "@/constants/Colors";

type Theme = {
  colors: ReturnType<typeof getColors>; // Infer the shape of the colors object
  toggleTheme: () => void;
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = {
    colors: getColors(themeMode),
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
