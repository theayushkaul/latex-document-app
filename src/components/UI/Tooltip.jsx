import React, { useState } from 'react';

export const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block w-full">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          {content}
        </div>
      )}
    </div>
  );
}; 