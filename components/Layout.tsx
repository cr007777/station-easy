
import React from 'react';
import { Home, Map as MapIcon, Heart, Settings, MessageSquarePlus } from 'lucide-react';
import { ScreenName, Translation } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: ScreenName;
  onTabChange: (tab: ScreenName) => void;
  hideNav?: boolean;
  t: Translation;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, hideNav, t }) => {
  const NavItem = ({ name, icon: Icon, tab }: { name: string; icon: any; tab: ScreenName }) => {
    const isActive = activeTab === tab;
    return (
      <button 
        onClick={() => onTabChange(tab)}
        className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${isActive ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 shadow-sm translate-y-[-4px]' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
      >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} className="transition-all duration-300" />
        {isActive && (
          <span className="absolute -bottom-2 w-1 h-1 bg-blue-600 rounded-full animate-fade-in"></span>
        )}
      </button>
    );
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden max-w-md mx-auto shadow-2xl relative transition-colors duration-300">
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-0">
        {children}
      </div>

      {/* AI Assistant FAB */}
      {!hideNav && activeTab !== 'chat' && (
        <button 
          onClick={() => onTabChange('chat')}
          className="absolute bottom-28 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all z-40 group"
        >
          <MessageSquarePlus size={24} />
          <span className="absolute right-16 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {t.aiHelp}
          </span>
        </button>
      )}

      {!hideNav && (
        <div className="absolute bottom-6 left-4 right-4 z-50">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 shadow-blue-900/10 dark:shadow-black/40 shadow-2xl rounded-3xl px-2 py-3 flex justify-between items-center transition-colors duration-300">
              <NavItem name={t.home} icon={Home} tab="home" />
              <NavItem name={t.map} icon={MapIcon} tab="map" />
              <NavItem name={t.saved} icon={Heart} tab="favorites" />
              <NavItem name={t.settings} icon={Settings} tab="settings" />
            </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
