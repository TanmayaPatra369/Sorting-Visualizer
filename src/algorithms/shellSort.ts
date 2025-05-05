import { createStep } from './algorithmUtils';

export const shellSort = (array: number[]) => {
  const steps: any[] = [];
  const arr = [...array];
  const n = arr.length;
  
  // Start with a large gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort
    for (let i = gap; i < n; i++) {
      // Save arr[i] in temp
      const temp = arr[i];
      
      // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
      let j;
      for (j = i; j >= gap; j -= gap) {
        steps.push(createStep('compare', [j - gap, i], [...arr]));
        
        if (arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          steps.push(createStep('swap', [j, j - gap], [...arr]));
        } else {
          break;
        }
      }
      
      // Put temp (the original arr[i]) in its correct place
      if (arr[j] !== temp) {
        arr[j] = temp;
        steps.push(createStep('swap', [j], [...arr]));
      }
    }
  }
  
  // Mark all elements as sorted at the end
  steps.push(createStep('sorted', Array.from(Array(arr.length).keys()), [...arr]));
  
  return steps;
};