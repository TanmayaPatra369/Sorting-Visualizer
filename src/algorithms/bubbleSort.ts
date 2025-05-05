import { createStep } from './algorithmUtils';

export const bubbleSort = (array: number[]) => {
  const steps = [];
  const arr = [...array];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Add comparison step
      steps.push(createStep('compare', [j, j + 1], [...arr]));
      
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push(createStep('swap', [j, j + 1], [...arr]));
      }
    }
    
    // Mark the last element in this pass as sorted
    steps.push(createStep('sorted', [n - i - 1], [...arr]));
  }
  
  // Mark the first element as sorted (it's the smallest)
  steps.push(createStep('sorted', [0], [...arr]));
  
  return steps;
};