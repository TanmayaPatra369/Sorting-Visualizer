import React from "react";
import "./index.css";
import { SortingProvider } from "./contexts/SortingContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import SortingVisualizer from "./components/SortingVisualizer";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider>
      <SortingProvider>
        <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <Header />
            <SortingVisualizer />
          </div>
        </div>
      </SortingProvider>
    </ThemeProvider>
  );
}

export default App;
