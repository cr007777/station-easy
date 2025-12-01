
import React, { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';

interface LanguageInitProps {
  onLanguageSelect: (lang: string) => void;
}

const LanguageInit: React.FC<LanguageInitProps> = ({ onLanguageSelect }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);

  const greetings = [
    { title: "Select Language", subtitle: "Choose your preferred language for the best experience." },
    { title: "भाषा चुनें", subtitle: "सर्वोत्तम अनुभव के लिए अपनी पसंदीदा भाषा चुनें।" },
    { title: "மொழியைத் தேர்ந்தெடு", subtitle: "சிறந்த அனுபவத்திற்கு உங்கள் விருப்பமான மொழியைத் தேர்வு செய்யவும்." },
    { title: "ഭാഷ തിരഞ്ഞെടുക്കുക", subtitle: "മികച്ച അനുഭവത്തിനായി നിങ്ങളുടെ ഇഷ്ട ഭാഷ തിരഞ്ഞെടുക്കുക." } // Malayalam
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-white p-6 flex flex-col items-center max-w-md mx-auto relative">
       <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
           <div className="absolute top-0 right-0 w-full h-1/2 bg-blue-100 rounded-bl-[30%]" />
       </div>

       <div className="z-10 w-full mt-12 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 mb-8">
               <Globe size={32} />
          </div>

          <div className="h-24 text-center transition-all duration-500 mb-2">
            <h2 className={`text-3xl font-bold text-gray-900 mb-2 ${greetingIndex === 3 ? 'font-malayalam' : ''}`}>
                {greetings[greetingIndex].title}
            </h2>
            <p className={`text-gray-500 text-sm ${greetingIndex === 3 ? 'font-malayalam' : ''}`}>
                {greetings[greetingIndex].subtitle}
            </p>
          </div>
          
          <div className="w-full space-y-3 animate-in slide-in-from-bottom-5 duration-500">
              {[
                  { code: 'English', label: 'English', native: 'English' },
                  { code: 'Hindi', label: 'हिन्दी', native: 'Hindi' },
                  { code: 'Tamil', label: 'தமிழ்', native: 'Tamil' },
                  { code: 'Malayalam', label: 'മലയാളം', native: 'Malayalam' },
              ].map((lang) => (
                  <button
                      key={lang.code}
                      onClick={() => onLanguageSelect(lang.code)}
                      className="w-full bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 p-4 rounded-xl flex items-center justify-between transition-all group shadow-sm active:scale-98"
                  >
                      <div className="flex flex-col items-start">
                          <span className={`font-bold text-gray-900 group-hover:text-blue-700 ${lang.code === 'Malayalam' ? 'font-malayalam' : ''}`}>{lang.label}</span>
                          <span className="text-xs text-gray-400 group-hover:text-blue-500">{lang.native}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-500 transition-colors flex items-center justify-center">
                          <Check size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                  </button>
              ))}
          </div>
       </div>
    </div>
  );
};

export default LanguageInit;
