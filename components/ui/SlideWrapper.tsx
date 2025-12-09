import React from 'react';

interface SlideWrapperProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}

export const SlideWrapper: React.FC<SlideWrapperProps> = ({ children, isActive, className = "" }) => {
  // In print mode, the parent controls visibility via 'print-force-visible' class.
  // We just need to render the content.
  // We remove the specific 'if (!isActive)' block because App.tsx handles the container visibility
  // and we want the same DOM structure for print consistency.

  return (
    <div className={`w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-8 ${isActive ? 'animate-in fade-in zoom-in-95 duration-500' : ''}`}>
      <div className={`slide-container bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl backdrop-blur-md min-h-[500px] md:min-h-[600px] flex flex-col ${className}`}>
        {children}
      </div>
    </div>
  );
};