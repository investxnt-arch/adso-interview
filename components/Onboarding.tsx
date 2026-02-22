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
    const hasSeen = localStorage.getItem('adsotube-onboarding');
    if (!hasSeen) {
      setIsVisible(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('adsotube-onboarding', 'true');
    setIsVisible(false);
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
          className="max-w-md p-8 border-2 border-cyan-500 bg-black rounded-lg shadow-[0_0_50px_#0ff]"
        >
          <h2 className="text-2xl font-mono text-cyan-400 mb-4">{steps[currentStep].title}</h2>
          <p className="text-fuchsia-400 font-mono mb-6">{steps[currentStep].content}</p>
          
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 border border-cyan-500 text-cyan-400 font-mono disabled:opacity-50"
            >
              ← Anterior
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-4 py-2 bg-cyan-500 text-black font-mono"
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-fuchsia-500 text-black font-mono"
              >
                ¡Comenzar!
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}