
import React from 'react';
import { Sparkles } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-midnight text-white animate-fade-in">
      <div className="relative mb-6">
        <div className="w-32 h-48 border-4 border-neon rounded-full flex items-center justify-center relative overflow-hidden">
            <Sparkles className="w-16 h-16 text-neon animate-pulse" />
        </div>
      </div>
      <h1 className="text-4xl font-bold tracking-widest text-neon mb-2">REFLECTRA</h1>
      <p className="text-sm font-light opacity-80">Reflect Yourself. Fit Perfectly.</p>
      
      <div className="absolute bottom-12 w-1 bg-neon/30 h-16 rounded-full overflow-hidden">
        <div className="w-full bg-neon h-full animate-[bounce_1.5s_infinite]"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
