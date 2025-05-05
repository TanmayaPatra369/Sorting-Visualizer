import React from 'react';
import { useSorting } from '../contexts/SortingContext';
import ArrayControls from './ArrayControls';
import SortControls from './SortControls';
import VisualizerContainer from './VisualizerContainer';
import AlgorithmInfo from './AlgorithmInfo';
import CompletionPopup from './CompletionPopup';

const SortingVisualizer: React.FC = () => {
  const { 
    selectedAlgorithm, 
    arraySize, 
    currentStep,
    isCompleted,
    closeCompletionPopup
  } = useSorting();

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ArrayControls />
        </div>
        <div>
          <SortControls />
        </div>
      </div>
      
      <VisualizerContainer />
      
      <div className="mt-4">
        <AlgorithmInfo algorithm={selectedAlgorithm} />
      </div>

      <CompletionPopup
        isOpen={isCompleted}
        onClose={closeCompletionPopup}
        algorithm={selectedAlgorithm}
        arraySize={arraySize}
        steps={currentStep}
      />
    </div>
  );
};

export default SortingVisualizer;