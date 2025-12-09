import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 border-b border-slate-800 pb-4">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3 tracking-tight">
        {title}
      </h2>
      <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-transparent rounded-full mb-4"></div>
      {subtitle && (
        <p className="text-lg text-slate-400 leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};