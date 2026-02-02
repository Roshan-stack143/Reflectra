
import React from 'react';
import { ChevronLeft, Droplets, CloudRain, Wind, Share2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const SustainabilityScreen: React.FC<Props> = ({ onBack, onNext }) => {
  const data = [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 30 },
    { name: 'Mar', value: 65 },
    { name: 'Apr', value: 45 },
    { name: 'May', value: 90 },
    { name: 'Jun', value: 75 },
  ];

  return (
    <div className="h-full bg-[#F8F9FA] flex flex-col overflow-hidden">
      <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
        <button onClick={onBack} className="p-2 text-midnight">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="font-bold text-midnight">Eco Impact</h2>
        <button className="p-2 text-midnight">
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
              <Droplets />
            </div>
            <p className="text-2xl font-black text-midnight">4,500L</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Water Saved</p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-50 text-midnight rounded-full flex items-center justify-center mb-3">
              <CloudRain />
            </div>
            <p className="text-2xl font-black text-midnight">12.5kg</p>
            <p className="text-[10px] text-gray-400 uppercase font-bold">CO2 Reduced</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-midnight">Water Efficiency Trend</h4>
            <div className="flex items-center gap-1 text-green-500 text-xs font-bold">
                <TrendingUp className="w-3 h-3" />
                +12%
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" hide />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#5B2D8B' : '#4EF3C2'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
            <h4 className="font-bold text-midnight px-1">Community Loop</h4>
            <div className="bg-midnight p-6 rounded-3xl text-white">
                <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                        <Wind className="text-neon" />
                    </div>
                    <div>
                        <h5 className="font-bold">Next Milestone</h5>
                        <p className="text-sm opacity-60">Donate 2 old shirts to unlock the 'Eco Warrior' badge.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-neon text-midnight font-bold rounded-xl text-sm">Donate</button>
                    <button className="flex-1 py-3 bg-white/10 text-white font-bold rounded-xl text-sm">Recycle</button>
                </div>
            </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-100">
        <button 
          onClick={onNext}
          className="w-full py-4 bg-midnight text-white font-bold rounded-2xl shadow-xl shadow-midnight/20"
        >
          Complete Session
        </button>
      </div>
    </div>
  );
};

export default SustainabilityScreen;
