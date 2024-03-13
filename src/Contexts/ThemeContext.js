import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const themeSave = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(themeSave);

  const buttonTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        buttonTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
