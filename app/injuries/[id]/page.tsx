'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';

// 翻译文本
const translations = {
  'symptoms': {
    'en': 'Symptoms',
    'zh-CN': '症状',
    'zh-TW': '症狀'
  },
  'treatment': {
    'en': 'Acute Treatment',
    'zh-CN': '急性处理',
    'zh-TW': '急性處理'
  },
  'prevention': {
    'en': 'Prevention',
    'zh-CN': '预防措施',
    'zh-TW': '預防措施'
  },
  'not_found': {
    'en': 'Injury not found',
    'zh-CN': '未找到该伤病',
    'zh-TW': '未找到該傷病'
  },
  'return_to_list': {
    'en': 'Please return to the injury list',
    'zh-CN': '请返回伤病列表',
    'zh-TW': '請返回傷病列表'
  },
  'back_to_list': {
    'en': 'Back to list',
    'zh-CN': '返回列表',
    'zh-TW': '返回列表'
  }
};

// 伤病详情数据
const injuryDetailsData = {
  'en': {
    'muscle-strain': {
      title: 'Muscle Strain',
      description: 'Injury to muscle fibers due to overstretching or tearing',
      icon: '💪',
      color: 'bg-red-100 text-red-800',
      symptoms: [
        'Sudden sharp pain in the affected area',
        'Muscle spasms or stiffness',
        'Swelling and bruising at the injury site',
        'Limited range of motion',
        'Muscle weakness'
      ],
      treatment: [
        'Immediately stop the activity',
        'Apply RICE protocol (Rest, Ice, Compression, Elevation)',
        'Mild strains may recover in 2-3 weeks',
        'Severe strains may require physical therapy',
        'Gradually return to activities'
      ],
      prevention: [
        'Warm up adequately before exercise',
        'Maintain proper muscle strength and flexibility',
        'Avoid sudden increases in exercise intensity',
        'Use proper technique',
        'Stay hydrated and maintain good nutrition'
      ]
    },
    'ligament-sprain': {
      title: 'Ligament Sprain',
      description: 'Injury to ligaments due to overstretching or tearing',
      icon: '🦵',
      color: 'bg-yellow-100 text-yellow-800',
      symptoms: [
        'Joint pain and tenderness',
        'Swelling around the joint',
        'Joint instability',
        'Limited motion',
        'Possible "popping" sound at time of injury'
      ],
      treatment: [
        'Immediately stop the activity',
        'Apply RICE protocol',
        'Use a brace or wrap for support',
        'Mild sprains may recover in 2-4 weeks',
        'Severe sprains may require surgical repair'
      ],
      prevention: [
        'Strengthen muscles around joints',
        'Use protective equipment during sports',
        'Avoid uneven surfaces',
        'Maintain a healthy weight',
        'Practice proper technique'
      ]
    },
    'tendonitis': {
      title: 'Tendonitis',
      description: 'Inflammation of tendons causing pain and dysfunction',
      icon: '🦶',
      color: 'bg-green-100 text-green-800',
      symptoms: [
        'Pain and tenderness along the tendon',
        'Pain worsens with activity',
        'Swelling around the tendon',
        'Stiffness in the morning',
        'Decreased range of motion'
      ],
      treatment: [
        'Rest and activity modification',
        'Ice to reduce inflammation',
        'Anti-inflammatory medications',
        'Physical therapy',
        'Severe cases may require injection therapy'
      ],
      prevention: [
        'Avoid repetitive motions',
        'Maintain proper exercise intensity',
        'Use proper technique',
        'Stretch before and after exercise',
        'Maintain muscle strength and flexibility'
      ]
    },
    'fracture': {
      title: 'Fracture',
      description: 'Break in bone integrity',
      icon: '🦴',
      color: 'bg-blue-100 text-blue-800',
      symptoms: [
        'Severe pain',
        'Deformity at the injury site',
        'Swelling and bruising',
        'Inability to bear weight',
        'Possible crepitus (grinding sound)'
      ],
      treatment: [
        'Seek immediate medical attention',
        'Immobilize the injured area',
        'May require surgical reduction',
        'Cast or brace immobilization',
        'Rehabilitation exercises'
      ],
      prevention: [
        'Maintain bone health',
        'Ensure adequate calcium and vitamin D intake',
        'Avoid high-risk activities',
        'Use appropriate protective equipment',
        'Maintain muscle strength'
      ]
    },
    'dislocation': {
      title: 'Dislocation',
      description: 'Displacement of bones at a joint',
      icon: '🦾',
      color: 'bg-purple-100 text-purple-800',
      symptoms: [
        'Severe pain',
        'Visible deformity of the joint',
        'Inability to move the joint',
        'Swelling',
        'Possible neurovascular compromise'
      ],
      treatment: [
        'Seek immediate medical attention',
        'Do not attempt self-reduction',
        'Immobilize the injured area',
        'Reduction by a medical professional',
        'Rehabilitation exercises'
      ],
      prevention: [
        'Strengthen muscles around joints',
        'Avoid high-risk movements',
        'Use appropriate protective equipment',
        'Maintain proper exercise intensity',
        'Practice proper technique'
      ]
    },
    'concussion': {
      title: 'Concussion',
      description: 'Temporary brain dysfunction due to head trauma',
      icon: '🧠',
      color: 'bg-indigo-100 text-indigo-800',
      symptoms: [
        'Headache',
        'Dizziness',
        'Nausea or vomiting',
        'Confusion',
        'Memory problems',
        'Mood changes'
      ],
      treatment: [
        'Seek immediate medical attention',
        'Physical and cognitive rest',
        'Avoid strenuous activities',
        'Gradual return to normal activities',
        'Regular medical follow-up'
      ],
      prevention: [
        'Wear appropriate headgear',
        'Avoid high-risk activities',
        'Follow sport regulations',
        'Ensure safe playing environments',
        'Stay alert'
      ]
    }
  },
  'zh-CN': {
    'muscle-strain': {
      title: '肌肉拉伤',
      description: '肌肉纤维过度拉伸或撕裂导致的损伤',
      icon: '💪',
      color: 'bg-red-100 text-red-800',
      symptoms: [
        '受伤部位突然的剧烈疼痛',
        '肌肉痉挛或僵硬',
        '受伤部位肿胀和瘀血',
        '活动受限',
        '肌肉无力'
      ],
      treatment: [
        '立即停止运动',
        '应用RICE原则（休息、冰敷、压迫、抬高）',
        '轻度拉伤可在2-3周内恢复',
        '严重拉伤可能需要物理治疗',
        '逐步恢复运动'
      ],
      prevention: [
        '运动前充分热身',
        '保持适当的肌肉力量和柔韧性',
        '避免突然增加运动强度',
        '使用正确的运动技巧',
        '保持充足的水分和营养'
      ]
    },
    'ligament-sprain': {
      title: '韧带扭伤',
      description: '关节韧带过度拉伸或撕裂导致的损伤',
      icon: '🦵',
      color: 'bg-yellow-100 text-yellow-800',
      symptoms: [
        '关节疼痛和压痛',
        '关节肿胀',
        '关节不稳定',
        '活动受限',
        '受伤时可能听到"啪"的声音'
      ],
      treatment: [
        '立即停止运动',
        '应用RICE原则',
        '使用支具或绷带固定',
        '轻度扭伤可在2-4周内恢复',
        '严重扭伤可能需要手术修复'
      ],
      prevention: [
        '加强关节周围肌肉力量',
        '运动时使用护具',
        '避免在不平整的地面运动',
        '保持适当的体重',
        '注意运动技巧'
      ]
    },
    'tendonitis': {
      title: '肌腱炎',
      description: '肌腱发炎导致的疼痛和功能障碍',
      icon: '🦶',
      color: 'bg-green-100 text-green-800',
      symptoms: [
        '肌腱部位疼痛和压痛',
        '活动时疼痛加重',
        '肌腱部位肿胀',
        '晨起时僵硬',
        '活动受限'
      ],
      treatment: [
        '休息和减少活动',
        '冰敷减轻炎症',
        '使用抗炎药物',
        '物理治疗',
        '严重时可能需要注射治疗'
      ],
      prevention: [
        '避免重复性动作',
        '保持适当的运动强度',
        '使用正确的运动技巧',
        '运动前后充分拉伸',
        '保持肌肉力量和柔韧性'
      ]
    },
    'fracture': {
      title: '骨折',
      description: '骨骼完整性受到破坏的损伤',
      icon: '🦴',
      color: 'bg-blue-100 text-blue-800',
      symptoms: [
        '剧烈疼痛',
        '受伤部位畸形',
        '肿胀和淤血',
        '无法承重',
        '活动时可能听到骨擦音'
      ],
      treatment: [
        '立即就医',
        '固定受伤部位',
        '可能需要手术复位',
        '使用石膏或支具固定',
        '康复训练'
      ],
      prevention: [
        '保持骨骼健康',
        '补充足够的钙和维生素D',
        '避免高风险运动',
        '使用适当的防护装备',
        '保持肌肉力量'
      ]
    },
    'dislocation': {
      title: '关节脱位',
      description: '关节面失去正常对合关系的损伤',
      icon: '🦾',
      color: 'bg-purple-100 text-purple-800',
      symptoms: [
        '剧烈疼痛',
        '关节明显畸形',
        '无法活动',
        '肿胀',
        '可能伴有神经血管损伤'
      ],
      treatment: [
        '立即就医',
        '不要自行复位',
        '固定受伤部位',
        '专业医生进行复位',
        '康复训练'
      ],
      prevention: [
        '加强关节周围肌肉力量',
        '避免高风险动作',
        '使用适当的防护装备',
        '保持适当的运动强度',
        '注意运动技巧'
      ]
    },
    'concussion': {
      title: '脑震荡',
      description: '头部受到撞击导致的暂时性脑功能障碍',
      icon: '🧠',
      color: 'bg-indigo-100 text-indigo-800',
      symptoms: [
        '头痛',
        '头晕',
        '恶心呕吐',
        '意识模糊',
        '记忆力问题',
        '情绪变化'
      ],
      treatment: [
        '立即就医',
        '充分休息',
        '避免剧烈活动',
        '逐步恢复日常活动',
        '定期复查'
      ],
      prevention: [
        '使用合适的头盔',
        '避免高风险运动',
        '遵守运动规则',
        '注意场地安全',
        '保持警惕'
      ]
    }
  },
  'zh-TW': {
    'muscle-strain': {
      title: '肌肉拉傷',
      description: '肌肉纖維過度拉伸或撕裂導致的損傷',
      icon: '💪',
      color: 'bg-red-100 text-red-800',
      symptoms: [
        '受傷部位突然的劇烈疼痛',
        '肌肉痙攣或僵硬',
        '受傷部位腫脹和瘀血',
        '活動受限',
        '肌肉無力'
      ],
      treatment: [
        '立即停止運動',
        '應用RICE原則（休息、冰敷、壓迫、抬高）',
        '輕度拉傷可在2-3週內恢復',
        '嚴重拉傷可能需要物理治療',
        '逐步恢復運動'
      ],
      prevention: [
        '運動前充分熱身',
        '保持適當的肌肉力量和柔韌性',
        '避免突然增加運動強度',
        '使用正確的運動技巧',
        '保持充足的水分和營養'
      ]
    },
    'ligament-sprain': {
      title: '韌帶扭傷',
      description: '關節韌帶過度拉伸或撕裂導致的損傷',
      icon: '🦵',
      color: 'bg-yellow-100 text-yellow-800',
      symptoms: [
        '關節疼痛和壓痛',
        '關節腫脹',
        '關節不穩定',
        '活動受限',
        '受傷時可能聽到"啪"的聲音'
      ],
      treatment: [
        '立即停止運動',
        '應用RICE原則',
        '使用支具或繃帶固定',
        '輕度扭傷可在2-4週內恢復',
        '嚴重扭傷可能需要手術修復'
      ],
      prevention: [
        '加強關節周圍肌肉力量',
        '運動時使用護具',
        '避免在不平整的地面運動',
        '保持適當的體重',
        '注意運動技巧'
      ]
    },
    'tendonitis': {
      title: '肌腱炎',
      description: '肌腱發炎導致的疼痛和功能障礙',
      icon: '🦶',
      color: 'bg-green-100 text-green-800',
      symptoms: [
        '肌腱部位疼痛和壓痛',
        '活動時疼痛加重',
        '肌腱部位腫脹',
        '晨起時僵硬',
        '活動受限'
      ],
      treatment: [
        '休息和減少活動',
        '冰敷減輕炎症',
        '使用抗炎藥物',
        '物理治療',
        '嚴重時可能需要注射治療'
      ],
      prevention: [
        '避免重複性動作',
        '保持適當的運動強度',
        '使用正確的運動技巧',
        '運動前後充分拉伸',
        '保持肌肉力量和柔韌性'
      ]
    },
    'fracture': {
      title: '骨折',
      description: '骨骼完整性受到破壞的損傷',
      icon: '🦴',
      color: 'bg-blue-100 text-blue-800',
      symptoms: [
        '劇烈疼痛',
        '受傷部位畸形',
        '腫脹和瘀血',
        '無法承重',
        '活動時可能聽到骨擦音'
      ],
      treatment: [
        '立即就醫',
        '固定受傷部位',
        '可能需要手術複位',
        '使用石膏或支具固定',
        '康復訓練'
      ],
      prevention: [
        '保持骨骼健康',
        '補充足夠的鈣和維生素D',
        '避免高風險運動',
        '使用適當的防護裝備',
        '保持肌肉力量'
      ]
    },
    'dislocation': {
      title: '關節脫位',
      description: '關節面失去正常對合關係的損傷',
      icon: '🦾',
      color: 'bg-purple-100 text-purple-800',
      symptoms: [
        '劇烈疼痛',
        '關節明顯畸形',
        '無法活動',
        '腫脹',
        '可能伴有神經血管損傷'
      ],
      treatment: [
        '立即就醫',
        '不要自行複位',
        '固定受傷部位',
        '專業醫生進行複位',
        '康復訓練'
      ],
      prevention: [
        '加強關節周圍肌肉力量',
        '避免高風險動作',
        '使用適當的防護裝備',
        '保持適當的運動強度',
        '注意運動技巧'
      ]
    },
    'concussion': {
      title: '腦震盪',
      description: '頭部受到撞擊導致的暫時性腦功能障礙',
      icon: '🧠',
      color: 'bg-indigo-100 text-indigo-800',
      symptoms: [
        '頭痛',
        '頭暈',
        '惡心嘔吐',
        '意識模糊',
        '記憶力問題',
        '情緒變化'
      ],
      treatment: [
        '立即就醫',
        '充分休息',
        '避免劇烈活動',
        '逐步恢復日常活動',
        '定期複查'
      ],
      prevention: [
        '使用合適的頭盔',
        '避免高風險運動',
        '遵守運動規則',
        '注意場地安全',
        '保持警覺'
      ]
    }
  }
};

export default function InjuryDetail() {
  const params = useParams();
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
  
  // 获取当前语言的伤病详情
  const injuryDetails = injuryDetailsData[language as keyof typeof injuryDetailsData] || injuryDetailsData['zh-CN'];
  const injury = injuryDetails[params.id as keyof typeof injuryDetails];

  if (!injury) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navigation />
        <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">{t('not_found')}</h1>
            <p className="mt-4 text-gray-600">{t('return_to_list')}</p>
            <Link
              href="/injuries"
              className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              {t('back_to_list')}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className={`text-4xl ${injury.color} p-4 rounded-full`}>{injury.icon}</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            {injury.title}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {injury.description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow-lg rounded-xl">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('symptoms')}</h2>
              <ul className="space-y-3">
                {injury.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-indigo-600">•</span>
                    <span className="ml-2 text-gray-600">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-xl">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('treatment')}</h2>
              <ul className="space-y-3">
                {injury.treatment.map((treatment, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-indigo-600">•</span>
                    <span className="ml-2 text-gray-600">{treatment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-xl">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('prevention')}</h2>
              <ul className="space-y-3">
                {injury.prevention.map((prevention, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-indigo-600">•</span>
                    <span className="ml-2 text-gray-600">{prevention}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 