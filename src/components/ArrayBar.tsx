import React, { useState } from "react";

interface ArrayBarProps {
  value: number;
  heightPercentage: number;
  width: number;
  state: "default" | "comparing" | "swapping" | "sorted";
  isSorting: boolean;
  index: number;
  totalBars: number;
}

const ArrayBar: React.FC<ArrayBarProps> = ({
  value,
  heightPercentage,
  width,
  state,
  isSorting,
  index,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate the horizontal position for smooth transitions
  const position = index * (width + 2); // 2px for gap

  // Define colors based on state with enhanced gradients
  const getBackgroundColor = () => {
    switch (state) {
      case "comparing":
        return "bg-gradient-to-t from-yellow-600 to-yellow-400 dark:from-yellow-700 dark:to-yellow-500";
      case "swapping":
        return "bg-gradient-to-t from-red-600 to-red-400 dark:from-red-700 dark:to-red-500";
      case "sorted":
        return "bg-gradient-to-t from-green-600 to-green-400 dark:from-green-700 dark:to-green-500";
      default:
        return "bg-gradient-to-t from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500";
    }
  };

  // Enhanced animation styles
  const barStyle = {
    height: `${Math.max(heightPercentage, 2)}%`,
    width: `${width}px`,
    transform: `translateX(${position}px)`,
    transition: "all 0.3s ease-in-out",
    position: "absolute",
    left: 0,
    bottom: "24px", // Add space for the number
    zIndex: state === "swapping" ? 20 : state === "comparing" ? 10 : 1,
  } as React.CSSProperties;

  return (
    <div
      className="relative"
      style={{
        width: `${width}px`,
        height: "100%",
        position: "absolute",
        left: 0,
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`
          ${getBackgroundColor()} 
          rounded-t-md shadow-lg 
          transform transition-all duration-300 ease-in-out 
          hover:brightness-110
          ${state === "comparing" ? "animate-pulse" : ""}
          ${state === "swapping" ? "scale-105" : "scale-100"}
        `}
        style={barStyle}
      />

      {/* Value label */}
      {(width >= 25 || !isSorting) && (
        <div
          className="absolute bottom-0 left-0 w-full text-center"
          style={{
            transform: `translateX(${position}px)`,
            transition: "transform 0.3s ease-in-out",
            zIndex: 30, // Ensure numbers are always on top
          }}
        >
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {value}
          </span>
        </div>
      )}

      {/* Enhanced tooltip */}
      {showTooltip && (
        <div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                     bg-gray-800 dark:bg-gray-700 text-white text-xs 
                     rounded-md py-1.5 px-3 shadow-xl z-50
                     opacity-0 group-hover:opacity-100 
                     transition-opacity duration-200 whitespace-nowrap"
          style={{
            transform: `translateX(${position}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          Value: {value}
        </div>
      )}
    </div>
  );
};

export default ArrayBar;
