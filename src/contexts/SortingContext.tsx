import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { generateSteps } from '../algorithms/algorithmUtils';

interface SortingContextType {
  array: number[];
  arraySize: number;
  setArraySize: (size: number) => void;
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algorithm: string) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  generateRandomArray: () => void;
  setCustomArray: (array: number[]) => void;
  resetArray: () => void;
  startSorting: () => void;
  pauseSorting: () => void;
  resumeSorting: () => void;
  isSorting: boolean;
  isPaused: boolean;
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
  currentStep: number;
  isCompleted: boolean;
  closeCompletionPopup: () => void;
}

const SortingContext = createContext<SortingContextType | undefined>(undefined);

export const SortingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(30);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  
  const animationTimeoutRef = useRef<number | null>(null);
  const sortingStepsRef = useRef<any[]>([]);
  
  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setOriginalArray([...newArray]);
    resetSortingState();
  }, [arraySize]);
  
  const setCustomArray = useCallback((newArray: number[]) => {
    const limitedArray = newArray.slice(0, 100);
    setArray(limitedArray);
    setOriginalArray([...limitedArray]);
    resetSortingState();
  }, []);
  
  const resetArray = useCallback(() => {
    setArray([...originalArray]);
    resetSortingState();
  }, [originalArray]);
  
  const resetSortingState = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setIsSorting(false);
    setIsPaused(false);
    setCurrentStep(0);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setIsCompleted(false);
  };

  const closeCompletionPopup = () => {
    setIsCompleted(false);
  };
  
  const startSorting = useCallback(() => {
    if (array.length <= 1) return;
    
    const steps = generateSteps([...array], selectedAlgorithm);
    sortingStepsRef.current = steps;
    
    setIsSorting(true);
    setCurrentStep(0);
    setSortedIndices([]);
    setIsCompleted(false);
    
    animateStep(0, steps);
  }, [array, selectedAlgorithm]);
  
  const pauseSorting = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
    setIsPaused(true);
  }, []);
  
  const resumeSorting = useCallback(() => {
    if (!isPaused) return;
    
    setIsPaused(false);
    animateStep(currentStep, sortingStepsRef.current);
  }, [isPaused, currentStep]);
  
  const animateStep = (step: number, steps: any[]) => {
    if (step >= steps.length) {
      setIsSorting(false);
      setComparingIndices([]);
      setSwappingIndices([]);
      setSortedIndices(Array.from(Array(array.length).keys()));
      setIsCompleted(true);
      return;
    }
    
    const { type, indices, array: newArray } = steps[step];
    
    if (type === 'compare') {
      setComparingIndices(indices);
      setSwappingIndices([]);
    } else if (type === 'swap') {
      setComparingIndices([]);
      setSwappingIndices(indices);
      setArray(newArray);
    } else if (type === 'sorted') {
      setSortedIndices(prev => [...prev, ...indices]);
      setComparingIndices([]);
      setSwappingIndices([]);
    }
    
    setCurrentStep(step + 1);
    
    const speed = 101 - animationSpeed;
    animationTimeoutRef.current = window.setTimeout(() => {
      animateStep(step + 1, steps);
    }, speed * 5);
  };
  
  React.useEffect(() => {
    generateRandomArray();
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [generateRandomArray]);
  
  return (
    <SortingContext.Provider
      value={{
        array,
        arraySize,
        setArraySize,
        selectedAlgorithm,
        setSelectedAlgorithm,
        animationSpeed,
        setAnimationSpeed,
        generateRandomArray,
        setCustomArray,
        resetArray,
        startSorting,
        pauseSorting,
        resumeSorting,
        isSorting,
        isPaused,
        comparingIndices,
        swappingIndices,
        sortedIndices,
        currentStep,
        isCompleted,
        closeCompletionPopup,
      }}
    >
      {children}
    </SortingContext.Provider>
  );
};

export const useSorting = (): SortingContextType => {
  const context = useContext(SortingContext);
  if (context === undefined) {
    throw new Error('useSorting must be used within a SortingProvider');
  }
  return context;
};