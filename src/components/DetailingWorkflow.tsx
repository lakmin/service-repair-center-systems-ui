import { useState } from 'react';
import { Clock, Upload, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface DetailingWorkflowProps {
  onNavigate: (view: any) => void;
}

export default function DetailingWorkflow({ onNavigate }: DetailingWorkflowProps) {
  const [activeSection, setActiveSection] = useState<'exterior' | 'interior'>('exterior');
  const [exteriorTasks, setExteriorTasks] = useState([
    { id: 1, name: 'Foam Wash', completed: true },
    { id: 2, name: 'Pressure Wash', completed: true },
    { id: 3, name: 'Drying', completed: false },
    { id: 4, name: 'Clay Bar Treatment', completed: false },
    { id: 5, name: 'Polish', completed: false },
    { id: 6, name: 'Wax Application', completed: false },
    { id: 7, name: 'Ceramic Coat', completed: false },
  ]);

  const [interiorTasks, setInteriorTasks] = useState([
    { id: 1, name: 'Vacuum', completed: false },
    { id: 2, name: 'Dashboard Clean', completed: false },
    { id: 3, name: 'Seat Cleaning', completed: false },
    { id: 4, name: 'Mat Wash', completed: false },
    { id: 5, name: 'Glass Cleaning', completed: false },
    { id: 6, name: 'Perfume (Optional)', completed: false },
  ]);

  const toggleTask = (id: number, section: 'exterior' | 'interior') => {
    if (section === 'exterior') {
      setExteriorTasks(exteriorTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } else {
      setInteriorTasks(interiorTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    }
  };

  const exteriorCompleted = exteriorTasks.filter(t => t.completed).length;
  const interiorCompleted = interiorTasks.filter(t => t.completed).length;
  const totalCompleted = exteriorCompleted + interiorCompleted;
  const totalTasks = exteriorTasks.length + interiorTasks.length;
  const progress = (totalCompleted / totalTasks) * 100;

  return (
    <div className="flex h-screen">
      <Sidebar currentView="detailing-workflow" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Detailing Workflow</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span>Toyota Camry 2021 - REG: ABC-1234</span>
                <span>•</span>
                <span>Gold Package</span>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={20} />
                  <span>Overall Progress</span>
                </div>
                <span className="text-gray-900">{totalCompleted}/{totalTasks} completed</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1A73E8] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Section Tabs */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveSection('exterior')}
                className={`flex-1 px-6 py-4 rounded-xl transition-all ${
                  activeSection === 'exterior'
                    ? 'bg-[#1A73E8] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="mb-1">Exterior Detailing</div>
                <div className={`text-sm ${activeSection === 'exterior' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {exteriorCompleted}/{exteriorTasks.length} steps
                </div>
              </button>

              <button
                onClick={() => setActiveSection('interior')}
                className={`flex-1 px-6 py-4 rounded-xl transition-all ${
                  activeSection === 'interior'
                    ? 'bg-[#1A73E8] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="mb-1">Interior Detailing</div>
                <div className={`text-sm ${activeSection === 'interior' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {interiorCompleted}/{interiorTasks.length} steps
                </div>
              </button>
            </div>

            {/* Exterior Tasks */}
            {activeSection === 'exterior' && (
              <div className="space-y-4 mb-8">
                {exteriorTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                      task.completed 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-100 hover:border-[#1A73E8]'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            task.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}>
                            {task.completed && <Check size={18} className="text-white" />}
                          </div>
                          <h3 className={`text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                            {task.name}
                          </h3>
                        </div>

                        <button
                          onClick={() => toggleTask(task.id, 'exterior')}
                          className={`px-8 py-3 rounded-lg transition-all ${
                            task.completed
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-[#1A73E8] text-white hover:bg-[#1557B0]'
                          }`}
                        >
                          {task.completed ? 'Undo' : 'Complete'}
                        </button>
                      </div>

                      {task.completed && (
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 mb-2 text-sm">Before Photo</label>
                              <label className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1A73E8]">
                                <div className="text-center">
                                  <Upload className="mx-auto mb-1 text-gray-400" size={20} />
                                  <span className="text-sm text-gray-500">Upload</span>
                                </div>
                                <input type="file" className="hidden" accept="image/*" />
                              </label>
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-2 text-sm">After Photo</label>
                              <label className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1A73E8]">
                                <div className="text-center">
                                  <Upload className="mx-auto mb-1 text-gray-400" size={20} />
                                  <span className="text-sm text-gray-500">Upload</span>
                                </div>
                                <input type="file" className="hidden" accept="image/*" />
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Interior Tasks */}
            {activeSection === 'interior' && (
              <div className="space-y-4 mb-8">
                {interiorTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                      task.completed 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-100 hover:border-[#1A73E8]'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            task.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}>
                            {task.completed && <Check size={18} className="text-white" />}
                          </div>
                          <h3 className={`text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                            {task.name}
                          </h3>
                        </div>

                        <button
                          onClick={() => toggleTask(task.id, 'interior')}
                          className={`px-8 py-3 rounded-lg transition-all ${
                            task.completed
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-[#1A73E8] text-white hover:bg-[#1557B0]'
                          }`}
                        >
                          {task.completed ? 'Undo' : 'Complete'}
                        </button>
                      </div>

                      {task.completed && (
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 mb-2 text-sm">Before Photo</label>
                              <label className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1A73E8]">
                                <div className="text-center">
                                  <Upload className="mx-auto mb-1 text-gray-400" size={20} />
                                  <span className="text-sm text-gray-500">Upload</span>
                                </div>
                                <input type="file" className="hidden" accept="image/*" />
                              </label>
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-2 text-sm">After Photo</label>
                              <label className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1A73E8]">
                                <div className="text-center">
                                  <Upload className="mx-auto mb-1 text-gray-400" size={20} />
                                  <span className="text-sm text-gray-500">Upload</span>
                                </div>
                                <input type="file" className="hidden" accept="image/*" />
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => onNavigate('service-workflow')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Back to Service
              </button>

              <button
                onClick={() => onNavigate('qc')}
                className="px-6 py-3 bg-[#1A73E8] text-white rounded-lg hover:bg-[#1557B0]"
                disabled={totalCompleted !== totalTasks}
              >
                {totalCompleted === totalTasks ? 'Proceed to QC' : `Complete ${totalTasks - totalCompleted} more tasks`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
