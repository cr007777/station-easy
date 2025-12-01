import React from 'react';
import Header from '../components/Header';
import { ChevronRight, FileText, Lock, HelpCircle, Info } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="h-full bg-white flex flex-col">
      <Header title="About App / Help" showBack onBack={onBack} />
      
      <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="p-8 flex flex-col items-center border-b border-gray-100">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-4 text-white shadow-xl shadow-blue-200">
                   {/* Train Logo */}
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
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
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Station Easy</h2>
              <p className="text-gray-400 font-medium">Your Smart Travel Companion</p>
          </div>

          <div className="p-6 space-y-4">
              <div className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                 <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-4">
                     <Info size={20} />
                 </div>
                 <span className="font-semibold text-gray-700 flex-1">Version: 2.1.0</span>
                 <ChevronRight className="text-gray-300" />
              </div>

              <div className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                 <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-4">
                     <FileText size={20} />
                 </div>
                 <span className="font-semibold text-gray-700 flex-1">Terms of Service</span>
                 <ChevronRight className="text-gray-300" />
              </div>

              <div className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                 <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-4">
                     <Lock size={20} />
                 </div>
                 <span className="font-semibold text-gray-700 flex-1">Privacy Policy</span>
                 <ChevronRight className="text-gray-300" />
              </div>

              <div className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                 <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-4">
                     <HelpCircle size={20} />
                 </div>
                 <span className="font-semibold text-gray-700 flex-1">FAQS & Help Center</span>
                 <ChevronRight className="text-gray-300" />
              </div>
          </div>

          <div className="p-8 text-center">
              <p className="text-blue-500 text-sm font-medium">Powered by Indian Railways</p>
          </div>
      </div>
    </div>
  );
};

export default About;