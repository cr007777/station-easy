
import React from 'react';
import { Share2, ShoppingCart, User, Star, Coffee, Accessibility, CreditCard, Armchair, Info, Heart } from 'lucide-react';
import Header from '../components/Header';
import { AMENITIES } from '../constants';
import { AmenityType, Translation, Amenity } from '../types';

interface FacilityDetailProps {
  id: string;
  onBack: () => void;
  onNavigate: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  t: Translation;
}

const FacilityDetail: React.FC<FacilityDetailProps> = ({ id, onBack, onNavigate, isFavorite, onToggleFavorite, t }) => {
  const facility = AMENITIES.find(a => a.id === id) || AMENITIES[1];

  // Map AmenityType to Translation Key
  const getTranslatedType = (type: AmenityType) => {
      switch (type) {
          case AmenityType.FOOD: return t.catFoodStalls;
          case AmenityType.RESTROOM: return t.catRestroom;
          case AmenityType.ATM: return t.catATM;
          case AmenityType.SHOP: return t.catShop;
          case AmenityType.WAITING: return t.catWaiting;
          case AmenityType.TICKET: return t.catTicket;
          case AmenityType.INFO: return t.catInfo;
          default: return type;
      }
  };

  const getAmenityName = (amenity: Amenity) => {
      return (amenity.translationKey && t[amenity.translationKey]) ? t[amenity.translationKey] : amenity.name;
  };

  const getIcon = (type: AmenityType) => {
      switch (type) {
          case AmenityType.FOOD: return <Coffee size={32} />;
          case AmenityType.RESTROOM: return <Accessibility size={32} />;
          case AmenityType.ATM: return <CreditCard size={32} />;
          case AmenityType.SHOP: return <ShoppingCart size={32} />;
          case AmenityType.WAITING: return <Armchair size={32} />;
          case AmenityType.TICKET: return <CreditCard size={32} />;
          case AmenityType.INFO: return <Info size={32} />;
          default: return <ShoppingCart size={32} />;
      }
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col no-scrollbar overflow-y-auto transition-colors duration-300">
      <Header title={t.facilityDetailTitle} showBack onBack={onBack} />
      
      {/* Hero Card */}
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6 transition-colors">
           <div className="flex items-start gap-4 mb-2">
               <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                   {getIcon(facility.type)}
               </div>
               <div>
                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">{getTranslatedType(facility.type)}</h2>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                       {facility.status === 'Open Now' ? <span className="text-green-600 dark:text-green-400 font-medium">{t.openNow}</span> : <span className="text-red-500">{t.closed}</span>} 
                       <span className="mx-1">•</span> 
                       {facility.distance} {t.away}
                   </p>
               </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-1">{getAmenityName(facility)}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                {facility.description}
            </p>

            {/* Ratings */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900 dark:text-white">{t.ratingsReviews} ({facility.reviews / 1000}K)</span>
                    <div className="flex text-blue-500">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= Math.round(facility.rating) ? "currentColor" : "none"} />)}
                    </div>
                </div>
            </div>

            {/* Review Snippet */}
            <div className="flex gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-8">
                <div className="w-10 h-10 bg-blue-200 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-200 shrink-0">
                    <User size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">Rohan S.</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Great selection and friendly staff!</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button 
                    onClick={onNavigate}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors"
                >
                    {t.navigateButton}
                </button>
                <button 
                    onClick={onToggleFavorite}
                    className={`w-14 h-14 border rounded-xl flex items-center justify-center transition-colors ${isFavorite ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800' : 'border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                >
                    <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button className="w-14 h-14 border border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400 rounded-xl flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <Share2 size={24} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetail;
