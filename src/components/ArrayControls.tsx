import React, { useState } from 'react';
import { useSorting } from '../contexts/SortingContext';
import { Shuffle, RotateCcw } from 'lucide-react';

const ArrayControls: React.FC = () => {
  const { 
    generateRandomArray, 
    setCustomArray, 
    resetArray,
    array,
    isSorting,
    arraySize,
    setArraySize
  } = useSorting();
  
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleCustomArray = () => {
    try {
      if (!inputValue.trim()) {
        setError('Please enter some numbers');
        return;
      }
      
      const numbers = inputValue.split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));
      
      if (numbers.length < 2) {
        setError('Please enter at least 2 valid numbers');
        return;
      }
      
      setCustomArray(numbers);
      setError('');
    } catch (err) {
      setError('Invalid input. Please enter comma-separated numbers.');
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Array Controls</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isSorting}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => generateRandomArray()}
            disabled={isSorting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            <Shuffle className="h-4 w-4" />
            <span>Generate Random</span>
          </button>
          
          <button
            onClick={() => resetArray()}
            disabled={isSorting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Custom Array (comma-separated)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSorting}
              placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCustomArray}
              disabled={isSorting}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
            >
              Set Array
            </button>
          </div>
          {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ArrayControls;