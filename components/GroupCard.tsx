import React from 'react';
import { Group } from '../types';

interface GroupCardProps {
  group: Group;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-indigo-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center justify-between">
          <span>{group.id} 모둠</span>
          <span className="text-indigo-200 text-sm font-normal">{group.students.length}명</span>
        </h3>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {group.students.map((studentId) => (
            <span
              key={studentId}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm border border-indigo-100"
            >
              {studentId}
            </span>
          ))}
        </div>
        {group.students.length === 0 && (
            <p className="text-slate-400 text-sm italic">배정된 학생이 없습니다.</p>
        )}
      </div>
    </div>
  );
};