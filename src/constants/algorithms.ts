export const ALGORITHM_OPTIONS = [
  { value: 'bubbleSort', label: 'Bubble Sort' },
  { value: 'selectionSort', label: 'Selection Sort' },
  { value: 'insertionSort', label: 'Insertion Sort' },
  { value: 'mergeSort', label: 'Merge Sort' },
  { value: 'quickSort', label: 'Quick Sort' },
  { value: 'heapSort', label: 'Heap Sort' },
  { value: 'shellSort', label: 'Shell Sort' },
];

interface AlgorithmInfoType {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  description: string;
}

export const ALGORITHM_INFO: Record<string, AlgorithmInfoType> = {
  bubbleSort: {
    name: 'Bubble Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process is repeated until the list is sorted.',
  },
  selectionSort: {
    name: 'Selection Sort',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    description: 'Selection Sort divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly finds the minimum element from the unsorted sublist and moves it to the sorted sublist.',
  },
  insertionSort: {
    name: 'Insertion Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    description: 'Insertion Sort builds the final sorted array one item at a time. It is efficient for small data sets and is often used as part of more sophisticated algorithms.',
  },
  mergeSort: {
    name: 'Merge Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    description: 'Merge Sort is a divide and conquer algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves to produce the final sorted array.',
  },
  quickSort: {
    name: 'Quick Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    description: 'Quick Sort is a divide and conquer algorithm that works by selecting a "pivot" element and partitioning the array around the pivot. It is generally faster in practice than other O(n log n) algorithms.',
  },
  heapSort: {
    name: 'Heap Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    description: 'Heap Sort divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and inserting it into the sorted region.',
  },
  shellSort: {
    name: 'Shell Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log² n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    description: 'Shell Sort is a generalization of insertion sort that allows the exchange of items that are far apart. The idea is to arrange the list so that elements far apart from each other are compared first.',
  },
};