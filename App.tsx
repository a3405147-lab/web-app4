import React, { useState, useCallback } from 'react';
import { Group, GroupingMethod } from './types';
import { generateGroups } from './services/groupingService';
import { GroupCard } from './components/GroupCard';
import { Users, Shuffle, ListOrdered, Sparkles, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [totalStudents, setTotalStudents] = useState<number>(30);
  const [groupCount, setGroupCount] = useState<number>(6);
  const [method, setMethod] = useState<GroupingMethod>(GroupingMethod.RANDOM);
  const [groups, setGroups] = useState<Group[]>([]);
  const [generated, setGenerated] = useState<boolean>(false);

  const handleGenerate = useCallback(() => {
    if (totalStudents < 1 || groupCount < 1) {
      alert("학생 수와 모둠 수를 올바르게 입력해주세요.");
      return;
    }
    if (groupCount > totalStudents) {
      alert("모둠 수가 학생 수보다 많을 수 없습니다.");
      return;
    }

    const newGroups = generateGroups(totalStudents, groupCount, method);
    setGroups(newGroups);
    setGenerated(true);
  }, [totalStudents, groupCount, method]);

  const handleReset = () => {
    setGenerated(false);
    setGroups([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
              <Users size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            모둠 자동 편성기
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            학생 수와 모둠 수를 입력하면 자동으로 모둠을 편성해줍니다.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Input: Total Students */}
            <div>
              <label htmlFor="students" className="block text-sm font-medium text-slate-700 mb-2">
                전체 학생 수
              </label>
              <input
                type="number"
                id="students"
                min="1"
                value={totalStudents}
                onChange={(e) => setTotalStudents(parseInt(e.target.value) || 0)}
                className="block w-full rounded-lg border-slate-300 bg-slate-50 border p-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            {/* Input: Group Count */}
            <div>
              <label htmlFor="groups" className="block text-sm font-medium text-slate-700 mb-2">
                편성할 모둠 수
              </label>
              <input
                type="number"
                id="groups"
                min="1"
                value={groupCount}
                onChange={(e) => setGroupCount(parseInt(e.target.value) || 0)}
                className="block w-full rounded-lg border-slate-300 bg-slate-50 border p-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            {/* Input: Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                편성 방식
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMethod(GroupingMethod.RANDOM)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                    method === GroupingMethod.RANDOM
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                      : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Shuffle size={18} />
                  <span>랜덤</span>
                </button>
                <button
                  onClick={() => setMethod(GroupingMethod.SEQUENTIAL)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                    method === GroupingMethod.SEQUENTIAL
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                      : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ListOrdered size={18} />
                  <span>번호순</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5"
            >
              {generated ? <RefreshCw size={20} /> : <Sparkles size={20} />}
              {generated ? '다시 편성하기' : '모둠 편성하기'}
            </button>
          </div>
        </div>

        {/* Results */}
        {generated && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                편성 결과
                <span className="ml-2 text-sm font-normal text-slate-500">
                  총 {totalStudents}명 / {groupCount}모둠
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
            
            <div className="mt-10 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-yellow-800 text-sm flex gap-2">
                <span className="font-bold">💡 팁:</span>
                <span>'다시 편성하기'를 누르면 {method === GroupingMethod.RANDOM ? '새로운 무작위 조합이' : '설정된 방식대로'} 다시 생성됩니다.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;