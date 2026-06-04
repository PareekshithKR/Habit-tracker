import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      <div
        className={
          darkMode
            ? "dark bg-slate-900 min-h-screen"
            : "bg-slate-100 min-h-screen"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}