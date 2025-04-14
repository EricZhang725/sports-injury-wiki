'use client';

import { useParams } from 'next/navigation';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

const emergencyProcedures = [
  {
    id: 'bike-fall',
    situation: '骑行摔倒',
    description: '骑行时即将摔倒的应对方法',
    steps: [
      '保持冷静，不要慌乱',
      '尽量放松身体，避免肌肉紧张',
      '尽可能将身体蜷缩，保护头部',
      '避免用手直接撑地',
      '摔倒后不要立即起身，先检查伤势',
      '如果头部受撞击，即使感觉没事也要就医',
      '确认安全后，慢慢移动到路边',
      '检查自行车是否损坏'
    ],
    prevention: [
      '佩戴头盔等防护装备',
      '保持适当车速',
      '注意路面状况',
      '定期检查车辆状况',
      '避免疲劳骑行',
      '遵守交通规则',
      '保持车距'
    ],
    tips: [
      '骑行前检查刹车系统',
      '保持双手握把，随时准备刹车',
      '注意观察前方路况',
      '避免在湿滑路面急刹车',
      '保持车距，预留安全空间',
      '注意观察后方来车',
      '避免在疲劳状态下骑行'
    ]
  },
  // ... 其他紧急情况
];

export default function EmergencyDetail() {
  const params = useParams();
  const procedure = emergencyProcedures.find(p => p.id === params.id);

  if (!procedure) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900">未找到该紧急情况</h1>
            <Link href="/emergency" className="text-indigo-600 hover:text-indigo-900">
              返回紧急情况列表
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
              <h1 className="text-3xl font-bold text-red-600">{procedure.situation}</h1>
              <Link
                href="/emergency"
                className="text-indigo-600 hover:text-indigo-900"
              >
                返回列表
              </Link>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">{procedure.description}</p>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">处理步骤</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  {procedure.steps.map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">预防措施</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {procedure.prevention.map((prevent, index) => (
                    <li key={index} className="text-gray-700">{prevent}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">实用技巧</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {procedure.tips.map((tip, index) => (
                    <li key={index} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </div>

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

              <div className="mt-8 bg-red-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-red-600 mb-4">重要提示</h2>
                <p className="text-gray-700">
                  在紧急情况下，请立即拨打急救电话120。本指南仅供参考，不能替代专业医疗建议。
                  如果情况严重，请立即寻求专业医疗帮助。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 