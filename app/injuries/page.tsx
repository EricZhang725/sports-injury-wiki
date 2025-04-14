'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { injuries, categories } from '../data/injuries';
import InjuryCard from '../components/InjuryCard';

export default function InjuriesPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedInjuries, setExpandedInjuries] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const currentLang = language === 'zh-CN' || language === 'zh-TW' ? 'zh' : 'en';
  
  const toggleInjuryExpansion = (injuryId: string) => {
    setExpandedInjuries(prev => ({
      ...prev,
      [injuryId]: !prev[injuryId]
    }));
  };

  const categoryOptions = categories.map(cat => cat.id);

  // Filter injuries by category and search term
  const filteredInjuries = injuries
    .filter(injury => !selectedCategory || injury.category === selectedCategory)
    .filter(injury => {
      if (!searchTerm.trim()) return true;
      const search = searchTerm.toLowerCase();
      
      // Search in title
      const title = t(injury.titleKey).toLowerCase();
      if (title.includes(search)) return true;
      
      // Search in symptoms
      const hasMatchingSymptom = injury.symptoms[currentLang].some(
        symptom => symptom.toLowerCase().includes(search)
      );
      if (hasMatchingSymptom) return true;
      
      // Search in treatments
      const hasMatchingTreatment = injury.acuteTreatment[currentLang].some(
        treatment => treatment.toLowerCase().includes(search)
      );
      if (hasMatchingTreatment) return true;
      
      // Search in prevention
      const hasMatchingPrevention = injury.prevention[currentLang].some(
        prevention => prevention.toLowerCase().includes(search)
      );
      
      return hasMatchingPrevention;
    });

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="section-title text-gray-800">{t('injuries_title')}</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Learn about common sports injuries, their symptoms, causes, and treatments'
              : language === 'zh-CN'
              ? '了解常见的运动损伤、症状、原因和治疗方法'
              : '了解常見的運動損傷、症狀、原因和治療方法'}
          </p>
        </div>
        
        {/* Search input */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search_injuries')}
              className="input-field pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Category filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              className={`btn ${selectedCategory === null ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setSelectedCategory(null)}
            >
              {t('all')}
            </button>
            {categoryOptions.map(category => (
              <button
                key={category}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {t(`${category}_category`)}
              </button>
            ))}
          </div>
        </div>

        {/* Search results stats */}
        {searchTerm && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              {t('search_results_count').replace('{count}', filteredInjuries.length.toString())}
            </p>
          </div>
        )}

        {/* Display injuries */}
        {filteredInjuries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm max-w-md mx-auto">
            <div className="text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">{t('no_injuries_found')}</p>
            <button 
              className="mt-4 btn btn-outline" 
              onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
            >
              {t('clear_filters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInjuries.map(injury => (
              <div key={injury.id}>
                <InjuryCard
                  id={injury.id}
                  titleKey={injury.titleKey}
                  imagePath={injury.imagePath}
                  category={injury.category}
                  expanded={expandedInjuries[injury.id]}
                  onClick={() => toggleInjuryExpansion(injury.id)}
                />
                
                {expandedInjuries[injury.id] && (
                  <div className="mt-4 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="font-medium text-lg mb-3 text-gray-800 flex items-center">
                      <span className="w-1 h-6 bg-primary-500 rounded-full inline-block mr-2"></span>
                      {t('symptoms')}
                    </h3>
                    <ul className="list-disc pl-5 mb-5 space-y-1 text-gray-600">
                      {injury.symptoms[currentLang].map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>

                    <h3 className="font-medium text-lg mb-3 text-gray-800 flex items-center">
                      <span className="w-1 h-6 bg-accent-500 rounded-full inline-block mr-2"></span>
                      {t('acute_treatment')}
                    </h3>
                    <ul className="list-disc pl-5 mb-5 space-y-1 text-gray-600">
                      {injury.acuteTreatment[currentLang].map((treatment, index) => (
                        <li key={index}>{treatment}</li>
                      ))}
                    </ul>

                    <h3 className="font-medium text-lg mb-3 text-gray-800 flex items-center">
                      <span className="w-1 h-6 bg-secondary-500 rounded-full inline-block mr-2"></span>
                      {t('prevention')}
                    </h3>
                    <ul className="list-disc pl-5 mb-5 space-y-1 text-gray-600">
                      {injury.prevention[currentLang].map((prevention, index) => (
                        <li key={index}>{prevention}</li>
                      ))}
                    </ul>

                    {injury.references && injury.references[currentLang] && injury.references[currentLang].length > 0 && (
                      <>
                        <h3 className="font-medium text-lg mb-3 text-gray-800 flex items-center">
                          <span className="w-1 h-6 bg-gray-500 rounded-full inline-block mr-2"></span>
                          {t('references')}
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                          {injury.references[currentLang].map((reference, index) => (
                            <li key={index}>
                              {reference}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    <div className="mt-6 text-center">
                      <button 
                        onClick={() => toggleInjuryExpansion(injury.id)}
                        className="btn btn-outline btn-sm"
                      >
                        {t('collapse')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}