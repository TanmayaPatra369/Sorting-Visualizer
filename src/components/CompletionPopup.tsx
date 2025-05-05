import React from 'react';
import { X } from 'lucide-react';

interface CompletionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  algorithm: string;
  arraySize: number;
  steps: number;
}

const CompletionPopup: React.FC<CompletionPopupProps> = ({
  isOpen,
  onClose,
  algorithm,
  arraySize,
  steps,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Sorting Complete!
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Algorithm:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {algorithm}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Array Size:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {arraySize} elements
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Total Steps:</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {steps} steps
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionPopup;