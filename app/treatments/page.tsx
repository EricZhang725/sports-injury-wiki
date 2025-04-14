'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

// 定义不同语言的康复方法数据
const treatmentsData = {
  'zh-CN': [
    {
      id: 'rice',
      name: 'RICE原则',
      description: '运动损伤的初始处理方法，包括休息、冰敷、压迫和抬高。',
      steps: [
        '休息（Rest）：立即停止运动，避免进一步损伤',
        '冰敷（Ice）：使用冰袋敷在受伤部位，每次15-20分钟',
        '压迫（Compression）：使用弹性绷带包扎，减轻肿胀',
        '抬高（Elevation）：将受伤部位抬高，促进血液回流'
      ]
    },
    {
      id: 'physical-therapy',
      name: '物理治疗',
      description: '专业的物理治疗方法包括：',
      steps: [
        '热敷和冷敷交替治疗',
        '超声波治疗',
        '电疗',
        '按摩治疗',
        '牵引治疗',
        '光疗',
        '水疗'
      ]
    },
    {
      id: 'rehab-training',
      name: '康复训练',
      description: '损伤恢复期的训练方法：',
      steps: [
        '渐进式力量训练',
        '柔韧性训练',
        '平衡训练',
        '功能性训练',
        '运动专项训练',
        '核心稳定性训练',
        '协调性训练'
      ]
    },
    {
      id: 'nutrition',
      name: '营养补充',
      description: '运动损伤恢复期的营养建议：',
      steps: [
        '蛋白质补充',
        '维生素补充',
        '矿物质补充',
        '抗氧化物质补充',
        '水分补充',
        '膳食纤维补充',
        '健康脂肪补充'
      ]
    },
    {
      id: 'psychological',
      name: '心理康复',
      description: '运动损伤后的心理调适：',
      steps: [
        '接受现实',
        '保持积极心态',
        '设定合理目标',
        '寻求社会支持',
        '学习放松技巧',
        '保持规律作息',
        '培养兴趣爱好'
      ]
    },
    {
      id: 'prevention',
      name: '运动防护',
      description: '预防运动损伤的措施：',
      steps: [
        '充分热身',
        '正确使用护具',
        '选择合适的运动装备',
        '注意运动环境',
        '掌握正确技术',
        '循序渐进增加强度',
        '及时补充能量'
      ]
    }
  ],
  'zh-TW': [
    {
      id: 'rice',
      name: 'RICE原則',
      description: '運動損傷的初始處理方法，包括休息、冰敷、壓迫和抬高。',
      steps: [
        '休息（Rest）：立即停止運動，避免進一步損傷',
        '冰敷（Ice）：使用冰袋敷在受傷部位，每次15-20分鐘',
        '壓迫（Compression）：使用彈性繃帶包紮，減輕腫脹',
        '抬高（Elevation）：將受傷部位抬高，促進血液回流'
      ]
    },
    {
      id: 'physical-therapy',
      name: '物理治療',
      description: '專業的物理治療方法包括：',
      steps: [
        '熱敷和冷敷交替治療',
        '超聲波治療',
        '電療',
        '按摩治療',
        '牽引治療',
        '光療',
        '水療'
      ]
    },
    {
      id: 'rehab-training',
      name: '康復訓練',
      description: '損傷恢復期的訓練方法：',
      steps: [
        '漸進式力量訓練',
        '柔韌性訓練',
        '平衡訓練',
        '功能性訓練',
        '運動專項訓練',
        '核心穩定性訓練',
        '協調性訓練'
      ]
    },
    {
      id: 'nutrition',
      name: '營養補充',
      description: '運動損傷恢復期的營養建議：',
      steps: [
        '蛋白質補充',
        '維生素補充',
        '礦物質補充',
        '抗氧化物質補充',
        '水分補充',
        '膳食纖維補充',
        '健康脂肪補充'
      ]
    },
    {
      id: 'psychological',
      name: '心理康復',
      description: '運動損傷後的心理調適：',
      steps: [
        '接受現實',
        '保持積極心態',
        '設定合理目標',
        '尋求社會支持',
        '學習放鬆技巧',
        '保持規律作息',
        '培養興趣愛好'
      ]
    },
    {
      id: 'prevention',
      name: '運動防護',
      description: '預防運動損傷的措施：',
      steps: [
        '充分熱身',
        '正確使用護具',
        '選擇合適的運動裝備',
        '注意運動環境',
        '掌握正確技術',
        '循序漸進增加強度',
        '及時補充能量'
      ]
    }
  ],
  'en': [
    {
      id: 'rice',
      name: 'RICE Principle',
      description: 'Initial treatment method for sports injuries, including Rest, Ice, Compression, and Elevation.',
      steps: [
        'Rest: Immediately stop activity to prevent further injury',
        'Ice: Apply ice packs to the injured area for 15-20 minutes',
        'Compression: Use elastic bandages to reduce swelling',
        'Elevation: Raise the injured area to promote blood flow back to the heart'
      ]
    },
    {
      id: 'physical-therapy',
      name: 'Physical Therapy',
      description: 'Professional physical therapy methods include:',
      steps: [
        'Alternating heat and cold therapy',
        'Ultrasound therapy',
        'Electrotherapy',
        'Massage therapy',
        'Traction therapy',
        'Light therapy',
        'Hydrotherapy'
      ]
    },
    {
      id: 'rehab-training',
      name: 'Rehabilitation Training',
      description: 'Training methods during the recovery period:',
      steps: [
        'Progressive strength training',
        'Flexibility training',
        'Balance training',
        'Functional training',
        'Sport-specific training',
        'Core stability training',
        'Coordination training'
      ]
    },
    {
      id: 'nutrition',
      name: 'Nutritional Supplementation',
      description: 'Nutritional recommendations during sports injury recovery:',
      steps: [
        'Protein supplementation',
        'Vitamin supplementation',
        'Mineral supplementation',
        'Antioxidant supplementation',
        'Hydration',
        'Dietary fiber supplementation',
        'Healthy fat supplementation'
      ]
    },
    {
      id: 'psychological',
      name: 'Psychological Rehabilitation',
      description: 'Psychological adjustment after sports injuries:',
      steps: [
        'Accept reality',
        'Maintain a positive attitude',
        'Set reasonable goals',
        'Seek social support',
        'Learn relaxation techniques',
        'Maintain regular routines',
        'Develop interests and hobbies'
      ]
    },
    {
      id: 'prevention',
      name: 'Sports Protection',
      description: 'Measures to prevent sports injuries:',
      steps: [
        'Thorough warm-up',
        'Proper use of protective gear',
        'Choose appropriate sports equipment',
        'Pay attention to the exercise environment',
        'Master correct techniques',
        'Gradually increase intensity',
        'Timely energy replenishment'
      ]
    }
  ]
};

// 翻译内容
const pageTranslations = {
  'title': {
    'en': 'Rehabilitation Methods',
    'zh-CN': '康复方法',
    'zh-TW': '康復方法'
  },
  'subtitle': {
    'en': 'Learn about various rehabilitation methods and techniques for sports injuries',
    'zh-CN': '了解各种运动损伤的康复方法和技巧',
    'zh-TW': '了解各種運動損傷的康復方法和技巧'
  },
  'viewDetails': {
    'en': 'View Details →',
    'zh-CN': '查看详情 →',
    'zh-TW': '查看詳情 →'
  }
};

export default function Treatments() {
  const [selectedTreatment, setSelectedTreatment] = useState<number | null>(null);
  const { language, t } = useLanguage();

  // 获取当前语言的康复方法数据
  const treatments = treatmentsData[language as keyof typeof treatmentsData] || treatmentsData['zh-CN'];

  // 翻译函数
  const tPage = (key: string) => {
    return pageTranslations[key as keyof typeof pageTranslations]?.[language as keyof typeof pageTranslations[keyof typeof pageTranslations]] || key;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">{tPage('title')}</h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {tPage('subtitle')}
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((treatment, index) => (
              <div key={treatment.id || index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{treatment.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{treatment.description}</p>
                  <div className="mt-4">
                    <Link
                      href={`/treatments/${treatment.id}`}
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      {tPage('viewDetails')}
                    </Link>
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