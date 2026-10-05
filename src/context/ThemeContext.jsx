import { createContext, useCallback, useContext, useMemo } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

// ==========================================
// CONTEXT
// ==========================================

const ThemeContext = createContext(null);

// ==========================================
// PROVIDER
// ==========================================

export function ThemeProvider({ children }) {
  // Lưu theme vào localStorage để F5 không bị mất
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  // useMemo để value không bị tạo mới mỗi lần render
  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ==========================================
// CUSTOM HOOK
// ==========================================

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme phải được dùng bên trong ThemeProvider");
  }

  return context;
}

export default ThemeContext;
