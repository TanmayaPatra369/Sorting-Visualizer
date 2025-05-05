import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { BarChart2, Moon, Sun } from "lucide-react";

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        <BarChart2 className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Sorting Visualizer
        </h1>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-6 w-6 text-yellow-400" />
        ) : (
          <Moon className="h-6 w-6 text-indigo-600" />
        )}
      </button>
    </header>
  );
};

export default Header;
