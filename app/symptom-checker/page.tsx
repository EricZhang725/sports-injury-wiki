'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Link from 'next/link';

// 定义支持的语言
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' }
];

// 定义翻译内容
const translations = {
  'symptom_checker': {
    'en': 'Symptom Checker',
    'zh-CN': '症状检查器',
    'zh-TW': '症狀檢查器'
  },
  'symptom_checker_desc': {
    'en': 'Select the symptoms you are experiencing to find potential sports injuries',
    'zh-CN': '选择您正在经历的症状，找出潜在的运动损伤',
    'zh-TW': '選擇您正在經歷的症狀，找出潛在的運動損傷'
  },
  'select_symptoms': {
    'en': 'Select Your Symptoms',
    'zh-CN': '选择您的症状',
    'zh-TW': '選擇您的症狀'
  },
  'check_results': {
    'en': 'Check Results',
    'zh-CN': '查看结果',
    'zh-TW': '查看結果'
  },
  'reset': {
    'en': 'Reset',
    'zh-CN': '重置',
    'zh-TW': '重置'
  },
  'no_symptoms_selected': {
    'en': 'Please select at least one symptom',
    'zh-CN': '请至少选择一个症状',
    'zh-TW': '請至少選擇一個症狀'
  },
  'potential_injuries': {
    'en': 'Potential Injuries',
    'zh-CN': '潜在损伤',
    'zh-TW': '潛在損傷'
  },
  'match_percentage': {
    'en': 'Match',
    'zh-CN': '匹配度',
    'zh-TW': '匹配度'
  },
  'view_details': {
    'en': 'View Details',
    'zh-CN': '查看详情',
    'zh-TW': '查看詳情'
  },
  'disclaimer': {
    'en': 'Disclaimer: This tool is for informational purposes only and should not replace professional medical advice. If you are experiencing severe pain or symptoms, please consult a healthcare professional immediately.',
    'zh-CN': '免责声明：此工具仅供参考，不能替代专业医疗建议。如果您正在经历严重疼痛或症状，请立即咨询医疗专业人员。',
    'zh-TW': '免責聲明：此工具僅供參考，不能替代專業醫療建議。如果您正在經歷嚴重疼痛或症狀，請立即諮詢醫療專業人員。'
  },
  'no_matching_injuries': {
    'en': 'No matching injuries found for the selected symptoms',
    'zh-CN': '没有找到与所选症状匹配的损伤',
    'zh-TW': '沒有找到與所選症狀匹配的損傷'
  },
  'select_body_region': {
    'en': 'Select a body region to filter symptoms',
    'zh-CN': '选择身体区域以筛选症状',
    'zh-TW': '選擇身體區域以篩選症狀'
  },
  'all_regions': {
    'en': 'All Regions',
    'zh-CN': '所有区域',
    'zh-TW': '所有區域'
  },
  'head': {
    'en': 'Head',
    'zh-CN': '头部',
    'zh-TW': '頭部'
  },
  'neck': {
    'en': 'Neck',
    'zh-CN': '颈部',
    'zh-TW': '頸部'
  },
  'shoulder': {
    'en': 'Shoulder',
    'zh-CN': '肩部',
    'zh-TW': '肩部'
  },
  'arm': {
    'en': 'Arm',
    'zh-CN': '手臂',
    'zh-TW': '手臂'
  },
  'elbow': {
    'en': 'Elbow',
    'zh-CN': '肘部',
    'zh-TW': '肘部'
  },
  'wrist_hand': {
    'en': 'Wrist & Hand',
    'zh-CN': '手腕和手',
    'zh-TW': '手腕和手'
  },
  'back': {
    'en': 'Back',
    'zh-CN': '背部',
    'zh-TW': '背部'
  },
  'hip': {
    'en': 'Hip',
    'zh-CN': '髋部',
    'zh-TW': '髖部'
  },
  'knee': {
    'en': 'Knee',
    'zh-CN': '膝盖',
    'zh-TW': '膝蓋'
  },
  'ankle_foot': {
    'en': 'Ankle & Foot',
    'zh-CN': '脚踝和脚',
    'zh-TW': '腳踝和腳'
  }
};

// 症状数据
const symptomData = {
  'en': [
    { id: 1, name: 'Pain', bodyRegions: ['all'] },
    { id: 2, name: 'Swelling', bodyRegions: ['all'] },
    { id: 3, name: 'Bruising', bodyRegions: ['all'] },
    { id: 4, name: 'Limited Range of Motion', bodyRegions: ['all'] },
    { id: 5, name: 'Stiffness', bodyRegions: ['all'] },
    { id: 6, name: 'Weakness', bodyRegions: ['all'] },
    { id: 7, name: 'Headache', bodyRegions: ['head'] },
    { id: 8, name: 'Dizziness', bodyRegions: ['head'] },
    { id: 9, name: 'Confusion', bodyRegions: ['head'] },
    { id: 10, name: 'Nausea', bodyRegions: ['head'] },
    { id: 11, name: 'Visual Disturbances', bodyRegions: ['head'] },
    { id: 12, name: 'Neck Pain', bodyRegions: ['neck'] },
    { id: 13, name: 'Inability to Turn Head', bodyRegions: ['neck'] },
    { id: 14, name: 'Shoulder Pain', bodyRegions: ['shoulder'] },
    { id: 15, name: 'Shoulder Instability', bodyRegions: ['shoulder'] },
    { id: 16, name: 'Popping Sound', bodyRegions: ['shoulder', 'knee'] },
    { id: 17, name: 'Arm Pain', bodyRegions: ['arm'] },
    { id: 18, name: 'Elbow Pain', bodyRegions: ['elbow'] },
    { id: 19, name: 'Wrist Pain', bodyRegions: ['wrist_hand'] },
    { id: 20, name: 'Hand Pain', bodyRegions: ['wrist_hand'] },
    { id: 21, name: 'Finger Pain', bodyRegions: ['wrist_hand'] },
    { id: 22, name: 'Back Pain', bodyRegions: ['back'] },
    { id: 23, name: 'Spine Tenderness', bodyRegions: ['back'] },
    { id: 24, name: 'Hip Pain', bodyRegions: ['hip'] },
    { id: 25, name: 'Groin Pain', bodyRegions: ['hip'] },
    { id: 26, name: 'Knee Pain', bodyRegions: ['knee'] },
    { id: 27, name: 'Knee Instability', bodyRegions: ['knee'] },
    { id: 28, name: 'Ankle Pain', bodyRegions: ['ankle_foot'] },
    { id: 29, name: 'Foot Pain', bodyRegions: ['ankle_foot'] },
    { id: 30, name: 'Numbness or Tingling', bodyRegions: ['all'] }
  ],
  'zh-CN': [
    { id: 1, name: '疼痛', bodyRegions: ['all'] },
    { id: 2, name: '肿胀', bodyRegions: ['all'] },
    { id: 3, name: '淤青', bodyRegions: ['all'] },
    { id: 4, name: '活动范围受限', bodyRegions: ['all'] },
    { id: 5, name: '僵硬', bodyRegions: ['all'] },
    { id: 6, name: '无力', bodyRegions: ['all'] },
    { id: 7, name: '头痛', bodyRegions: ['head'] },
    { id: 8, name: '头晕', bodyRegions: ['head'] },
    { id: 9, name: '意识模糊', bodyRegions: ['head'] },
    { id: 10, name: '恶心', bodyRegions: ['head'] },
    { id: 11, name: '视觉障碍', bodyRegions: ['head'] },
    { id: 12, name: '颈部疼痛', bodyRegions: ['neck'] },
    { id: 13, name: '无法转动头部', bodyRegions: ['neck'] },
    { id: 14, name: '肩部疼痛', bodyRegions: ['shoulder'] },
    { id: 15, name: '肩部不稳定', bodyRegions: ['shoulder'] },
    { id: 16, name: '弹响声', bodyRegions: ['shoulder', 'knee'] },
    { id: 17, name: '手臂疼痛', bodyRegions: ['arm'] },
    { id: 18, name: '肘部疼痛', bodyRegions: ['elbow'] },
    { id: 19, name: '手腕疼痛', bodyRegions: ['wrist_hand'] },
    { id: 20, name: '手部疼痛', bodyRegions: ['wrist_hand'] },
    { id: 21, name: '手指疼痛', bodyRegions: ['wrist_hand'] },
    { id: 22, name: '背部疼痛', bodyRegions: ['back'] },
    { id: 23, name: '脊柱压痛', bodyRegions: ['back'] },
    { id: 24, name: '髋部疼痛', bodyRegions: ['hip'] },
    { id: 25, name: '腹股沟疼痛', bodyRegions: ['hip'] },
    { id: 26, name: '膝盖疼痛', bodyRegions: ['knee'] },
    { id: 27, name: '膝盖不稳定', bodyRegions: ['knee'] },
    { id: 28, name: '脚踝疼痛', bodyRegions: ['ankle_foot'] },
    { id: 29, name: '脚部疼痛', bodyRegions: ['ankle_foot'] },
    { id: 30, name: '麻木或刺痛', bodyRegions: ['all'] }
  ],
  'zh-TW': [
    { id: 1, name: '疼痛', bodyRegions: ['all'] },
    { id: 2, name: '腫脹', bodyRegions: ['all'] },
    { id: 3, name: '瘀青', bodyRegions: ['all'] },
    { id: 4, name: '活動範圍受限', bodyRegions: ['all'] },
    { id: 5, name: '僵硬', bodyRegions: ['all'] },
    { id: 6, name: '無力', bodyRegions: ['all'] },
    { id: 7, name: '頭痛', bodyRegions: ['head'] },
    { id: 8, name: '頭暈', bodyRegions: ['head'] },
    { id: 9, name: '意識模糊', bodyRegions: ['head'] },
    { id: 10, name: '噁心', bodyRegions: ['head'] },
    { id: 11, name: '視覺障礙', bodyRegions: ['head'] },
    { id: 12, name: '頸部疼痛', bodyRegions: ['neck'] },
    { id: 13, name: '無法轉動頭部', bodyRegions: ['neck'] },
    { id: 14, name: '肩部疼痛', bodyRegions: ['shoulder'] },
    { id: 15, name: '肩部不穩定', bodyRegions: ['shoulder'] },
    { id: 16, name: '彈響聲', bodyRegions: ['shoulder', 'knee'] },
    { id: 17, name: '手臂疼痛', bodyRegions: ['arm'] },
    { id: 18, name: '肘部疼痛', bodyRegions: ['elbow'] },
    { id: 19, name: '手腕疼痛', bodyRegions: ['wrist_hand'] },
    { id: 20, name: '手部疼痛', bodyRegions: ['wrist_hand'] },
    { id: 21, name: '手指疼痛', bodyRegions: ['wrist_hand'] },
    { id: 22, name: '背部疼痛', bodyRegions: ['back'] },
    { id: 23, name: '脊柱壓痛', bodyRegions: ['back'] },
    { id: 24, name: '髖部疼痛', bodyRegions: ['hip'] },
    { id: 25, name: '腹股溝疼痛', bodyRegions: ['hip'] },
    { id: 26, name: '膝蓋疼痛', bodyRegions: ['knee'] },
    { id: 27, name: '膝蓋不穩定', bodyRegions: ['knee'] },
    { id: 28, name: '腳踝疼痛', bodyRegions: ['ankle_foot'] },
    { id: 29, name: '腳部疼痛', bodyRegions: ['ankle_foot'] },
    { id: 30, name: '麻木或刺痛', bodyRegions: ['all'] }
  ]
};

// 伤病症状关联数据
const injurySymptomMapping = {
  'en': {
    'muscle-strain': [1, 2, 3, 4, 5, 6],
    'ligament-sprain': [1, 2, 3, 4, 16, 27],
    'tendonitis': [1, 2, 5, 6],
    'fracture': [1, 2, 3, 4, 6],
    'dislocation': [1, 2, 3, 4, 6, 15, 16, 27],
    'concussion': [7, 8, 9, 10, 11]
  },
  'zh-CN': {
    'muscle-strain': [1, 2, 3, 4, 5, 6],
    'ligament-sprain': [1, 2, 3, 4, 16, 27],
    'tendonitis': [1, 2, 5, 6],
    'fracture': [1, 2, 3, 4, 6],
    'dislocation': [1, 2, 3, 4, 6, 15, 16, 27],
    'concussion': [7, 8, 9, 10, 11]
  },
  'zh-TW': {
    'muscle-strain': [1, 2, 3, 4, 5, 6],
    'ligament-sprain': [1, 2, 3, 4, 16, 27],
    'tendonitis': [1, 2, 5, 6],
    'fracture': [1, 2, 3, 4, 6],
    'dislocation': [1, 2, 3, 4, 6, 15, 16, 27],
    'concussion': [7, 8, 9, 10, 11]
  }
};

// 伤病数据
const injuryData = {
  'en': {
    'muscle-strain': { 
      title: 'Muscle Strain', 
      description: 'Injury caused by overstretching or tearing of muscle fibers',
      icon: '💪',
      color: 'bg-red-100 text-red-800'
    },
    'ligament-sprain': { 
      title: 'Ligament Sprain', 
      description: 'Injury caused by overstretching or tearing of joint ligaments',
      icon: '🦵',
      color: 'bg-yellow-100 text-yellow-800'
    },
    'tendonitis': { 
      title: 'Tendonitis', 
      description: 'Inflammation of the tendon causing pain and dysfunction',
      icon: '🦶',
      color: 'bg-green-100 text-green-800'
    },
    'fracture': { 
      title: 'Fracture', 
      description: 'Injury where bone integrity is compromised',
      icon: '🦴',
      color: 'bg-blue-100 text-blue-800'
    },
    'dislocation': { 
      title: 'Joint Dislocation', 
      description: 'Injury where joint surfaces lose normal contact relationship',
      icon: '🦾',
      color: 'bg-purple-100 text-purple-800'
    },
    'concussion': { 
      title: 'Concussion', 
      description: 'Temporary brain dysfunction caused by head injury',
      icon: '🧠',
      color: 'bg-indigo-100 text-indigo-800'
    }
  },
  'zh-CN': {
    'muscle-strain': { 
      title: '肌肉拉伤', 
      description: '肌肉纤维过度拉伸或撕裂导致的损伤',
      icon: '💪',
      color: 'bg-red-100 text-red-800'
    },
    'ligament-sprain': { 
      title: '韧带扭伤', 
      description: '关节韧带过度拉伸或撕裂导致的损伤',
      icon: '🦵',
      color: 'bg-yellow-100 text-yellow-800'
    },
    'tendonitis': { 
      title: '肌腱炎', 
      description: '肌腱发炎导致的疼痛和功能障碍',
      icon: '🦶',
      color: 'bg-green-100 text-green-800'
    },
    'fracture': { 
      title: '骨折', 
      description: '骨骼完整性受到破坏的损伤',
      icon: '🦴',
      color: 'bg-blue-100 text-blue-800'
    },
    'dislocation': { 
      title: '关节脱位', 
      description: '关节面失去正常对合关系的损伤',
      icon: '🦾',
      color: 'bg-purple-100 text-purple-800'
    },
    'concussion': { 
      title: '脑震荡', 
      description: '头部受到撞击导致的暂时性脑功能障碍',
      icon: '🧠',
      color: 'bg-indigo-100 text-indigo-800'
    }
  },
  'zh-TW': {
    'muscle-strain': { 
      title: '肌肉拉傷', 
      description: '肌肉纖維過度拉伸或撕裂導致的損傷',
      icon: '💪',
      color: 'bg-red-100 text-red-800'
    },
    'ligament-sprain': { 
      title: '韌帶扭傷', 
      description: '關節韌帶過度拉伸或撕裂導致的損傷',
      icon: '🦵',
      color: 'bg-yellow-100 text-yellow-800'
    },
    'tendonitis': { 
      title: '肌腱炎', 
      description: '肌腱發炎導致的疼痛和功能障礙',
      icon: '🦶',
      color: 'bg-green-100 text-green-800'
    },
    'fracture': { 
      title: '骨折', 
      description: '骨骼完整性受到破壞的損傷',
      icon: '🦴',
      color: 'bg-blue-100 text-blue-800'
    },
    'dislocation': { 
      title: '關節脫位', 
      description: '關節面失去正常對合關係的損傷',
      icon: '🦾',
      color: 'bg-purple-100 text-purple-800'
    },
    'concussion': { 
      title: '腦震盪', 
      description: '頭部受到撞擊導致的暫時性腦功能障礙',
      icon: '🧠',
      color: 'bg-indigo-100 text-indigo-800'
    }
  }
};

// 身体区域
const bodyRegions = [
  'all', 'head', 'neck', 'shoulder', 'arm', 'elbow', 
  'wrist_hand', 'back', 'hip', 'knee', 'ankle_foot'
];

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([]);
  const [results, setResults] = useState<{id: string, percentage: number}[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  // 获取当前语言，默认简体中文
  const [language, setLanguage] = useState('zh-CN');
  
  // 加载保存的语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'zh-CN', 'zh-TW'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // 翻译函数
  const t = (key: string) => {
    return translations[key as keyof typeof translations]?.[language as keyof typeof translations[keyof typeof translations]] || key;
  };
  
  // 获取当前语言的症状列表
  const symptoms = symptomData[language as keyof typeof symptomData] || symptomData['zh-CN'];
  
  // 筛选显示的症状
  const filteredSymptoms = symptoms.filter(symptom => 
    selectedRegion === 'all' || symptom.bodyRegions.includes(selectedRegion)
  );

  // 切换症状选择
  const toggleSymptom = (id: number) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };
  
  // 重置所有
  const resetAll = () => {
    setSelectedSymptoms([]);
    setResults([]);
    setShowResults(false);
    setErrorMessage('');
    setSelectedRegion('all');
  };
  
  // 检查结果
  const checkResults = () => {
    if (selectedSymptoms.length === 0) {
      setErrorMessage(t('no_symptoms_selected'));
      return;
    }
    
    setErrorMessage('');
    
    // 获取当前语言的映射关系
    const mapping = injurySymptomMapping[language as keyof typeof injurySymptomMapping] || injurySymptomMapping['zh-CN'];
    
    // 计算匹配度
    const matchResults = Object.entries(mapping).map(([injuryId, symptomIds]) => {
      const matchingSymptoms = selectedSymptoms.filter(id => symptomIds.includes(id));
      const percentage = (matchingSymptoms.length / symptomIds.length) * 100;
      return {
        id: injuryId,
        percentage: parseFloat(percentage.toFixed(0))
      };
    });
    
    // 按匹配度排序
    const sortedResults = matchResults
      .filter(result => result.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage);
    
    setResults(sortedResults);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            {t('symptom_checker')}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t('symptom_checker_desc')}
          </p>
        </div>

        {!showResults ? (
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('select_body_region')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {bodyRegions.map(region => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedRegion === region 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {t(region)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('select_symptoms')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {filteredSymptoms.map(symptom => (
                  <div 
                    key={symptom.id}
                    className={`border rounded-md p-4 cursor-pointer transition-colors ${
                      selectedSymptoms.includes(symptom.id) 
                        ? 'bg-blue-50 border-blue-500' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => toggleSymptom(symptom.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSymptoms.includes(symptom.id)}
                        onChange={() => toggleSymptom(symptom.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm font-medium text-gray-700">
                        {symptom.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              
              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-700">{errorMessage}</p>
                </div>
              )}
              
              <div className="flex justify-between">
                <button
                  onClick={resetAll}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  {t('reset')}
                </button>
                <button
                  onClick={checkResults}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {t('check_results')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('potential_injuries')}</h2>
              
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">{t('no_matching_injuries')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.map(result => {
                    const injuries = injuryData[language as keyof typeof injuryData] || injuryData['zh-CN'];
                    const injury = injuries[result.id as keyof typeof injuries];
                    
                    return (
                      <div key={result.id} className="border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between bg-gray-50 p-4 border-b">
                          <div className="flex items-center">
                            <span className={`text-2xl ${injury.color} p-2 rounded-full mr-3`}>
                              {injury.icon}
                            </span>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{injury.title}</h3>
                              <p className="text-sm text-gray-600">{injury.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-lg font-semibold text-blue-600">{result.percentage}%</span>
                            <span className="text-sm text-gray-500">{t('match_percentage')}</span>
                          </div>
                        </div>
                        <div className="p-4 flex justify-end">
                          <Link
                            href={`/injuries/${result.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {t('view_details')} →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setResults([]);
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  {t('reset')}
                </button>
              </div>
            </div>
            
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-700">
                {t('disclaimer')}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 