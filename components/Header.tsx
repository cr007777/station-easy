import React from 'react';
import { Menu, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showMenu?: boolean;
  showLogo?: boolean;
  customRight?: React.ReactNode;
  transparent?: boolean;
  glass?: boolean;
  className?: string;
  lightText?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack, 
  onBack, 
  showMenu = true,
  showLogo = true,
  customRight,
  transparent = false,
  glass = false,
  className = "",
  lightText = false
}) => {
  const baseClasses = "px-6 py-4 flex items-center justify-between z-40 transition-all duration-300";
  const bgClasses = glass 
    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm sticky top-0" 
    : transparent 
      ? "bg-transparent absolute top-0 left-0 right-0" 
      : "bg-white dark:bg-gray-900 shadow-sm sticky top-0";
  
  // Logic for text color: 
  // If transparent or lightText is explicitly true -> White
  // Else -> Dark in light mode, White in dark mode
  const textClass = (transparent || lightText) ? "text-white" : "text-gray-900 dark:text-white";
  const iconClass = (transparent || lightText) ? "text-white" : "text-gray-700 dark:text-gray-200";

  return (
    <div className={`${baseClasses} ${bgClasses} ${className}`}>
      <div className="flex items-center gap-4 flex-1">
        {showBack ? (
          <button 
            onClick={onBack} 
            className={`p-2 rounded-xl active:scale-95 transition-transform ${glass || !transparent ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : 'bg-white/20 backdrop-blur-md hover:bg-white/30'}`}
          >
            <ChevronLeft size={24} className={iconClass} />
          </button>
        ) : (
          showLogo && (
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm ${transparent ? 'bg-white/20 border-white/30 backdrop-blur-md text-white' : 'bg-blue-600 border-transparent text-white'}`}>
                 {/* Custom Train Logo */}
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
            </div>
          )
        )}
        {title && (
          <h1 className={`text-lg font-bold truncate flex-1 ${textClass} tracking-tight`}>
            {title}
          </h1>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {customRight ? customRight : (showMenu && (
            <button className={`p-2 rounded-xl transition-colors ${transparent ? 'text-white hover:bg-white/20' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <Menu size={24} />
            </button>
        ))}
      </div>
    </div>
  );
};

export default Header;