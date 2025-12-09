import React from 'react';
import { Printer } from 'lucide-react';

export const Header: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4 px-6 no-print">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-900/50">
            U
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 leading-none">Hospital UNIQUE</h1>
            <p className="text-xs text-slate-400 mt-1">Relatório Executivo de Auditoria</p>
          </div>
        </div>
        
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-full border border-slate-700 transition-all text-sm font-medium"
        >
          <Printer size={16} />
          <span className="hidden sm:inline">Imprimir / PDF</span>
        </button>
      </div>
    </header>
  );
};