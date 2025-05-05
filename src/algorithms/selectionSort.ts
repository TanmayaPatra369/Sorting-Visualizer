import { createStep } from './algorithmUtils';

export const selectionSort = (array: number[]) => {
  const steps = [];
  const arr = [...array];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      // Add comparison step
      steps.push(createStep('compare', [minIndex, j], [...arr]));
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // If minIndex changed, swap elements
    if (minIndex !== i) {
      steps.push(createStep('swap', [i, minIndex], [...arr]));
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      steps.push(createStep('swap', [i, minIndex], [...arr]));
    }
    
    // Mark this element as sorted
    steps.push(createStep('sorted', [i], [...arr]));
  }
  
  // Mark the last element as sorted
  steps.push(createStep('sorted', [n - 1], [...arr]));
  
  return steps;
};