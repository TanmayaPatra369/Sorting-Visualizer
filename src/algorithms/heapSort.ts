import { createStep } from './algorithmUtils';

export const heapSort = (array: number[]) => {
  const steps: any[] = [];
  const arr = [...array];
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, steps);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    steps.push(createStep('swap', [0, i], [...arr]));
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push(createStep('swap', [0, i], [...arr]));
    
    // Mark the element as sorted
    steps.push(createStep('sorted', [i], [...arr]));
    
    // Call heapify on the reduced heap
    heapify(arr, i, 0, steps);
  }
  
  // Mark the first element as sorted
  steps.push(createStep('sorted', [0], [...arr]));
  
  return steps;
};

const heapify = (
  arr: number[], 
  n: number, 
  i: number, 
  steps: any[]
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Compare with left child
  if (left < n) {
    steps.push(createStep('compare', [largest, left], [...arr]));
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }
  
  // Compare with right child
  if (right < n) {
    steps.push(createStep('compare', [largest, right], [...arr]));
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }
  
  // If largest is not root
  if (largest !== i) {
    steps.push(createStep('swap', [i, largest], [...arr]));
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    steps.push(createStep('swap', [i, largest], [...arr]));
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, steps);
  }
};