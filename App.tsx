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
import { Loader2 } from 'lucide-react';

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
  const [isPreparing, setIsPreparing] = useState(false);
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

  const handlePrintClick = () => {
    if (isPreparing || isPrinting) return;
    
    // 1. Ativa modo de impressão (renderiza todos slides, ajusta cores para preto/branco)
    setIsPrinting(true);
    // 2. Mostra o loading na tela
    setIsPreparing(true);
  };

  useEffect(() => {
    if (isPrinting && isPreparing) {
      // Aguarda o React redesenhar os gráficos sem animação e com cores de impressão
      const renderTimer = setTimeout(() => {
        
        // 3. REMOVE o loading da tela ANTES de chamar a impressora
        setIsPreparing(false);
        
        // 4. Pequeno delay para garantir que o DOM atualizou (removeu o loader)
        setTimeout(() => {
          window.print();
          
          // 5. Após fechar a janela de impressão (ou imediatamente após enviar o comando),
          // aguarda um pouco e volta ao modo normal
          setTimeout(() => {
            setIsPrinting(false);
          }, 500);
        }, 100);
        
      }, 1500); // 1.5s para garantir que todos os gráficos renderizaram
      
      return () => clearTimeout(renderTimer);
    }
  }, [isPrinting, isPreparing]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPrinting) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isPrinting]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Header onPrint={handlePrintClick} />
      
      {isPreparing && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center text-white print:hidden">
          <Loader2 size={48} className="animate-spin text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold">Preparando Relatório...</h2>
          <p className="text-slate-400 mt-2">Ajustando gráficos para alta qualidade no PDF.</p>
        </div>
      )}

      <main className="pt-20 pb-20 min-h-screen flex items-center print:pt-0 print:pb-0 print:block print:h-auto">
        {SLIDE_COMPONENTS.map((Component, index) => (
          <div 
            key={index} 
            className={`${index === currentSlide || isPrinting ? 'block' : 'hidden'} print-force-visible w-full`}
          >
             <SlideWrapper isActive={index === currentSlide || isPrinting} isPrinting={isPrinting}>
               {/* Pass isPrinting prop to all slides so they can adjust chart colors */}
               {/* @ts-ignore - Dynamic component rendering */}
               <Component isPrinting={isPrinting} />
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