import { useState } from 'react';
import { InjuryDetail } from '../data/injuries';

interface EditInjuryModalProps {
  injury: InjuryDetail;
  onSave: (updatedInjury: InjuryDetail) => void;
  onClose: () => void;
}

export default function EditInjuryModal({ injury, onSave, onClose }: EditInjuryModalProps) {
  const [editedInjury, setEditedInjury] = useState<InjuryDetail>(injury);

  const handleInputChange = (field: keyof InjuryDetail, value: string) => {
    setEditedInjury(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: keyof InjuryDetail, index: number, value: string) => {
    setEditedInjury(prev => {
      const newArray = [...(prev[field] as string[])];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedInjury);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">编辑损伤信息</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">名称</label>
            <input
              type="text"
              value={editedInjury.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">描述</label>
            <textarea
              value={editedInjury.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">症状</label>
            {editedInjury.symptoms.map((symptom, index) => (
              <input
                key={index}
                type="text"
                value={symptom}
                onChange={(e) => handleArrayInputChange('symptoms', index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">治疗方法</label>
            {editedInjury.treatments.map((treatment, index) => (
              <input
                key={index}
                type="text"
                value={treatment}
                onChange={(e) => handleArrayInputChange('treatments', index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">注意事项</label>
            {editedInjury.precautions.map((precaution, index) => (
              <input
                key={index}
                type="text"
                value={precaution}
                onChange={(e) => handleArrayInputChange('precautions', index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">恢复时间</label>
            <input
              type="text"
              value={editedInjury.recoveryTime}
              onChange={(e) => handleInputChange('recoveryTime', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">严重程度</label>
            <select
              value={editedInjury.severity}
              onChange={(e) => handleInputChange('severity', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="轻度">轻度</option>
              <option value="中度">中度</option>
              <option value="重度">重度</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 