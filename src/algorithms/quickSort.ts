import { createStep } from './algorithmUtils';

export const quickSort = (array: number[]) => {
  const steps: any[] = [];
  const arr = [...array];
  
  quickSortHelper(arr, 0, arr.length - 1, steps);
  
  return steps;
};

const quickSortHelper = (
  arr: number[], 
  low: number, 
  high: number, 
  steps: any[]
) => {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, steps);
    
    // Mark pivot as sorted
    steps.push(createStep('sorted', [pivotIndex], [...arr]));
    
    // Sort elements before and after partition
    quickSortHelper(arr, low, pivotIndex - 1, steps);
    quickSortHelper(arr, pivotIndex + 1, high, steps);
  } else if (low === high) {
    // Single element is already sorted
    steps.push(createStep('sorted', [low], [...arr]));
  }
};

const partition = (
  arr: number[], 
  low: number, 
  high: number, 
  steps: any[]
) => {
  // Using the last element as pivot
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // Compare current element with pivot
    steps.push(createStep('compare', [j, high], [...arr]));
    
    if (arr[j] <= pivot) {
      i++;
      
      // Swap elements
      if (i !== j) {
        steps.push(createStep('swap', [i, j], [...arr]));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push(createStep('swap', [i, j], [...arr]));
      }
    }
  }
  
  // Place pivot in the correct position
  if (i + 1 !== high) {
    steps.push(createStep('swap', [i + 1, high], [...arr]));
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push(createStep('swap', [i + 1, high], [...arr]));
  }
  
  return i + 1;
};