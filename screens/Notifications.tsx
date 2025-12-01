import React from 'react';
import Header from '../components/Header';
import { Bell, Clock, AlertTriangle, Train, Info } from 'lucide-react';
import { Translation } from '../types';

interface NotificationsProps {
  onBack: () => void;
  t: Translation;
}

const Notifications: React.FC<NotificationsProps> = ({ onBack, t }) => {
  const notifications = [
    {
      id: 1,
      title: t.notifTrainDelayed,
      message: t.notifTrainDelayedMsg,
      time: "2 min ago",
      type: 'alert',
      icon: Clock,
      color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    },
    {
      id: 2,
      title: t.notifPlatformChange,
      message: t.notifPlatformChangeMsg,
      time: "10 min ago",
      type: 'info',
      icon: Train,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
      id: 3,
      title: t.notifWelcome,
      message: t.notifWelcomeMsg,
      time: "1 hour ago",
      type: 'promo',
      icon: Info,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header title={t.notificationsTitle} showBack onBack={onBack} showMenu={false} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          <div className="flex justify-between items-center px-2 animate-fade-in-up">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{t.today}</span>
              <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{t.markAllRead}</button>
          </div>

          {notifications.map((notif, i) => (
              <div 
                key={notif.id} 
                className="stagger-item bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4"
                style={{animationDelay: `${i * 100}ms`}}
              >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.color}`}>
                      <notif.icon size={24} />
                  </div>
                  <div className="flex-1">
                      <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-900 dark:text-white">{notif.title}</h4>
                          <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-snug">{notif.message}</p>
                  </div>
              </div>
          ))}

          <div className="flex justify-between items-center px-2 mt-6 animate-fade-in-up delay-300">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{t.yesterday}</span>
          </div>
          
          <div className="stagger-item bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 opacity-70 delay-400">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-2xl flex items-center justify-center shrink-0">
                  <Bell size={24} />
              </div>
              <div className="flex-1">
                   <h4 className="font-bold text-gray-900 dark:text-white">{t.notifTicketConfirmed}</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.notifTicketConfirmedMsg}</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Notifications;