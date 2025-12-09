import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SlideWrapper } from './components/ui/SlideWrapper';
import { 
  SlideCover, SlideKPIs, SlideRevenueLeaks, SlideWeeklyFlow, 
  SlideAuditVsBilling, SlideErrorDistribution, SlideItemRanking, 
  SlideInsurance, SlideProfessionals, SlideErrorCategories, 
  SlideStrategy, SlideNextSteps, SlideClosing 
} from './components/Slides';

const SLIDE_COMPONENTS = [
  SlideCover,
  SlideKPIs,
  SlideRevenueLeaks,
  SlideWeeklyFlow,
  SlideAuditVsBilling,
  SlideErrorDistribution,
  SlideItemRanking,
  SlideInsurance,
  SlideProfessionals,
  SlideErrorCategories,
  SlideStrategy,
  SlideNextSteps,
  SlideClosing
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const totalSlides = SLIDE_COMPONENTS.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Trigger print flow: 
  // 1. Show all slides (isPrinting = true)
  // 2. Wait for charts to render
  // 3. Open print dialog
  const handlePrintClick = () => {
    setIsPrinting(true);
  };

  useEffect(() => {
    if (isPrinting) {
      // Allow time for Recharts to measure DOM and render charts
      const timer = setTimeout(() => {
        window.print();
        // After print dialog closes (or user interacts), reset view.
        // Note: window.print() is blocking in many browsers, but not all.
        // Resetting immediately after might be too fast if non-blocking,
        // but typically execution pauses here.
        setIsPrinting(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isPrinting]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Header onPrint={handlePrintClick} />
      
      <main className="pt-20 pb-20 min-h-screen flex items-center print:pt-0 print:pb-0 print:block">
        {/* Render all slides. 
            On screen: Only current is block (unless printing), others hidden.
            On print: All are block (via state + CSS) 
        */}
        {SLIDE_COMPONENTS.map((Component, index) => (
          <div 
            key={index} 
            className={`${index === currentSlide || isPrinting ? 'block' : 'hidden'} print-force-visible w-full`}
          >
             <SlideWrapper isActive={index === currentSlide || isPrinting}>
               <Component />
             </SlideWrapper>
          </div>
        ))}
      </main>

      {!isPrinting && (
        <div className="fixed top-24 right-6 bg-slate-800/80 backdrop-blur px-4 py-2 rounded-full border border-slate-700 text-sm font-bold text-slate-400 no-print z-40 shadow-lg">
          Slide {currentSlide + 1} / {totalSlides}
        </div>
      )}

      <Footer 
        currentSlide={currentSlide} 
        totalSlides={totalSlides} 
        onPrev={prevSlide} 
        onNext={nextSlide} 
        onDotClick={goToSlide}
      />
    </div>
  );
}

export default App;