import React from 'react';

interface SlideWrapperProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
  isPrinting?: boolean;
}

export const SlideWrapper: React.FC<SlideWrapperProps> = ({ children, isActive, className = "", isPrinting = false }) => {
  // In print mode, we want to strip all "card" styling (shadows, backgrounds, borders)
  // and maximize width to fit the paper.
  const containerClasses = isPrinting 
    ? `w-full h-auto p-0 bg-white text-black border-0 block ${className}` 
    : `slide-container bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl backdrop-blur-md min-h-[500px] md:min-h-[600px] flex flex-col ${className}`;

  const wrapperClasses = isPrinting
    ? `w-full h-auto p-0 block`
    : `w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-8 ${isActive ? 'animate-in fade-in zoom-in-95 duration-500' : ''}`;

  return (
    <div className={wrapperClasses}>
      <div className={containerClasses}>
        {children}
      </div>
    </div>
  );
};