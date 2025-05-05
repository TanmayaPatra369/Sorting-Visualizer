import React from 'react';
import { ALGORITHM_INFO } from '../constants/algorithms';

interface AlgorithmInfoProps {
  algorithm: string;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const info = ALGORITHM_INFO[algorithm];

  if (!info) return null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        {info.name} Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Complexity
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Best Case: {info.timeComplexity.best}</li>
            <li>Average Case: {info.timeComplexity.average}</li>
            <li>Worst Case: {info.timeComplexity.worst}</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1">
            Space Complexity
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{info.spaceComplexity}</p>
          
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1 mt-3">
            Stability
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{info.stable ? 'Stable' : 'Not Stable'}</p>
        </div>
      </div>
      
      <div className="mt-3">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{info.description}</p>
      </div>
    </div>
  );
};

export default AlgorithmInfo;