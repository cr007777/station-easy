

import React, { useState } from 'react';
import { User, Map, Heart, Globe, ArrowRight } from 'lucide-react';
import { Translation } from '../types';

interface OnboardingProps {
  onComplete: () => void;
  t: Translation;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, t }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: t.onboardingTitle1,
      image: "https://picsum.photos/400/600?grayscale",
      icon: <Globe size={48} className="text-blue-500 mb-4" />
    },
    {
      title: t.onboardingTitle2,
      subtitle: t.onboardingSubtitle2,
      image: "https://picsum.photos/400/601?grayscale",
      icon: <Heart size={48} className="text-blue-500 mb-4" />
    },
    {
      title: t.onboardingTitle3,
      subtitle: t.onboardingSubtitle3,
      image: "https://picsum.photos/400/602?grayscale",
      icon: <Map size={48} className="text-blue-500 mb-4" />
    },
    {
      title: t.onboardingTitle4,
      subtitle: t.onboardingSubtitle4,
      image: "https://picsum.photos/400/603?grayscale",
      icon: <User size={48} className="text-blue-500 mb-4" />
    }
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-between p-8 relative max-w-md mx-auto">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src={slides[step].image} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="z-10 w-full pt-12 flex flex-col items-center">
         <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
               {/* Train Logo */}
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                  <path d="M4 11V9a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
                  <rect width="16" height="8" x="4" y="11" rx="2" />
                  <path d="M4 11h16" />
                  <path d="M12 3V2" />
                  <path d="M8 15h.01" />
                  <path d="M16 15h.01" />
                  <path d="M6 19v2" />
                  <path d="M18 19v2" />
               </svg>
            </div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">Station Easy</span>
         </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center z-10 text-center">
        {/* Placeholder illustration area */}
        <div className="w-64 h-64 bg-blue-50 rounded-3xl mb-8 flex items-center justify-center border-2 border-dashed border-blue-200">
           {slides[step].icon}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{slides[step].title}</h2>
        {slides[step].subtitle && (
          <p className="text-gray-500">{slides[step].subtitle}</p>
        )}
      </div>

      <div className="w-full z-10 mb-8">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          {step === slides.length - 1 ? t.getStarted : t.next}
          {step < slides.length - 1 && <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;