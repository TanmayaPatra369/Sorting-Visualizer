import React, { useRef, useEffect, useState } from 'react';
import { useSorting } from '../contexts/SortingContext';
import ArrayBar from './ArrayBar';

const VisualizerContainer: React.FC = () => {
  const { 
    array, 
    comparingIndices, 
    swappingIndices, 
    sortedIndices,
    isSorting
  } = useSorting();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(30);
  
  useEffect(() => {
    const updateBarWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const barCount = array.length;
        const calculatedWidth = Math.max(Math.floor((containerWidth / barCount) - 4), 4);
        setBarWidth(calculatedWidth);
      }
    };
    
    updateBarWidth();
    window.addEventListener('resize', updateBarWidth);
    
    return () => {
      window.removeEventListener('resize', updateBarWidth);
    };
  }, [array.length]);

  // Find the maximum value to normalize heights
  const maxValue = Math.max(...array, 1);
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Visualization</h2>
      
      <div 
        ref={containerRef} 
        className="h-[400px] relative flex items-end justify-start gap-1 pb-8 px-4 overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg transition-colors duration-300"
        style={{ paddingBottom: '32px' }} // Increased padding to accommodate numbers
      >
        {array.map((value, index) => {
          // Calculate bar's state
          let state = 'default';
          if (sortedIndices.includes(index)) {
            state = 'sorted';
          } else if (comparingIndices.includes(index)) {
            state = 'comparing';
          } else if (swappingIndices.includes(index)) {
            state = 'swapping';
          }

          // Calculate height percentage
          const heightPercentage = (value / maxValue) * 85; // Reduced to 85% to leave space for numbers
          
          return (
            <ArrayBar 
              key={`${index}-${value}`}
              value={value}
              heightPercentage={heightPercentage}
              width={barWidth}
              state={state}
              isSorting={isSorting}
              index={index}
              totalBars={array.length}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VisualizerContainer;