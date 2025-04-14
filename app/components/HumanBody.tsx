import React from 'react';

interface HumanBodyProps {
  view: 'front' | 'back';
  className?: string;
}

const HumanBody: React.FC<HumanBodyProps> = ({ view, className = '' }) => {
  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <div className="aspect-[1/2] relative bg-gray-100 rounded-lg border-2 border-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          {view === 'front' ? '人体正面图（开发中）' : '人体背面图（开发中）'}
        </div>
      </div>
    </div>
  );
};

export default HumanBody; 