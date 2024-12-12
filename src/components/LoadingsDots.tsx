import React from 'react';

const LoadingDots: React.FC = () => {
  return (
    <div className="flex items-center">
      <span className="dot bg-gray-500 rounded-full w-2 h-2 mx-1 animate-loading"></span>
      <span className="dot bg-gray-500 rounded-full w-2 h-2 mx-1 animate-loading delay-200"></span>
      <span className="dot bg-gray-500 rounded-full w-2 h-2 mx-1 animate-loading delay-400"></span>
    </div>
  );
};

export default LoadingDots;
