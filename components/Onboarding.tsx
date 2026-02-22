'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { id: 1, title: '🚀 Bienvenido a ADSOTUBE', content: 'La plataforma cyberpunk para podcasts' },
  { id: 2, title: '✨ Logo Interactivo', content: 'ADSO + TUBE = Tu espacio para crear y dominar' },
  { id: 3, title: '🎵 Reproductor Cyberpunk', content: 'Usa la barra espaciadora para play/pausa' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Usar setTimeout para evitar el error de setState síncrono
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem('adsotube-onboarding');
      if (!hasSeen) {
        setIsVisible(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    localStorage.setItem('adsotube-onboarding', 'true');
    setIsVisible(false);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      >
        <motion.div
          key={currentStep}
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: -20 }}
          className="max-w-md p-8 border-4 border-[#00FFD1] bg-black rounded-lg shadow-[0_0_50px_#00FFD1]"
        >
          <h2 className="text-2xl font-mono text-[#FFE500] mb-4">{steps[currentStep].title}</h2>
          <p className="text-[#00FFD1] font-mono mb-6">{steps[currentStep].content}</p>
          
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-4 py-2 border-4 border-[#00FFD1] text-[#00FFD1] font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00FFD1]/10 transition-all"
            >
              ← ANTERIOR
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#00FFD1] text-black border-4 border-black font-mono font-bold hover:bg-[#00FFD1]/80 transition-all"
              >
                SIGUIENTE →
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-[#FFE500] text-black border-4 border-black font-mono font-bold hover:bg-[#FFE500]/80 transition-all"
              >
                ¡COMENZAR!
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}