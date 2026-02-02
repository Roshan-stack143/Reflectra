
import React from 'react';
import { Screen } from '../types';
import { Camera, Search, Leaf, User, ArrowRight, ChevronLeft } from 'lucide-react';

interface Props {
  userName: string;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

const HomeDashboard: React.FC<Props> = ({ userName, onBack, onNavigate }) => {
  const cards = [
    { 
      title: 'Smart Mirror', 
      desc: 'Live Virtual Trial', 
      icon: Camera, 
      color: 'bg-midnight', 
      textColor: 'text-white',
      screen: Screen.SMART_MIRROR 
    },
    { 
      title: 'Browse', 
      desc: 'Latest Collection', 
      icon: Search, 
      color: 'bg-white', 
      textColor: 'text-midnight',
      screen: Screen.CLOTH_SELECTION 
    },
    { 
      title: 'Sustainability', 
      desc: 'Your Eco Impact', 
      icon: Leaf, 
      color: 'bg-neon', 
      textColor: 'text-midnight',
      screen: Screen.SUSTAINABILITY 
    },
    { 
      title: 'Profile', 
      desc: 'Stats & Settings', 
      icon: User, 
      color: 'bg-gray-100', 
      textColor: 'text-midnight',
      screen: Screen.THANK_YOU 
    },
  ];

  return (
    <div className="h-full bg-white flex flex-col overflow-y-auto">
      <header className="p-8 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-gray-400 text-sm font-medium">Welcome back,</h1>
          <h2 className="text-3xl font-bold text-midnight">{userName}</h2>
        </div>
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-midnight" />
        </button>
      </header>

      <div className="p-8 grid grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={() => onNavigate(card.screen)}
            className={`${card.color} ${card.textColor} p-6 rounded-3xl flex flex-col justify-between items-start text-left shadow-lg transition-transform active:scale-95 min-h-[160px]`}
          >
            <card.icon className="w-8 h-8 mb-4" />
            <div>
              <h3 className="font-bold text-lg leading-tight">{card.title}</h3>
              <p className="text-xs opacity-70 mt-1">{card.desc}</p>
            </div>
          </button>
        ))}
        
        <div className="col-span-2 bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neon rounded-full flex items-center justify-center">
                    <Leaf className="text-midnight w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-midnight">Eco Status</h4>
                    <p className="text-xs text-gray-500">You saved 450L of water this month</p>
                </div>
            </div>
            <ArrowRight className="text-gray-300" />
        </div>
      </div>
      
      <div className="px-8 pb-8">
          <div className="bg-midnight/5 p-4 rounded-2xl flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <p className="text-xs text-midnight italic">"AI predicts you'll love the new Cyber Linen Shirt based on your height & style."</p>
          </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
