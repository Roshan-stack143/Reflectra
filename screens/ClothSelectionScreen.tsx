
import React, { useState } from 'react';
import { ClothingItem, CLOTHING_DATABASE } from '../types';
import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react';

interface Props {
  onSelect: (item: ClothingItem) => void;
  onBack: () => void;
}

const ClothSelectionScreen: React.FC<Props> = ({ onSelect, onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Shirt', 'Pant', 'T-shirt'];

  const filteredItems = activeCategory === 'All' 
    ? CLOTHING_DATABASE 
    : CLOTHING_DATABASE.filter(item => item.category === activeCategory);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <header className="p-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-midnight" />
          </button>
          <h2 className="text-xl font-bold text-midnight">Shop Database</h2>
        </div>

        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2 mb-6">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search clothes..." 
            className="bg-transparent border-0 flex-1 outline-none text-sm py-1 text-midnight placeholder:text-gray-400"
          />
          <SlidersHorizontal className="w-5 h-5 text-midnight" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-midnight text-white' 
                  : 'bg-white border border-gray-100 text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col group active:scale-95 transition-transform"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-midnight">
                {item.size}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-sm text-midnight mb-1">{item.name}</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-3">{item.material}</p>
              <button 
                onClick={() => onSelect(item)}
                className="mt-auto w-full py-2 bg-midnight text-white text-xs font-bold rounded-xl"
              >
                Try This Outfit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothSelectionScreen;
