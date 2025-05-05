import { createStep } from './algorithmUtils';

export const insertionSort = (array: number[]) => {
  const steps = [];
  const arr = [...array];
  const n = arr.length;
  
  // First element is already sorted
  steps.push(createStep('sorted', [0], [...arr]));
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Compare with already sorted elements
    steps.push(createStep('compare', [i, j], [...arr]));
    
    while (j >= 0 && arr[j] > key) {
      // Shift elements to the right
      arr[j + 1] = arr[j];
      steps.push(createStep('swap', [j, j + 1], [...arr]));
      j--;
      
      if (j >= 0) {
        steps.push(createStep('compare', [j, j + 1], [...arr]));
      }
    }
    
    arr[j + 1] = key;
    
    // Mark this element as sorted
    steps.push(createStep('sorted', [i], [...arr]));
  }
  
  return steps;
};