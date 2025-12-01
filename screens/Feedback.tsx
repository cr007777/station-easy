import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import { Camera, Send, Check, X, Image as ImageIcon } from 'lucide-react';
import { Translation } from '../types';

interface FeedbackProps {
  onBack: () => void;
  t: Translation;
}

const Feedback: React.FC<FeedbackProps> = ({ onBack, t }) => {
  const [selectedTagKey, setSelectedTagKey] = useState('tagBug');
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Define tags with keys to look up in translation object
  const tags = [
    { key: 'tagBug', label: t.tagBug },
    { key: 'tagFeature', label: t.tagFeature },
    { key: 'tagNav', label: t.tagNav },
    { key: 'tagAmenity', label: t.tagAmenity },
    { key: 'tagGeneral', label: t.tagGeneral },
    { key: 'tagOther', label: t.tagOther },
  ];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
        onBack();
    }, 2000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  if (submitted) {
      return (
          <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-8 transition-colors duration-300">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <Check size={48} strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.feedbackSuccess}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">{t.feedbackSuccessMsg}</p>
          </div>
      )
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <Header title={t.feedbackTitle} showBack onBack={onBack} />
      
      <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
        <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-4 px-1">{t.feedbackIssue}</h3>
        
        {/* Tags Selection */}
        <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
                <button 
                    key={tag.key} 
                    onClick={() => setSelectedTagKey(tag.key)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        selectedTagKey === tag.key 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 transform scale-105' 
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                    {tag.label}
                </button>
            ))}
        </div>

        <div className="space-y-5">
            {/* Subject Input */}
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">{t.feedbackSubject}</label>
                <input 
                    type="text" 
                    placeholder={t.feedbackSubjectPlaceholder}
                    className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                />
            </div>
            
            {/* Description Textarea */}
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">{t.feedbackDesc}</label>
                <textarea 
                    placeholder={t.feedbackDescPlaceholder}
                    className="w-full p-4 h-40 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm resize-none"
                ></textarea>
            </div>

            {/* Attachment Button */}
            <div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    className="hidden" 
                    accept="image/*,video/*"
                />
                
                {!selectedFile ? (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex justify-between items-center transition-colors">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">{t.feedbackPhoto}</span>
                        <button 
                            onClick={triggerFileSelect}
                            className="text-blue-600 dark:text-blue-400 p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors active:scale-95"
                        >
                            <Camera size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm flex justify-between items-center transition-colors">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                <ImageIcon size={20} />
                            </div>
                            <span className="text-blue-900 dark:text-blue-100 font-medium truncate text-sm">
                                {selectedFile.name}
                            </span>
                        </div>
                        <button 
                            onClick={clearFile}
                            className="text-gray-500 hover:text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Email Input */}
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">{t.feedbackContact}</label>
                <input 
                    type="email" 
                    placeholder={t.feedbackEmailPlaceholder}
                    defaultValue="rohan.singh@example.com"
                    className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                />
            </div>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
              <span>{t.submitFeedback}</span>
              <Send size={18} />
          </button>
      </div>
    </div>
  );
};

export default Feedback;