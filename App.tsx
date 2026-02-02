
import React, { useState, useEffect } from 'react';
import { Screen, UserProfile, ClothingItem, CLOTHING_DATABASE } from './types';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import HomeDashboard from './screens/HomeDashboard';
import SmartMirrorScreen from './screens/SmartMirrorScreen';
import ClothSelectionScreen from './screens/ClothSelectionScreen';
import AIGarmentScreen from './screens/AIGarmentScreen';
import SustainabilityScreen from './screens/SustainabilityScreen';
import ThankYouScreen from './screens/ThankYouScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<ClothingItem | null>(null);

  // Auto-transition from Splash to Login
  useEffect(() => {
    if (currentScreen === Screen.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentScreen(Screen.LOGIN);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH:
        return <SplashScreen />;
      case Screen.LOGIN:
        return <LoginScreen onNext={() => setCurrentScreen(Screen.PROFILE_SETUP)} />;
      case Screen.PROFILE_SETUP:
        return (
          <ProfileSetupScreen 
            onBack={() => setCurrentScreen(Screen.LOGIN)}
            onComplete={(profile) => {
              setUserProfile(profile);
              setCurrentScreen(Screen.HOME);
            }} 
          />
        );
      case Screen.HOME:
        return (
          <HomeDashboard 
            userName={userProfile?.name || 'User'} 
            onBack={() => setCurrentScreen(Screen.LOGIN)}
            onNavigate={(screen) => setCurrentScreen(screen)} 
          />
        );
      case Screen.SMART_MIRROR:
        return (
          <SmartMirrorScreen 
            selectedOutfit={selectedOutfit}
            onBack={() => setCurrentScreen(Screen.HOME)}
            onChangeOutfit={() => setCurrentScreen(Screen.CLOTH_SELECTION)}
            onSaveLook={() => setCurrentScreen(Screen.AI_INTELLIGENCE)}
          />
        );
      case Screen.CLOTH_SELECTION:
        return (
          <ClothSelectionScreen 
            onSelect={(item) => {
              setSelectedOutfit(item);
              setCurrentScreen(Screen.SMART_MIRROR);
            }}
            onBack={() => setCurrentScreen(Screen.SMART_MIRROR)}
          />
        );
      case Screen.AI_INTELLIGENCE:
        return (
          <AIGarmentScreen 
            item={selectedOutfit || CLOTHING_DATABASE[0]}
            onBack={() => setCurrentScreen(Screen.SMART_MIRROR)}
            onNext={() => setCurrentScreen(Screen.SUSTAINABILITY)}
          />
        );
      case Screen.SUSTAINABILITY:
        return (
          <SustainabilityScreen 
            onBack={() => setCurrentScreen(Screen.HOME)}
            onNext={() => setCurrentScreen(Screen.THANK_YOU)}
          />
        );
      case Screen.THANK_YOU:
        return <ThankYouScreen onHome={() => setCurrentScreen(Screen.HOME)} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      {renderScreen()}
    </div>
  );
};

export default App;
