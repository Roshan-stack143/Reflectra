
import React from 'react';
import { ClothingItem } from '../types';
import { ChevronLeft, Info, Recycle, Heart, Activity, CheckCircle2 } from 'lucide-react';

interface Props {
  item: ClothingItem;
  onBack: () => void;
  onNext: () => void;
}

const AIGarmentScreen: React.FC<Props> = ({ item, onBack, onNext }) => {
  return (
    <div className="h-full bg-white flex flex-col">
      <header className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="p-2 text-midnight">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="font-bold text-midnight">AI Intelligence</h2>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-midnight rounded-[40px] p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-neon text-xs font-bold tracking-widest mb-1">AI WEAR SCORE</p>
            <div className="flex items-end gap-3">
                <span className="text-6xl font-black">{item.wearScore}</span>
                <span className="text-2xl font-bold opacity-40 mb-2">/ 100</span>
            </div>
            <p className="mt-4 text-sm opacity-80 leading-relaxed max-w-[80%]">
              Perfect synergy with your profile. Highly durable and sustainable choice for your wardrobe.
            </p>
          </div>
          {/* Abstract circular graphic */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 border-[12px] border-white/5 rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-48 h-48 border-[1px] border-neon/30 rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
            <Activity className="text-midnight mb-3 w-6 h-6" />
            <p className="text-xs text-gray-400 mb-1">Comfort</p>
            <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-neon h-full" style={{ width: `${item.comfort}%` }} />
                </div>
                <span className="text-lg">😊</span>
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
            <Heart className="text-midnight mb-3 w-6 h-6" />
            <p className="text-xs text-gray-400 mb-1">Life Span</p>
            <p className="text-lg font-bold text-midnight">{item.lifeSpan}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
              <Info className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-midnight mb-1">Material Intelligence</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Made of <span className="font-semibold text-midnight">{item.material}</span>. 
                Sourced from eco-certified farms with zero toxin footprint.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
              <Recycle className="text-green-500 w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-midnight mb-1">Loop Suggestion</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{item.recycleTip}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <button 
          onClick={onNext}
          className="w-full py-4 bg-midnight text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-midnight/20"
        >
          Sustainability Impact
          <CheckCircle2 className="w-5 h-5 text-neon" />
        </button>
      </div>
    </div>
  );
};

export default AIGarmentScreen;
