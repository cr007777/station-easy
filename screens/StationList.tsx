import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import { NEARBY_STATIONS, FAVORITE_STATIONS, RECENT_STATIONS, ALL_INDIA_STATIONS } from '../constants';
import { Station, Translation } from '../types';

interface StationListProps {
  onBack: () => void;
  onStationSelect: (station: Station) => void;
  t: Translation;
}

const StationList: React.FC<StationListProps> = ({ onBack, onStationSelect, t }) => {
  const [search, setSearch] = useState('');

  // Combine unique stations including ALL INDIA list
  const allStations = useMemo(() => {
      const combined = [...NEARBY_STATIONS, ...FAVORITE_STATIONS, ...RECENT_STATIONS, ...ALL_INDIA_STATIONS];
      const unique = Array.from(new Map(combined.map(s => [s.id, s])).values());
      // Sort alphabetically by name
      return unique.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => {
      return allStations.filter(s => {
          const name = (s.translationKey && t[s.translationKey] ? t[s.translationKey] : s.name).toLowerCase();
          const query = search.toLowerCase();
          return name.includes(query) || s.line?.toLowerCase().includes(query);
      });
  }, [allStations, search, t]);

  const getStationName = (station: Station) => {
      return (station.translationKey && t[station.translationKey]) ? t[station.translationKey] : station.name;
  };

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      <Header title={t.allStationsTitle} showBack onBack={onBack} />
      
      <div className="p-4 bg-white dark:bg-gray-800 shadow-sm z-10 sticky top-[72px]">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 border border-transparent focus-within:border-blue-500 transition-colors">
            <Search size={20} className="text-gray-400 mr-3" />
            <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-900 dark:text-white placeholder-gray-500"
                autoFocus
            />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {filtered.map((station, i) => (
            <button 
                key={station.id}
                onClick={() => onStationSelect(station)}
                className={`stagger-item w-full bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 active:scale-98 transition-all hover:bg-gray-50 dark:hover:bg-gray-700/50 group`}
                style={{animationDelay: `${Math.min(i * 50, 1000)}ms`}}
            >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                    <MapPin size={24} />
                </div>
                <div className="flex-1 text-left">
                    <h4 className="font-bold text-gray-900 dark:text-white">{getStationName(station)}</h4>
                    <p className="text-xs text-gray-400 mt-1">{station.line} <span className="mx-1">•</span> {station.distance !== '-' ? station.distance : 'India'}</p>
                </div>
                <ChevronRight size={20} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />
            </button>
        ))}
        {filtered.length === 0 && (
            <div className="text-center p-8 text-gray-400 mt-10">
                <p>{t.noStationsFound}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default StationList;