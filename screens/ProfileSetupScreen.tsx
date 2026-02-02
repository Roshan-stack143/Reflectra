
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
  onComplete: (profile: UserProfile) => void;
}

const ProfileSetupScreen: React.FC<Props> = ({ onBack, onComplete }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    gender: 'Neutral',
    height: '175',
    weight: '70',
    style: 'Casual'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="h-full p-8 flex flex-col bg-white overflow-y-auto">
      <div className="mb-8 flex items-center gap-2">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-midnight" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-midnight">Profile Setup</h2>
          <p className="text-gray-500 text-sm">Help our AI personalize your fitting.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Name</label>
          <input 
            required
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-midnight transition-all outline-none text-midnight placeholder:text-gray-300"
            placeholder="Alex Smith"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Height (cm)</label>
            <input 
              type="number" 
              value={formData.height}
              onChange={(e) => setFormData({...formData, height: e.target.value})}
              className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-midnight outline-none text-midnight"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Weight (kg)</label>
            <input 
              type="number" 
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-midnight outline-none text-midnight"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Style Preference</label>
          <div className="grid grid-cols-3 gap-2">
            {['Casual', 'Formal', 'Ethnic'].map(style => (
              <button
                key={style}
                type="button"
                onClick={() => setFormData({...formData, style})}
                className={`py-2 rounded-lg text-sm border-2 transition-all ${
                  formData.style === style 
                    ? 'border-midnight bg-midnight text-white' 
                    : 'border-gray-100 text-gray-600'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full mt-8 bg-midnight text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-midnight/20 hover:scale-[1.02] transition-transform"
        >
          Create My Profile
          <ChevronRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ProfileSetupScreen;
