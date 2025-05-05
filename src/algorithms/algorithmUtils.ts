import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';
import { shellSort } from './shellSort';

// Map algorithm names to their implementation functions
const algorithms: Record<string, (arr: number[]) => any[]> = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  shellSort,
};

// Generate visualization steps for the selected algorithm
export const generateSteps = (array: number[], algorithmName: string): any[] => {
  const algorithmFunction = algorithms[algorithmName];
  
  if (!algorithmFunction) {
    console.error(`Algorithm "${algorithmName}" not found`);
    return [];
  }
  
  return algorithmFunction([...array]);
};

// Helper function to create a deep copy of an array
export const createArrayCopy = (arr: number[]): number[] => {
  return [...arr];
};

// Helper function to create a step object
export const createStep = (
  type: 'compare' | 'swap' | 'sorted', 
  indices: number[], 
  array: number[]
) => {
  return {
    type,
    indices,
    array: [...array],
  };
};