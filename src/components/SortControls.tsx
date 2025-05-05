import React from 'react';
import { useSorting } from '../contexts/SortingContext';
import { Play, Pause, Clock } from 'lucide-react';
import { ALGORITHM_OPTIONS } from '../constants/algorithms';

const SortControls: React.FC = () => {
  const {
    selectedAlgorithm,
    setSelectedAlgorithm,
    animationSpeed,
    setAnimationSpeed,
    startSorting,
    pauseSorting,
    resumeSorting,
    isSorting,
    isPaused,
    currentStep
  } = useSorting();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md h-full">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Sorting Controls</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Algorithm
          </label>
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            disabled={isSorting}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ALGORITHM_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Animation Speed
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
        
        <div className="pt-2">
          {!isSorting ? (
            <button
              onClick={startSorting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Start Sorting</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={resumeSorting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={pauseSorting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
            >
              <Pause className="h-4 w-4" />
              <span>Pause</span>
            </button>
          )}
        </div>
        
        {isSorting && (
          <div className="flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 mt-2">
            <Clock className="h-4 w-4 mr-1" />
            <span>Steps: {currentStep}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortControls;