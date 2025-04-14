'use client';

import { useParams } from 'next/navigation';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

const treatments = [
  {
    id: 'rice',
    name: 'RICE原则',
    description: 'RICE是运动损伤初期处理的基本原则，包括：',
    steps: [
      '休息(Rest)：停止运动，避免进一步损伤',
      '冰敷(Ice)：用冰袋敷在受伤部位，每次15-20分钟，每2-3小时一次',
      '压迫(Compression)：使用弹性绷带包扎，减少肿胀',
      '抬高(Elevation)：将受伤部位抬高，促进血液回流'
    ],
    details: {
      ice: {
        title: '冰敷的正确方法',
        steps: [
          '使用冰袋或冰块，不要直接接触皮肤',
          '用毛巾包裹冰袋，避免冻伤',
          '每次冰敷15-20分钟',
          '每2-3小时重复一次',
          '冰敷后观察皮肤颜色，确保没有冻伤',
          '急性期（伤后48小时内）可频繁冰敷',
          '慢性期可减少冰敷频率'
        ]
      },
      compression: {
        title: '绷带包扎技巧',
        steps: [
          '从远端开始包扎，向近端缠绕',
          '保持适当的压力，不要过紧',
          '每圈重叠1/2到2/3',
          '注意观察末梢循环',
          '如果出现麻木或疼痛加重，立即松开',
          '包扎时保持关节功能位',
          '包扎后适当活动，确保不影响血液循环'
        ]
      }
    }
  },
  // ... 其他治疗方法
];

export default function TreatmentDetail() {
  const params = useParams();
  const treatment = treatments.find(t => t.id === params.id);

  if (!treatment) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900">未找到该治疗方法</h1>
            <Link href="/treatments" className="text-indigo-600 hover:text-indigo-900">
              返回治疗方法列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{treatment.name}</h1>
              <Link
                href="/treatments"
                className="text-indigo-600 hover:text-indigo-900"
              >
                返回列表
              </Link>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">{treatment.description}</p>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">基本步骤</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  {treatment.steps.map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>

              {treatment.details && (
                <div className="space-y-8">
                  {Object.entries(treatment.details).map(([key, detail]) => (
                    <div key={key} className="border-t pt-6">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{detail.title}</h2>
                      <ul className="list-disc pl-5 space-y-2">
                        {detail.steps.map((step, index) => (
                          <li key={index} className="text-gray-700">{step}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* 预留视频和图片区域 */}
              <div className="mt-8 border-t pt-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">视频演示</h2>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
                  {/* 视频区域 */}
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">图片说明</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 图片区域 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 