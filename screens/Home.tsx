import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Star, Bell, X, ChevronRight, Heart } from 'lucide-react';
import { FAVORITE_STATIONS, NEARBY_STATIONS, RECENT_STATIONS, ALL_INDIA_STATIONS } from '../constants';
import { Station, Translation } from '../types';
import Header from '../components/Header';

interface HomeProps {
  onStationSelect: (station: Station) => void;
  onNotificationClick: () => void;
  favStationIds: string[];
  onToggleStationFav: (id: string) => void;
  onSeeAll: () => void;
  t: Translation;
}

const Home: React.FC<HomeProps> = ({ onStationSelect, onNotificationClick, favStationIds, onToggleStationFav, onSeeAll, t }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Helper to get translated name
  const getStationName = (station: Station) => {
      return (station.translationKey && t[station.translationKey]) ? t[station.translationKey] : station.name;
  };

  // Combine all stations for the search "database"
  const allStations = useMemo(() => {
    const combined = [...NEARBY_STATIONS, ...FAVORITE_STATIONS, ...RECENT_STATIONS, ...ALL_INDIA_STATIONS];
    // Remove duplicates based on ID
    const unique = new Map();
    combined.forEach(s => unique.set(s.id, s));
    return Array.from(unique.values());
  }, []);

  const filteredStations = useMemo(() => {
    if (!searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return allStations.filter(s => {
      const name = getStationName(s).toLowerCase();
      return name.includes(lowerQuery) || s.line?.toLowerCase().includes(lowerQuery);
    });
  }, [searchQuery, allStations, t]);

  const handleSearchSelect = (station: Station) => {
    setSearchQuery(getStationName(station));
    setShowSuggestions(false);
    onStationSelect(station);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="pb-32 bg-gray-50 dark:bg-gray-900 min-h-full transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 pt-8 pb-20 px-6 rounded-b-[2.5rem] shadow-blue-900/20 shadow-xl z-20 overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-radar"></div>
            <div className="absolute bottom-0 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
        </div>

        <Header 
            transparent 
            showMenu 
            showLogo={false}
            customRight={
                <button 
                  onClick={onNotificationClick}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30 transition-all active:scale-95 relative"
                >
                    <Bell size={24} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-blue-600 animate-pulse"></span>
                </button>
            } 
        />
        
        <div className="mt-4 mb-6 relative z-10">
            <p className="text-blue-100 text-sm font-medium mb-1 opacity-90 animate-slide-in-right" style={{animationDelay: '0.1s'}}>{t.goodMorning}</p>
            <h1 className="text-3xl font-bold text-white tracking-tight whitespace-pre-line animate-slide-in-right" style={{animationDelay: '0.2s'}}>{t.whereTo}</h1>
        </div>
      </div>

      {/* Floating Search Bar Container */}
      <div className="px-6 -mt-8 relative z-30 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-black/20 flex items-center gap-2 border border-gray-100 dark:border-gray-700 transition-colors relative transform hover:scale-[1.01] duration-300">
            <div className="pl-3 text-blue-500">
                <Search size={22} />
            </div>
            <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={t.searchPlaceholder}
                className="flex-1 py-3 bg-transparent outline-none text-gray-700 dark:text-white font-medium placeholder-gray-400"
            />
            
            {searchQuery && (
              <button onClick={clearSearch} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={18} />
              </button>
            )}

            {/* Auto-Complete Dropdown */}
            {showSuggestions && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                {filteredStations.length > 0 ? (
                  <div className="p-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2">{t.recommendations}</h4>
                    {filteredStations.map((station) => (
                      <button
                        key={station.id}
                        onClick={() => handleSearchSelect(station)}
                        className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl transition-colors text-left group"
                      >
                         <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                            <TrainIcon />
                         </div>
                         <div className="flex-1">
                            <h5 className="font-bold text-gray-900 dark:text-white text-sm">{getStationName(station)}</h5>
                            <p className="text-xs text-gray-400">{station.line} • {station.distance}</p>
                         </div>
                         <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    <p className="text-sm">{t.noStationsFound} "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>

      <div className="p-6 space-y-8 relative z-0">
        {/* Nearby - Horizontal Scroll */}
        <section className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center justify-between mb-4 px-1">
             <h3 className="text-gray-800 dark:text-white font-bold text-lg">{t.nearby}</h3>
             <button 
                onClick={onSeeAll}
                className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider hover:underline"
             >
                {t.seeAll}
             </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
            {NEARBY_STATIONS.map((station, i) => (
              <div 
                key={station.id} 
                onClick={() => onStationSelect(station)}
                className={`stagger-item min-w-[220px] bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 active:scale-95 transition-all duration-300 relative group overflow-hidden cursor-pointer hover:shadow-md`}
                style={{animationDelay: `${i * 100 + 400}ms`}}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full -mr-10 -mt-10 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-all duration-500 group-hover:scale-125"></div>
                
                <div className="relative">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300">
                            <MapPin size={20} />
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-2 py-1 rounded-lg">{station.distance}</span>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleStationFav(station.id);
                                }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${favStationIds.includes(station.id) ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500' : 'bg-gray-50 dark:bg-gray-700 text-gray-300 dark:text-gray-500 hover:text-gray-400'}`}
                            >
                                <Heart 
                                    size={16} 
                                    fill={favStationIds.includes(station.id) ? "currentColor" : "none"} 
                                    className={`transition-all duration-300 ${favStationIds.includes(station.id) ? 'animate-scale-bounce' : ''}`}
                                />
                            </button>
                        </div>
                    </div>
                    
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 line-clamp-2">{getStationName(station)}</h4>
                    <p className="text-sm text-gray-400">{station.line}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Used - Vertical List */}
        <section className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h3 className="text-gray-800 dark:text-white font-bold text-lg mb-4 px-1">{t.recent}</h3>
          <div className="space-y-4">
            {RECENT_STATIONS.map((station, i) => (
              <div 
                key={station.id} 
                onClick={() => onStationSelect(station)}
                className={`stagger-item bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 active:scale-98 transition-all hover:bg-gray-50 dark:hover:bg-gray-800/80 cursor-pointer`}
                style={{animationDelay: `${i * 100 + 700}ms`}}
              >
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-2xl flex items-center justify-center shrink-0">
                   <Clock size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">{getStationName(station)}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{station.line}</p>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleStationFav(station.id);
                    }}
                    className={`p-2 rounded-xl transition-colors ${favStationIds.includes(station.id) ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'text-gray-300 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                    <Heart 
                        size={20} 
                        fill={favStationIds.includes(station.id) ? "currentColor" : "none"} 
                        className={favStationIds.includes(station.id) ? 'animate-scale-bounce' : ''}
                    />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Favorites Section */}
        <section className="animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h3 className="text-gray-800 dark:text-white font-bold text-lg mb-4 px-1">{t.favorites}</h3>
          {favStationIds.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStations.filter(s => favStationIds.includes(s.id)).slice(0, 4).map((station, i) => (
                  <div 
                    key={station.id} 
                    onClick={() => onStationSelect(station)}
                    className={`stagger-item bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700 ring-1 ring-blue-50 dark:ring-0 active:scale-95 transition-all cursor-pointer hover:shadow-md hover:-translate-y-1 duration-300`}
                    style={{animationDelay: `${i * 100 + 900}ms`}}
                  >
                     <div className="flex justify-between items-start mb-3">
                        <div className="w-8 h-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center text-yellow-500">
                            <Star size={14} fill="currentColor" />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">{station.distance}</span>
                     </div>
                     <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2">{getStationName(station)}</h4>
                     <p className="text-xs text-gray-400 mt-1">{station.line}</p>
                  </div>
                ))}
              </div>
          ) : (
              <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 text-gray-400 stagger-item delay-500">
                  <p className="text-sm">{t.noSaved}</p>
              </div>
          )}
        </section>
      </div>
    </div>
  );
};

const TrainIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4 11V9a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
        <rect width="16" height="8" x="4" y="11" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3V2" />
        <path d="M8 15h.01" />
        <path d="M16 15h.01" />
        <path d="M6 19v2" />
        <path d="M18 19v2" />
    </svg>
);

export default Home;