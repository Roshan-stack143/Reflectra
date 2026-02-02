
import React, { useState } from 'react';
import { Mail, Phone, Loader2, ChevronLeft, ArrowRight } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const LoginScreen: React.FC<Props> = ({ onNext }) => {
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = (type: string) => {
    setLoadingType(type);
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  const startPhoneLogin = () => {
    setShowPhoneInput(true);
  };

  if (showPhoneInput) {
    return (
      <div className="p-8 h-full flex flex-col bg-white animate-fade-in">
        <button 
          onClick={() => setShowPhoneInput(false)}
          className="p-2 -ml-2 mb-8 hover:bg-gray-100 rounded-full transition-colors w-fit"
        >
          <ChevronLeft className="w-6 h-6 text-midnight" />
        </button>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-midnight mb-2">Phone Login</h2>
          <p className="text-gray-500">Enter your mobile number to get started.</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">+1</span>
            <input 
              autoFocus
              type="tel"
              placeholder="000 000 0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-gray-50 border-0 rounded-2xl pl-12 pr-4 py-4 text-midnight font-medium focus:ring-2 focus:ring-midnight outline-none transition-all"
            />
          </div>

          <button 
            disabled={phoneNumber.length < 5}
            onClick={() => handleLogin('phone')}
            className="w-full py-4 bg-midnight text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-midnight/20 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
          >
            Send OTP
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-300 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <button 
            onClick={() => handleLogin('skip')}
            className="w-full py-4 border-2 border-midnight text-midnight font-bold rounded-2xl hover:bg-midnight/5 transition-colors"
          >
            Skip & Continue
          </button>
        </div>

        {loadingType && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <Loader2 className="w-10 h-10 text-midnight animate-spin mb-4" />
            <p className="text-midnight font-bold">Verifying Session...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8 h-full flex flex-col justify-center bg-white">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-midnight mb-2">Welcome to Reflectra</h2>
        <p className="text-gray-500">AI-powered smart fashion experience for the future of style.</p>
      </div>

      <div className="space-y-4">
        <button 
          disabled={!!loadingType}
          onClick={() => handleLogin('google')}
          className="w-full py-4 px-6 border-2 border-gray-100 rounded-2xl flex items-center gap-4 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {loadingType === 'google' ? (
            <Loader2 className="w-6 h-6 text-midnight animate-spin" />
          ) : (
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-6 h-6" />
          )}
          <span className="font-medium text-gray-700">
            {loadingType === 'google' ? 'Connecting Google...' : 'Continue with Google'}
          </span>
        </button>

        <button 
          disabled={!!loadingType}
          onClick={startPhoneLogin}
          className="w-full py-4 px-6 border-2 border-gray-100 rounded-2xl flex items-center gap-4 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {loadingType === 'phone' ? (
            <Loader2 className="w-6 h-6 text-midnight animate-spin" />
          ) : (
            <Phone className="w-6 h-6 text-midnight" />
          )}
          <span className="font-medium text-gray-700">
             {loadingType === 'phone' ? 'Verifying Phone...' : 'Continue with Phone Number'}
          </span>
        </button>

        <button 
          disabled={!!loadingType}
          onClick={() => handleLogin('email')}
          className="w-full py-4 px-6 border-2 border-gray-100 rounded-2xl flex items-center gap-4 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {loadingType === 'email' ? (
            <Loader2 className="w-6 h-6 text-midnight animate-spin" />
          ) : (
            <Mail className="w-6 h-6 text-midnight" />
          )}
          <span className="font-medium text-gray-700">
            {loadingType === 'email' ? 'Checking Email...' : 'Continue with Email'}
          </span>
        </button>
      </div>

      <div className="mt-auto pt-8 text-center text-xs text-gray-400">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
};

export default LoginScreen;
