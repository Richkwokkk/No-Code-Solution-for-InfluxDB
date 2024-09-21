import { useTheme } from "next-themes";

export function useIsDarkMode() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return currentTheme === "dark";
}
