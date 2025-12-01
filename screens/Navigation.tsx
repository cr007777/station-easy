
import React, { useState, useEffect } from 'react';
import { Volume2, AlertTriangle, Navigation as NavIcon, MapPin, Loader2, X, Maximize, Minimize } from 'lucide-react';
import Header from '../components/Header';
import { Translation, Station } from '../types';
import { AMENITIES, NEARBY_STATIONS } from '../constants';

interface NavigationProps {
  onBack: () => void;
  t: Translation;
  facilityId?: string | null;
  selectedStation: Station | null;
}

const Navigation: React.FC<NavigationProps> = ({ onBack, t, facilityId, selectedStation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Find target facility info if an ID exists
  const targetFacility = facilityId ? AMENITIES.find(a => a.id === facilityId) : null;
  const currentStation = selectedStation || NEARBY_STATIONS[0];
  
  // Get translated name if available
  const getFacilityName = (amenity: any) => {
      return (amenity.translationKey && t[amenity.translationKey]) ? t[amenity.translationKey] : amenity.name;
  };

  const stationName = (currentStation.translationKey && t[currentStation.translationKey]) 
    ? t[currentStation.translationKey] 
    : currentStation.name;

  const destinationName = targetFacility ? getFacilityName(targetFacility) : stationName;

  // Fetch User Location on Mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoadingLoc(false);
        },
        (error) => {
          // Log warning instead of error to avoid scary console logs, and handle gracefully
          console.warn("Location access denied or error:", error.message);
          setLoadingLoc(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      setLoadingLoc(false);
    }
  }, []);

  const handleToggleNavigation = () => {
      setIsNavigating(!isNavigating);
  };

  // Override title for dynamic context
  const dynamicTitle = `${t.navigate} ${destinationName}`;

  // Construct Map URL with t=m (Standard Map)
  // Query depends on if we have a specific facility or just the station
  let query = '';
  if (targetFacility) {
      query = `${targetFacility.name}, ${currentStation.name} Railway Station, India`;
  } else {
      query = `${currentStation.name} Railway Station, India`;
  }
  
  let mapUrl = '';
  if (isNavigating && userLocation) {
      // Show path from User -> Destination (Directions Mode)
      mapUrl = `https://maps.google.com/maps?saddr=${userLocation.lat},${userLocation.lng}&daddr=${encodeURIComponent(query)}&output=embed&t=m&z=17`;
  } else {
      // Default: Just show destination marker
      mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&t=m&z=17`;
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col relative overflow-hidden">
      {/* 1. Full Screen Map Layer */}
      <div className="absolute inset-0 z-0 bg-[#f3f4f6]">
          {loadingLoc ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <Loader2 size={32} className="animate-spin mb-2" />
                  <p className="text-sm">Locating you...</p>
              </div>
          ) : (
              <iframe 
                key={isNavigating ? 'nav-active' : 'nav-idle'} // Force re-render on state change
                src={mapUrl}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Navigation Map"
            ></iframe>
          )}
      </div>

      {/* 2. Floating Header - Conditional */}
      {!isFullScreen && (
        <div className="absolute top-0 left-0 right-0 z-20">
           <Header title={dynamicTitle} showBack onBack={onBack} glass className="bg-white/90 dark:bg-gray-900/90" />
        </div>
      )}

      {/* Full Screen Toggle Button */}
      <button 
        onClick={() => setIsFullScreen(!isFullScreen)}
        className={`absolute right-4 p-3 rounded-full shadow-lg border transition-all active:scale-95 z-40 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${isFullScreen ? 'top-4' : 'top-24'}`}
      >
        {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
      </button>

      {/* 4. Bottom Sheet Pop-up List - Conditional */}
      {!isFullScreen && (
        <div 
            className={`absolute bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out flex flex-col border-t border-gray-100 dark:border-gray-700 ${isExpanded ? 'h-[60%]' : 'h-[35%]'}`}
        >
            {/* Drag Handle */}
            <div 
                className="w-full flex justify-center pt-3 pb-1 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Instructions List */}
            <div className="flex-1 overflow-y-auto px-6 pt-2 pb-4 no-scrollbar">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.stepsTitle}</h3>
                    {isNavigating && (
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded animate-pulse">
                            {t.navigationActive}
                        </span>
                    )}
                </div>
                
                <div className="space-y-6 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-700 -z-10" />

                    <div className="flex items-start gap-4 transition-all duration-300 group">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ring-4 ring-white dark:ring-gray-800 z-10 bg-blue-600 text-white">
                            <MapPin size={12} />
                        </div>
                        <div className="flex-1 pb-2 border-b border-gray-50 dark:border-gray-700/50">
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{t.navStep1}</p>
                            <p className="text-sm text-gray-400">{t.navStep1Desc}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 transition-all duration-300 group">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ring-4 ring-white dark:ring-gray-800 z-10 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300">2</div>
                        <div className="flex-1 pb-2 border-b border-gray-50 dark:border-gray-700/50">
                            <p className="text-lg font-bold text-gray-500 dark:text-gray-400">{t.navStep2}</p>
                            <p className="text-sm text-gray-400">{t.navStep2Desc}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 transition-all duration-300 group">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ring-4 ring-white dark:ring-gray-800 z-10 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300">3</div>
                        <div className="flex-1">
                            <p className="text-lg font-bold text-gray-500 dark:text-gray-400">{t.navStep3}</p>
                            <p className="text-sm text-gray-400">{t.navStep3Desc}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Action */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 pb-8">
                <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-bold mb-3">
                    <AlertTriangle size={14} />
                    <span>{t.navHeavyCrowd}</span>
                </div>
                <button 
                    onClick={handleToggleNavigation}
                    className={`w-full text-white py-4 rounded-2xl font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between px-8 ${isNavigating ? 'bg-red-500 shadow-red-500/20' : 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-blue-500/20'}`}
                >
                    <span>{isNavigating ? t.stopNavigation : t.startNavigation}</span>
                    <div className="bg-white/20 p-2 rounded-lg">
                    {isNavigating ? <X size={20} /> : <NavIcon size={20} />}
                    </div>
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
