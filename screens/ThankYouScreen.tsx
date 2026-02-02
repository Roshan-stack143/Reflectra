
import React from 'react';
import { CheckCircle, Sparkles, Home } from 'lucide-react';

interface Props {
  onHome: () => void;
}

const ThankYouScreen: React.FC<Props> = ({ onHome }) => {
  return (
    <div className="h-full bg-midnight text-white flex flex-col items-center justify-center p-12 text-center animate-fade-in">
      <div className="w-24 h-24 bg-neon/10 rounded-full flex items-center justify-center mb-8 animate-bounce">
        <CheckCircle className="w-12 h-12 text-neon" />
      </div>
      
      <div className="relative mb-6">
        <h1 className="text-5xl font-black tracking-tighter mb-2">REFLECTRA</h1>
        <div className="flex items-center justify-center gap-2 text-neon">
            <Sparkles className="w-4 h-4" />
            <p className="text-xs font-bold tracking-widest uppercase">Smart Fashion</p>
            <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <p className="text-white/60 text-sm leading-relaxed mb-12">
        Your trial session is saved. You saved 1,250L of water by choosing virtual trial over physical logistics today.
      </p>

      <button 
        onClick={onHome}
        className="w-full py-4 bg-white text-midnight font-bold rounded-2xl flex items-center justify-center gap-3 shadow-2xl transition-transform active:scale-95"
      >
        <Home className="w-5 h-5" />
        Go Back to Home
      </button>

      <div className="mt-12 text-[10px] uppercase tracking-widest text-white/20 font-bold">
        Designed for the Future of Retail
      </div>
    </div>
  );
};

export default ThankYouScreen;
