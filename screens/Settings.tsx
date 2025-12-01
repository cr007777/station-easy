import React, { useState } from 'react';
import Header from '../components/Header';
import { Globe, ToggleRight, ToggleLeft, Sun, MessageSquare, HelpCircle, ChevronRight, Check, X, Moon, Laptop, LogOut, BadgeCheck } from 'lucide-react';
import { CURRENT_USER } from '../constants';
import { AppSettings, Translation } from '../types';

interface SettingsProps {
  onLogout: () => void;
  onFeedback: () => void;
  onAbout: () => void;
  mode: 'SETTINGS' | 'PROFILE';
  settings: AppSettings;
  onUpdateSettings: (s: Partial<AppSettings>) => void;
  t: Translation;
}

const Settings: React.FC<SettingsProps> = ({ onLogout, onFeedback, onAbout, mode, settings, onUpdateSettings, t }) => {
  const [activeModal, setActiveModal] = useState<'LANGUAGE' | 'THEME' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const SettingsItem = ({ icon: Icon, label, value, onClick, isToggle = false, toggleValue = false, color = "text-blue-500", bgColor = "bg-blue-50 dark:bg-blue-900/20" }: any) => (
    <button 
        onClick={onClick}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 active:bg-blue-50/50 dark:active:bg-blue-900/30 transition-colors group first:rounded-t-2xl last:rounded-b-2xl border-b border-gray-50 dark:border-gray-700 last:border-0"
    >
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 ${bgColor} ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={20} />
            </div>
            <div className="text-left">
                <span className="font-semibold text-gray-900 dark:text-white block text-sm">{label}</span>
                {value && !isToggle && <span className="text-xs text-gray-400 font-medium">{value}</span>}
            </div>
        </div>
        
        {isToggle ? (
            <div className={`transition-colors duration-300 ${toggleValue ? 'text-blue-600' : 'text-gray-300 dark:text-gray-600'}`}>
                 {toggleValue ? <ToggleRight size={32} fill="currentColor" className="opacity-100" /> : <ToggleLeft size={32} />}
            </div>
        ) : (
            <ChevronRight size={18} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />
        )}
    </button>
  );

  // Define language options with display labels (Native Scripts)
  const languageOptions = [
    { code: 'English', label: 'English' },
    { code: 'Hindi', label: 'हिन्दी' },
    { code: 'Tamil', label: 'தமிழ்' },
    { code: 'Malayalam', label: 'മലയാളം' }
  ];

  // Helper to get current language display label
  const currentLanguageLabel = languageOptions.find(l => l.code === settings.language)?.label || settings.language;

  // SETTINGS MODE
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 relative pb-32 transition-colors duration-300">
        <Header title={t.settings} showMenu={false} showLogo={false} />
        
        <div className="p-6 space-y-6 overflow-y-auto h-full no-scrollbar">
            
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center stagger-item delay-75">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl">
                    <span className="text-lg font-bold font-mono tracking-wide">{CURRENT_USER.mobile}</span>
                    <BadgeCheck size={20} fill="currentColor" className="text-blue-600 dark:text-blue-400" />
                </div>
            </div>

            {/* General Section */}
            <div className="stagger-item delay-150">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-2">{t.preferences}</h3>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                    <SettingsItem 
                        icon={Globe} 
                        label={t.language} 
                        value={currentLanguageLabel} 
                        onClick={() => setActiveModal('LANGUAGE')} 
                    />
                    <SettingsItem 
                        icon={Sun} 
                        label={t.appTheme} 
                        value={settings.theme === 'light' ? t.lightMode : settings.theme === 'dark' ? t.darkMode : t.systemDefault}
                        onClick={() => setActiveModal('THEME')} 
                        color="text-orange-500"
                        bgColor="bg-orange-50 dark:bg-orange-900/20"
                    />
                </div>
            </div>

            {/* Support Section */}
            <div className="stagger-item delay-200">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-2">{t.support}</h3>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                    <SettingsItem 
                        icon={MessageSquare} 
                        label={t.sendFeedback} 
                        onClick={onFeedback} 
                        color="text-green-500"
                        bgColor="bg-green-50 dark:bg-green-900/20"
                    />
                    <SettingsItem 
                        icon={HelpCircle} 
                        label={t.helpAbout} 
                        onClick={onAbout} 
                    />
                </div>
            </div>

            {/* Account Section */}
            <div className="stagger-item delay-300">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-2">{t.account}</h3>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
                    <button 
                        onClick={onLogout}
                        className="w-full p-4 flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <LogOut size={20} />
                            </div>
                            <span className="font-semibold text-red-600 dark:text-red-400 block text-sm">{t.logout}</span>
                        </div>
                    </button>
                </div>
            </div>

             <div className="pt-4 pb-8 flex flex-col items-center stagger-item delay-400">
                <p className="text-xs text-gray-400">Station Easy v2.2.0 (Build 408)</p>
            </div>
        </div>

        {/* TOAST NOTIFICATION */}
        {toastMessage && (
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-gray-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-gray-900 px-6 py-3 rounded-full text-sm font-medium shadow-2xl z-50 animate-fade-in-up border border-white/10 flex items-center gap-2">
                <Check size={16} className="text-green-400 dark:text-green-600" />
                {toastMessage}
            </div>
        )}

        {/* MODALS / BOTTOM SHEETS */}
        {activeModal && (
            <div className="absolute inset-0 z-50">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setActiveModal(null)} />
                <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-[2rem] p-6 animate-slide-up shadow-2xl overflow-y-auto max-h-[80vh] no-scrollbar pb-32">
                    <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6" />
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {activeModal === 'LANGUAGE' ? t.chooseLanguage : t.appearance}
                        </h3>
                        <button onClick={() => setActiveModal(null)} className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-3 pb-8">
                        {activeModal === 'LANGUAGE' ? (
                            languageOptions.map((langObj, i) => (
                                <button 
                                    key={langObj.code}
                                    onClick={() => {
                                        onUpdateSettings({ language: langObj.code });
                                        setActiveModal(null);
                                        showToast(`${t.language} set to ${langObj.label}`);
                                    }}
                                    className={`stagger-item w-full p-4 rounded-2xl flex items-center justify-between border transition-all ${settings.language === langObj.code ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 shadow-sm' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    style={{animationDelay: `${i * 50}ms`}}
                                >
                                    <span className={`font-semibold text-gray-900 dark:text-white ${langObj.code === 'Malayalam' ? 'font-malayalam' : ''}`}>{langObj.label}</span>
                                    {settings.language === langObj.code && <div className="bg-blue-600 text-white rounded-full p-1"><Check size={14} /></div>}
                                </button>
                            ))
                        ) : (
                            [
                                { id: 'light', icon: Sun, label: t.lightMode },
                                { id: 'dark', icon: Moon, label: t.darkMode },
                                { id: 'system', icon: Laptop, label: t.systemDefault }
                            ].map((theme, i) => (
                                <button 
                                    key={theme.id}
                                    onClick={() => {
                                        onUpdateSettings({ theme: theme.id as any });
                                        setActiveModal(null);
                                        showToast(`${t.appTheme} set to ${theme.label}`);
                                    }}
                                    className={`stagger-item w-full p-4 rounded-2xl flex items-center gap-4 border transition-all ${settings.theme === theme.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 shadow-sm' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    style={{animationDelay: `${i * 50}ms`}}
                                >
                                    <theme.icon size={20} className="text-gray-700 dark:text-gray-300" />
                                    <span className="font-semibold flex-1 text-left text-gray-900 dark:text-white">{theme.label}</span>
                                    {settings.theme === theme.id && <div className="bg-blue-600 text-white rounded-full p-1"><Check size={14} /></div>}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Settings;