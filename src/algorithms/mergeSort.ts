import { createStep } from './algorithmUtils';

export const mergeSort = (array: number[]) => {
  const steps: any[] = [];
  const arr = [...array];
  
  mergeSortHelper(arr, 0, arr.length - 1, steps);
  
  // Mark all elements as sorted at the end
  steps.push(createStep('sorted', Array.from(Array(arr.length).keys()), [...arr]));
  
  return steps;
};

const mergeSortHelper = (
  arr: number[], 
  start: number, 
  end: number, 
  steps: any[]
) => {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    
    // Sort first and second halves
    mergeSortHelper(arr, start, mid, steps);
    mergeSortHelper(arr, mid + 1, end, steps);
    
    // Merge the sorted halves
    merge(arr, start, mid, end, steps);
  }
};

const merge = (
  arr: number[], 
  start: number, 
  mid: number, 
  end: number, 
  steps: any[]
) => {
  const leftSize = mid - start + 1;
  const rightSize = end - mid;
  
  // Create temp arrays
  const leftArray = new Array(leftSize);
  const rightArray = new Array(rightSize);
  
  // Copy data to temp arrays
  for (let i = 0; i < leftSize; i++) {
    leftArray[i] = arr[start + i];
  }
  for (let j = 0; j < rightSize; j++) {
    rightArray[j] = arr[mid + 1 + j];
  }
  
  // Merge the temp arrays back
  let i = 0;
  let j = 0;
  let k = start;
  
  while (i < leftSize && j < rightSize) {
    // Compare elements from both arrays
    steps.push(createStep('compare', [start + i, mid + 1 + j], [...arr]));
    
    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      steps.push(createStep('swap', [k], [...arr]));
      i++;
    } else {
      arr[k] = rightArray[j];
      steps.push(createStep('swap', [k], [...arr]));
      j++;
    }
    k++;
  }
  
  // Copy remaining elements of leftArray
  while (i < leftSize) {
    arr[k] = leftArray[i];
    steps.push(createStep('swap', [k], [...arr]));
    i++;
    k++;
  }
  
  // Copy remaining elements of rightArray
  while (j < rightSize) {
    arr[k] = rightArray[j];
    steps.push(createStep('swap', [k], [...arr]));
    j++;
    k++;
  }
};