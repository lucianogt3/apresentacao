import React from 'react';
import { Printer } from 'lucide-react';

interface HeaderProps {
  onPrint?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPrint }) => {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3 md:py-4 px-4 md:px-6 no-print">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-lg md:text-xl shadow-lg shadow-blue-900/50">
            U
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-slate-100 leading-none">Hospital UNIQUE</h1>
            <p className="text-[10px] md:text-xs text-slate-400 mt-1">Relatório Executivo de Auditoria</p>
          </div>
        </div>
        
        <button 
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 px-3 py-2 md:px-4 md:py-2 rounded-full border border-slate-700 transition-all text-xs md:text-sm font-medium cursor-pointer shadow-lg z-50"
          title="Imprimir ou Salvar como PDF"
        >
          <Printer size={16} />
          <span className="hidden sm:inline">Imprimir / PDF</span>
        </button>
      </div>
    </header>
  );
};