'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

interface InjuryCardProps {
  id: string;
  titleKey: string;
  imagePath?: string;
  category: string;
  expanded?: boolean;
  onClick?: () => void;
  showDetails?: boolean;
}

const InjuryCard = ({ 
  id, 
  titleKey, 
  imagePath, 
  category, 
  expanded = false, 
  onClick,
  showDetails = true
}: InjuryCardProps) => {
  const { t, language } = useLanguage();
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={`card bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 ${expanded ? 'ring-2 ring-primary-500' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        {!imageError && imagePath ? (
          <div className="relative w-full h-48">
            <Image
              src={imagePath}
              alt={t(titleKey) || id}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 flex flex-col items-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
              </svg>
              <span className="text-sm text-center">{t('image_not_available')}</span>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="badge badge-secondary text-xs font-medium py-1 px-2">
            {t(`${category}_category`) || category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {t(titleKey) || id}
        </h3>
        
        {showDetails && (
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t('click_for_details')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InjuryCard; 