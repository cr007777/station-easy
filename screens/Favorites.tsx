import React, { useState } from 'react';
import Header from '../components/Header';
import { Star, MapPin, Utensils, Armchair, Heart, Filter, Check } from 'lucide-react';
import { AMENITIES, FAVORITE_STATIONS, NEARBY_STATIONS, RECENT_STATIONS } from '../constants';
import { Station, Translation, Amenity } from '../types';

interface FavoritesProps {
  onStationSelect: (station: Station) => void;
  onFacilitySelect: (id: string) => void;
  favStationIds: string[];
  favAmenityIds: string[];
  onToggleStationFav: (id: string) => void;
  onToggleAmenityFav: (id: string) => void;
  t: Translation;
}

const Favorites: React.FC<FavoritesProps> = ({ 
    onStationSelect, 
    onFacilitySelect, 
    favStationIds, 
    favAmenityIds, 
    onToggleStationFav, 
    onToggleAmenityFav, 
    t 
}) => {
  // Combine all possible stations to look up by ID
  const allStations = [...NEARBY_STATIONS, ...FAVORITE_STATIONS, ...RECENT_STATIONS];
  // Dedupe
  const uniqueStations = Array.from(new Map(allStations.map(s => [s.id, s])).values());

  const displayedStations = uniqueStations.filter(s => favStationIds.includes(s.id));
  const displayedAmenities = AMENITIES.filter(a => favAmenityIds.includes(a.id));
  
  // Filter State: 'ALL', 'STATIONS', 'AMENITIES'
  const [filter, setFilter] = useState<'ALL' | 'STATIONS' | 'AMENITIES'>('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Helper to get translated name
  const getStationName = (station: Station) => {
      return (station.translationKey && t[station.translationKey]) ? t[station.translationKey] : station.name;
  };

  const getAmenityName = (amenity: Amenity) => {
      return (amenity.translationKey && t[amenity.translationKey]) ? t[amenity.translationKey] : amenity.name;
  };

  // Helper to translate amenity type
  const getTranslatedAmenityType = (type: string) => {
      switch(type) {
          case 'Food & Dining': return t.catFoodStalls || t.catFood;
          case 'Restroom': return t.catRestroom;
          case 'ATM': return t.catATM;
          case 'Retail & Shops': return t.catShop;
          case 'Waiting Room': return t.catWaiting;
          case 'Ticket Counter': return t.catTicket;
          case 'Information': return t.catInfo;
          default: return type;
      }
  };

  // Determine what to show based on filter and data availability
  const showStations = (filter === 'ALL' || filter === 'STATIONS') && displayedStations.length > 0;
  const showAmenities = (filter === 'ALL' || filter === 'AMENITIES') && displayedAmenities.length > 0;
  
  // Check if current view is empty (respecting filter)
  const isCurrentViewEmpty = !showStations && !showAmenities;

  const FilterDropdown = (
    <div className="relative">
        <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2 rounded-xl transition-colors ${filter !== 'ALL' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        >
            <Filter size={22} />
        </button>
        
        {isFilterOpen && (
            <>
                <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)}></div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 flex flex-col p-1">
                     <button 
                        onClick={() => { setFilter('ALL'); setIsFilterOpen(false); }}
                        className={`px-4 py-3 text-sm font-medium rounded-xl flex items-center justify-between transition-colors ${filter === 'ALL' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                     >
                        {t.allSaved}
                        {filter === 'ALL' && <Check size={16} />}
                     </button>
                     <button 
                        onClick={() => { setFilter('STATIONS'); setIsFilterOpen(false); }}
                        className={`px-4 py-3 text-sm font-medium rounded-xl flex items-center justify-between transition-colors ${filter === 'STATIONS' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                     >
                        {t.stations}
                        {filter === 'STATIONS' && <Check size={16} />}
                     </button>
                     <button 
                        onClick={() => { setFilter('AMENITIES'); setIsFilterOpen(false); }}
                        className={`px-4 py-3 text-sm font-medium rounded-xl flex items-center justify-between transition-colors ${filter === 'AMENITIES' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                     >
                        {t.amenities}
                        {filter === 'AMENITIES' && <Check size={16} />}
                     </button>
                </div>
            </>
        )}
    </div>
  );

  return (
    <div className="pb-32 h-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header title={t.savedLocations} glass customRight={FilterDropdown} />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {/* Empty State */}
        {isCurrentViewEmpty && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-300 dark:text-gray-600 animate-fade-in">
                <Heart size={64} className="mb-6 opacity-20" />
                <p className="font-medium text-lg">{t.noSaved}</p>
                <p className="text-sm">{t.tryFilters}</p>
            </div>
        )}

        {/* Saved Stations */}
        {showStations && (
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1 stagger-item">{t.stations}</h3>
                {displayedStations.map((station, i) => (
                    <div 
                        key={station.id} 
                        onClick={() => onStationSelect(station)}
                        className={`stagger-item bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between group transition-colors cursor-pointer active:scale-98`}
                        style={{animationDelay: `${i * 100}ms`}}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{getStationName(station)}</h4>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">{station.line} • {station.distance}</p>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleStationFav(station.id);
                            }}
                            className="p-2.5 text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors"
                        >
                            <Star size={20} fill="currentColor" />
                        </button>
                    </div>
                ))}
            </div>
        )}

        {/* Saved Amenities */}
        {showAmenities && (
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1 stagger-item delay-200">{t.amenities}</h3>
                {displayedAmenities.map((amenity, i) => (
                    <div 
                        key={amenity.id} 
                        onClick={() => onFacilitySelect(amenity.id)}
                        className={`stagger-item bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between group transition-colors cursor-pointer active:scale-98`}
                        style={{animationDelay: `${i * 100 + 200}ms`}}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                {amenity.type === 'Food & Dining' ? <Utensils size={20} /> : 
                                amenity.type === 'Waiting Room' ? <Armchair size={20} /> : <MapPin size={20} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{getAmenityName(amenity)}</h4>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">{getTranslatedAmenityType(amenity.type)} • {amenity.distance}</p>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleAmenityFav(amenity.id);
                            }}
                            className="p-2.5 text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors"
                        >
                            <Star size={20} fill="currentColor" />
                        </button>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;