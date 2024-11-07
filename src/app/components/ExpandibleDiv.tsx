import React, { useState } from 'react';

interface ExpandibleDivProps {
  headerContent: React.ReactNode;
  children: React.ReactNode;
}

const ExpandibleDiv: React.FC<ExpandibleDivProps> = ({ headerContent, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="rounded-2xl bg-Clouds transition-all duration-500 overflow-hidden">
      
      <div 
        className="px-8 py-11" 
        onClick={toggleExpand}
      >
        {headerContent}
      </div>

      {/* Contenedor expandible para `children` */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-max  pt-6" : "max-h-0"
        }`}
      >
        <div className="px-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpandibleDiv;
