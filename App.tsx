

import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { ScreenName, AppSettings } from './types';
import { translations } from './translations';
import { FAVORITE_STATIONS, AMENITIES } from './constants';

// Screens
import LanguageInit from './screens/LanguageInit';
import Onboarding from './screens/Onboarding';
import Auth from './screens/Auth';
import Home from './screens/Home';
import MapExplorer from './screens/MapExplorer';
import Favorites from './screens/Favorites';
import Settings from './screens/Settings';
import FacilityDetail from './screens/FacilityDetail';
import Navigation from './screens/Navigation';
import Feedback from './screens/Feedback';
import About from './screens/About';
import ChatAssistant from './screens/ChatAssistant';
import Notifications from './screens/Notifications';
import StationList from './screens/StationList';

const App: React.FC = () => {
  // Start with Splash Screen logic
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('language-init');
  const [activeTab, setActiveTab] = useState<ScreenName>('home');
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  // Global App Settings
  const [settings, setSettings] = useState<AppSettings>({
    language: 'English',
    theme: 'light',
    accessibilityEnabled: false,
    voiceAssistant: false,
  });

  // Global Favorites State
  const [favStationIds, setFavStationIds] = useState<string[]>(FAVORITE_STATIONS.map(s => s.id));
  const [favAmenityIds, setFavAmenityIds] = useState<string[]>(['1']); 

  const toggleStationFavorite = (id: string) => {
    setFavStationIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const toggleAmenityFavorite = (id: string) => {
    setFavAmenityIds(prev => 
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  // Derived Translation Object
  const t = translations[settings.language] || translations['English'];

  // Apply Dark Mode Class to HTML Body or Parent
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
       // System preference
       if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
         root.classList.add('dark');
       } else {
         root.classList.remove('dark');
       }
    }
  }, [settings.theme]);

  // Apply Language Font (Baloo Chettan 2 for Malayalam)
  useEffect(() => {
    const body = document.body;
    if (settings.language === 'Malayalam') {
      body.classList.add('font-malayalam');
      body.classList.remove('font-sans');
    } else {
      body.classList.remove('font-malayalam');
      body.classList.add('font-sans');
    }
  }, [settings.language]);

  // Handle Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // --- Navigation Handlers ---

  const handleLanguageInitSelect = (lang: string) => {
      updateSettings({ language: lang });
      setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('login');
  };

  const handleAuthComplete = () => {
    setCurrentScreen('home');
  };

  const handleTabChange = (tab: ScreenName) => {
    if (tab === 'chat') {
        setCurrentScreen('chat');
        return;
    }

    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  const handleStationSelect = (station: any) => {
    setSelectedStation(station);
    setSelectedFacilityId(null); // Clear facility when changing station context
    setActiveTab('map');
    setCurrentScreen('map');
  };

  const handleFacilityClick = (id: string) => {
    setSelectedFacilityId(id);
    setCurrentScreen('facility-detail');
  };

  const handleNavigateClick = () => {
    setCurrentScreen('navigation');
  };

  const handleSeeAll = () => {
      setCurrentScreen('station-list');
  };

  const handleBack = () => {
    if (currentScreen === 'facility-detail') setCurrentScreen('map');
    if (currentScreen === 'navigation') setCurrentScreen('map');
    if (currentScreen === 'feedback' || currentScreen === 'about') setCurrentScreen('settings');
    if (currentScreen === 'chat' || currentScreen === 'notifications') setCurrentScreen(activeTab);
    if (currentScreen === 'station-list') setCurrentScreen('home');
  };

  const handleLogout = () => {
      setCurrentScreen('login');
  };

  // --- Rendering Logic ---
  
  if (showSplash) {
      return (
        <div className="h-screen w-full bg-blue-600 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Animated Circles/Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-blue-600 shadow-2xl animate-logo-pop mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
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
                <h1 className="text-4xl font-bold text-white tracking-tight animate-slide-up-fade">Station Easy</h1>
                <p className="text-blue-100 mt-2 text-sm font-medium animate-slide-up-fade animation-delay-200">Your Smart Travel Companion</p>
                
                <div className="absolute bottom-10 animate-slide-up-fade animation-delay-300 opacity-0">
                    <p className="text-xs text-blue-200 uppercase tracking-widest font-semibold">Powered by Indian Railways</p>
                </div>
            </div>
        </div>
      );
  }

  // Wrap content in a fade/slide container key'd by currentScreen to trigger animations
  const renderScreen = () => {
    if (currentScreen === 'language-init') {
        return <LanguageInit onLanguageSelect={handleLanguageInitSelect} />;
    }

    if (currentScreen === 'onboarding') {
      return <Onboarding onComplete={handleOnboardingComplete} t={t} />;
    }

    if (currentScreen === 'login' || currentScreen === 'otp' || currentScreen === 'permissions') {
      return <Auth onComplete={handleAuthComplete} t={t} />;
    }

    if (currentScreen === 'facility-detail' && selectedFacilityId) {
      return (
          <div className="h-full page-enter">
              <FacilityDetail 
                  id={selectedFacilityId} 
                  onBack={handleBack} 
                  onNavigate={handleNavigateClick}
                  isFavorite={favAmenityIds.includes(selectedFacilityId)}
                  onToggleFavorite={() => toggleAmenityFavorite(selectedFacilityId)}
                  t={t}
              />
          </div>
      );
    }

    if (currentScreen === 'navigation') {
        return (
          <div className="h-full page-enter">
              <Navigation 
                onBack={handleBack} 
                t={t} 
                facilityId={selectedFacilityId} // Pass the target facility
                selectedStation={selectedStation}
              />
          </div>
        );
    }

    if (currentScreen === 'feedback') {
        return (
          <div className="h-full page-enter">
              <Feedback onBack={handleBack} t={t} />
          </div>
        );
    }
    
    if (currentScreen === 'about') {
        return (
          <div className="h-full page-enter">
              <About onBack={handleBack} />
          </div>
        );
    }

    if (currentScreen === 'chat') {
        return (
            <div className="h-full page-enter">
                <ChatAssistant onBack={handleBack} t={t} />
            </div>
        );
    }

    if (currentScreen === 'notifications') {
        return (
            <div className="h-full page-enter">
                <Notifications onBack={handleBack} t={t} />
            </div>
        );
    }

    if (currentScreen === 'station-list') {
        return (
            <div className="h-full page-enter">
                <StationList 
                    onBack={handleBack} 
                    onStationSelect={handleStationSelect}
                    t={t}
                />
            </div>
        );
    }

    return (
      <div className="h-full">
          <Layout activeTab={activeTab} onTabChange={handleTabChange} t={t}>
          {activeTab === 'home' && (
              <div className="h-full animate-fade-in">
                <Home 
                    onStationSelect={handleStationSelect} 
                    onNotificationClick={() => setCurrentScreen('notifications')}
                    favStationIds={favStationIds}
                    onToggleStationFav={toggleStationFavorite}
                    onSeeAll={handleSeeAll}
                    t={t}
                />
              </div>
          )}
          
          {activeTab === 'map' && (
              <div className="h-full animate-fade-in">
                <MapExplorer 
                    onFacilityClick={handleFacilityClick}
                    onNavigate={handleNavigateClick}
                    selectedStation={selectedStation}
                    t={t}
                />
              </div>
          )}
          
          {activeTab === 'favorites' && (
            <div className="h-full animate-fade-in">
              <Favorites 
                onStationSelect={handleStationSelect} 
                onFacilitySelect={handleFacilityClick}
                favStationIds={favStationIds}
                favAmenityIds={favAmenityIds}
                onToggleStationFav={toggleStationFavorite}
                onToggleAmenityFav={toggleAmenityFavorite}
                t={t}
              />
            </div>
          )}
          
          {activeTab === 'settings' && (
              <div className="h-full animate-fade-in">
                <Settings 
                    mode="SETTINGS"
                    settings={settings}
                    onUpdateSettings={updateSettings}
                    onLogout={handleLogout} 
                    onFeedback={() => setCurrentScreen('feedback')}
                    onAbout={() => setCurrentScreen('about')}
                    t={t}
                />
              </div>
          )}

          {activeTab === 'profile' && (
              <div className="h-full animate-fade-in">
                <Settings 
                    mode="PROFILE" 
                    settings={settings}
                    onUpdateSettings={updateSettings}
                    onLogout={handleLogout} 
                    onFeedback={() => {}} 
                    onAbout={() => {}} 
                    t={t}
                />
              </div>
          )}
          </Layout>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      {renderScreen()}
    </div>
  );
};

export default App;