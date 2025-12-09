import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FooterProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentSlide, totalSlides, onPrev, onNext, onDotClick }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 py-4 px-6 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-xs text-slate-500 text-center md:text-left">
          <span>Relatório desenvolvido por <strong>Jeiza da Silva Santos</strong></span>
          <span className="hidden sm:inline"> • COREN-GO 488.254</span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onPrev}
            disabled={currentSlide === 0}
            className="p-2 rounded-full bg-slate-800 text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onDotClick(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-blue-500 scale-125' : 'bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="p-2 rounded-full bg-blue-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};