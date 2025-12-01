

import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { Send, Bot, User, Mic } from 'lucide-react';
import { Translation } from '../types';

interface ChatAssistantProps {
  onBack: () => void;
  t: Translation;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ onBack, t }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: t.chatGreeting, sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response with Localization
    setTimeout(() => {
      let botResponse = t.chatDefaultResponse;
      
      const lowerInput = userMsg.text.toLowerCase();
      
      // Multilingual Keywords
      const trainKeywords = ['train', 'schedule', 'ട്രെയിൻ', 'ट्रेन', 'ரயில்', 'തീവണ്ടി'];
      const foodKeywords = ['food', 'cafe', 'snack', 'ഭക്ഷണം', 'खाना', 'உணவு', 'bhojan', 'saapadu'];
      const restroomKeywords = ['toilet', 'restroom', 'washroom', 'വിശ്രമമുറി', 'शौचालय', 'கழிவறை', 'bathroom'];

      if (trainKeywords.some(k => lowerInput.includes(k))) {
          botResponse = t.chatTrainResponse;
      } else if (foodKeywords.some(k => lowerInput.includes(k))) {
          botResponse = t.chatFoodResponse;
      } else if (restroomKeywords.some(k => lowerInput.includes(k))) {
          botResponse = t.chatRestroomResponse;
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title="Station Assistant" showBack onBack={onBack} showMenu={false} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-green-500 text-white'}`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-1 opacity-70 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm ml-10">
                <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
            <button className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Mic size={20} />
            </button>
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chatPlaceholder}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
            />
            <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Send size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
