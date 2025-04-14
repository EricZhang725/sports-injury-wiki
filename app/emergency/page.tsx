'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Link from 'next/link';

// 定义紧急处理程序数据
interface EmergencyProcedure {
  id: string;
  name: string;
  description: string;
  steps: string[];
}

// 定义支持的语言
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' }
];

// 定义翻译内容
const translations = {
  'emergency_title': {
    'en': 'Emergency Procedures',
    'zh-CN': '紧急处理程序',
    'zh-TW': '緊急處理程序'
  },
  'emergency_subtitle': {
    'en': 'Learn how to respond to common sports injuries in emergency situations',
    'zh-CN': '了解如何在紧急情况下应对常见的运动伤害',
    'zh-TW': '了解如何在緊急情況下應對常見的運動傷害'
  },
  'steps': {
    'en': 'Steps',
    'zh-CN': '步骤',
    'zh-TW': '步驟'
  }
};

// 紧急处理程序数据
const emergencyProceduresData: { [key: string]: EmergencyProcedure[] } = {
  'en': [
    {
      id: '1',
      name: 'Sprained Ankle',
      description: 'Immediate actions to take when a sprained ankle occurs',
      steps: [
        'Stop activity immediately',
        'Apply RICE protocol (Rest, Ice, Compression, Elevation)',
        'Avoid putting weight on the injured ankle',
        'Seek medical attention if severe pain or inability to bear weight persists'
      ]
    },
    {
      id: '2',
      name: 'Muscle Strain',
      description: 'How to handle acute muscle strains during sports',
      steps: [
        'Stop the activity immediately',
        'Apply ice to the affected area',
        'Use compression bandage to reduce swelling',
        'Elevate the injured area if possible',
        'Avoid stretching or stressing the muscle further'
      ]
    },
    {
      id: '3',
      name: 'Concussion',
      description: 'Recognition and immediate response to potential concussions',
      steps: [
        'Remove the athlete from play immediately',
        'Check for signs of concussion (confusion, headache, dizziness)',
        'Monitor for any worsening symptoms',
        'Seek immediate medical attention',
        'Do not allow return to play until cleared by a medical professional'
      ]
    }
  ],
  'zh-CN': [
    {
      id: '1',
      name: '踝关节扭伤',
      description: '踝关节扭伤时应立即采取的措施',
      steps: [
        '立即停止活动',
        '应用RICE原则（休息、冰敷、压迫、抬高）',
        '避免将重量放在受伤的踝关节上',
        '如果严重疼痛或无法承受体重持续存在，请寻求医疗帮助'
      ]
    },
    {
      id: '2',
      name: '肌肉拉伤',
      description: '如何处理运动中的急性肌肉拉伤',
      steps: [
        '立即停止活动',
        '对受影响区域使用冰敷',
        '使用压缩绷带减少肿胀',
        '尽可能抬高受伤区域',
        '避免进一步拉伸或施加压力'
      ]
    },
    {
      id: '3',
      name: '脑震荡',
      description: '识别和立即应对潜在的脑震荡',
      steps: [
        '立即让运动员停止比赛',
        '检查脑震荡迹象（混乱、头痛、头晕）',
        '监测症状是否恶化',
        '立即寻求医疗帮助',
        '在未经医疗专业人员许可前，不要让其返回比赛'
      ]
    }
  ],
  'zh-TW': [
    {
      id: '1',
      name: '踝關節扭傷',
      description: '踝關節扭傷時應立即採取的措施',
      steps: [
        '立即停止活動',
        '應用RICE原則（休息、冰敷、壓迫、抬高）',
        '避免將重量放在受傷的踝關節上',
        '如果嚴重疼痛或無法承受體重持續存在，請尋求醫療幫助'
      ]
    },
    {
      id: '2',
      name: '肌肉拉傷',
      description: '如何處理運動中的急性肌肉拉傷',
      steps: [
        '立即停止活動',
        '對受影響區域使用冰敷',
        '使用壓縮繃帶減少腫脹',
        '盡可能抬高受傷區域',
        '避免進一步拉伸或施加壓力'
      ]
    },
    {
      id: '3',
      name: '腦震盪',
      description: '識別和立即應對潛在的腦震盪',
      steps: [
        '立即讓運動員停止比賽',
        '檢查腦震盪跡象（混亂、頭痛、頭暈）',
        '監測症狀是否惡化',
        '立即尋求醫療幫助',
        '在未經醫療專業人員許可前，不要讓其返回比賽'
      ]
    }
  ]
};

export default function Emergency() {
  // 获取当前语言，默认简体中文
  const [language, setLanguage] = useState('zh-CN');
  const [renderKey, setRenderKey] = useState(0);
  
  // 加载保存的语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'zh-CN', 'zh-TW'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // 当语言变化时强制重新渲染
  useEffect(() => {
    setRenderKey(prevKey => prevKey + 1);
  }, [language]);
  
  // 翻译函数
  const t = (key: string) => {
    return translations[key as keyof typeof translations]?.[language as keyof typeof translations[keyof typeof translations]] || key;
  };
  
  // 获取当前语言的紧急处理程序
  const emergencyProcedures = emergencyProceduresData[language] || emergencyProceduresData['zh-CN'];

  return (
    <div key={renderKey} className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t('emergency_title')}</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {t('emergency_subtitle')}
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {emergencyProcedures.map((procedure) => (
              <div key={procedure.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{procedure.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{procedure.description}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('steps')}:</h4>
                    <ul className="mt-2 ml-5 list-disc text-sm text-gray-600 space-y-1">
                      {procedure.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 