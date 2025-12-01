
import React, { useState } from 'react';
import { Search, Minus, Navigation, Info, Coffee, Accessibility, ShoppingBag, CreditCard, Zap, LocateFixed, Loader2, Maximize, Minimize } from 'lucide-react';
import Header from '../components/Header';
import { NEARBY_STATIONS } from '../constants';
import { AmenityType, Station, Translation } from '../types';

interface MapExplorerProps {
  onFacilityClick: (id: string) => void;
  onNavigate: () => void;
  selectedStation: Station | null;
  t: Translation;
}

const MapExplorer: React.FC<MapExplorerProps> = ({ onFacilityClick, onNavigate, selectedStation, t }) => {
  const [showFacilityList, setShowFacilityList] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFacilityList = () => setShowFacilityList(!showFacilityList);

  const handleCategoryClick = (type: string) => {
      // Toggle if clicking same category, else set new
      setActiveCategory(prev => prev === type ? null : type);
      setUserLocation(null); // Reset user location view when filtering facilities
  };

  const handleLocateMe = () => {
      setIsLocating(true);
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  setUserLocation(`${latitude},${longitude}`);
                  setActiveCategory(null); // Clear active filters to show location clearly
                  setIsLocating(false);
              },
              (error) => {
                  console.warn("Location access error:", error.message);
                  alert("Could not access location. Please check GPS settings.");
                  setIsLocating(false);
              },
              { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
          );
      } else {
          alert("Geolocation is not supported by this browser.");
          setIsLocating(false);
      }
  };

  // Determine display name
  const currentStation = selectedStation || NEARBY_STATIONS[0];
  
  // Localized name for Header
  const stationName = (currentStation.translationKey && t[currentStation.translationKey]) 
    ? t[currentStation.translationKey] 
    : currentStation.name;

  // Map AmenityType to Google Maps Search Term
  const getSearchTerm = (type: string) => {
      switch (type) {
          case AmenityType.FOOD: return 'Restaurants';
          case AmenityType.RESTROOM: return 'Public Toilet';
          case AmenityType.ATM: return 'ATM';
          case AmenityType.SHOP: return 'Stores';
          case AmenityType.WAITING: return 'Waiting Room';
          case AmenityType.TICKET: return 'Ticket Counter';
          case AmenityType.INFO: return 'Information Kiosk';
          case 'CHARGING': return 'Mobile Charging Point';
          default: return type;
      }
  };

  // Construct Map Query
  let mapQueryName = `${currentStation.name} Railway Station, India`;
  
  if (userLocation) {
      mapQueryName = userLocation;
  } else if (activeCategory) {
      const term = getSearchTerm(activeCategory);
      mapQueryName = `${term} near ${currentStation.name} Railway Station, India`;
  }

  // Changed t=h (Hybrid) to t=m (Standard Map) for Google Maps look
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQueryName)}&t=m&z=16&ie=UTF8&iwloc=&output=embed`;

  // Map AmenityType to Translation Key for the list
  const getTranslatedType = (type: AmenityType | string) => {
      switch (type) {
          case AmenityType.FOOD: return t.catFoodStalls;
          case AmenityType.RESTROOM: return t.catRestroom;
          case AmenityType.ATM: return t.catATM;
          case AmenityType.SHOP: return t.catShop;
          case AmenityType.WAITING: return t.catWaiting;
          case AmenityType.TICKET: return t.catTicket;
          case AmenityType.INFO: return t.catInfo;
          case 'CHARGING': return t.catCharging;
          default: return type;
      }
  };

  return (
    <div className="h-full flex flex-col relative bg-[#f0f2f5] dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {!isFullScreen && (
        <Header title={stationName} showMenu={false} transparent={false} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md" />
      )}
      
      {/* Map Area */}
      <div className="flex-1 relative bg-[#e5e7eb] dark:bg-gray-900 touch-none overflow-hidden transition-colors duration-300">
            {/* DYNAMIC GOOGLE MAPS EMBED */}
            <iframe 
                key={`${currentStation.id}-${activeCategory}-${userLocation}`} // Force re-render on station or category change
                src={mapUrl}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Station Map"
            ></iframe>

            {/* Full Screen Toggle Button */}
            <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="absolute top-4 right-4 p-3 rounded-full shadow-lg border transition-all active:scale-95 z-10 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
                {isFullScreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>

            {/* Locate Me Button - Moved to Top Right below Full Screen button to avoid covering map controls */}
            <button 
                onClick={handleLocateMe}
                disabled={isLocating}
                className={`absolute top-20 right-4 p-3 rounded-full shadow-lg border transition-all active:scale-95 z-10 flex items-center justify-center ${userLocation ? 'bg-blue-600 text-white border-blue-700' : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-gray-100 dark:border-gray-700'}`}
            >
                {isLocating ? <Loader2 size={24} className="animate-spin" /> : <LocateFixed size={24} />}
            </button>
      </div>

      {/* Bottom Sheet Action Bar */}
      {!isFullScreen && (
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-5 pb-32 rounded-t-[2.5rem] shadow-[0_-8px_40px_rgba(0,0,0,0.12)] z-20 relative border-t border-white/50 dark:border-gray-700 transition-colors animate-slide-up">
           <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-6" />
           <div className="flex gap-4">
               <button 
                  onClick={onNavigate}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden"
               >
                   <Navigation size={22} fill="currentColor" fillOpacity="0.2" />
                   {t.navigate}
               </button>
               <button 
                  onClick={toggleFacilityList}
                  className={`flex-1 border text-gray-800 dark:text-white py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-sm flex items-center justify-center gap-3 ${activeCategory ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
               >
                   <Search size={22} className={activeCategory ? "text-blue-600" : "text-blue-600 dark:text-blue-400"} />
                   {activeCategory ? getTranslatedType(activeCategory) : t.findFacility}
               </button>
           </div>
        </div>
      )}

      {/* Facility List Overlay */}
      {showFacilityList && !isFullScreen && (
          <div className="absolute inset-0 z-30 bg-gray-900/20 backdrop-blur-sm flex items-end sm:items-center justify-center" onClick={toggleFacilityList}>
              <div 
                  className="bg-white dark:bg-gray-800 w-full max-w-md p-6 pb-32 rounded-t-3xl sm:rounded-3xl animate-slide-up shadow-2xl transition-colors"
                  onClick={e => e.stopPropagation()}
              >
                  <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.stationFacilities}</h2>
                      <button onClick={toggleFacilityList} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded-full transition-colors active:scale-90">
                          <Minus size={20} />
                      </button>
                  </div>
                  <div className="grid grid-cols-4 gap-y-6 gap-x-4">
                     {[
                        { type: AmenityType.RESTROOM, icon: Accessibility, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' },
                        { type: AmenityType.FOOD, icon: Coffee, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400' },
                        { type: AmenityType.SHOP, icon: ShoppingBag, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400' },
                        { type: AmenityType.ATM, icon: CreditCard, color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' },
                        { type: AmenityType.INFO, icon: Info, color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
                        { type: 'CHARGING', icon: Zap, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400' },
                     ].map((item, i) => {
                         const isActive = activeCategory === item.type;
                         return (
                             <button 
                                key={i} 
                                onClick={() => handleCategoryClick(item.type)}
                                className="flex flex-col items-center gap-2 group transition-transform duration-200 active:scale-95"
                            >
                                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-sm group-hover:shadow-md border ${isActive ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'border-white dark:border-gray-600'} ${item.color}`}>
                                     <item.icon size={28} />
                                 </div>
                                 <span className={`text-xs font-semibold text-center leading-tight ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>
                                    {getTranslatedType(item.type)}
                                 </span>
                             </button>
                         );
                     })}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default MapExplorer;
