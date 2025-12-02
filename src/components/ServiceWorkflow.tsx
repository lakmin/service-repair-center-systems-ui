import { useState } from 'react';
import { Clock, FileText, Upload, Check, X } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface ServiceWorkflowProps {
  onNavigate: (view: any) => void;
}

export default function ServiceWorkflow({ onNavigate }: ServiceWorkflowProps) {
  const [timer, setTimer] = useState(45); // minutes
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Oil Change', estimated: 15, completed: true },
    { id: 2, name: 'Filter Replacement', estimated: 10, completed: true },
    { id: 3, name: 'Battery Check', estimated: 5, completed: false },
    { id: 4, name: 'Brake Service', estimated: 20, completed: false },
    { id: 5, name: 'AC Service', estimated: 15, completed: false },
    { id: 6, name: 'Tyre Rotation', estimated: 20, completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="flex h-screen">
      <Sidebar currentView="service-workflow" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Service Workflow</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span>Toyota Camry 2021 - REG: ABC-1234</span>
                <span>•</span>
                <span>Technician: Mike Ross</span>
              </div>
            </div>

            {/* Timer and Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock size={20} />
                    <span>Time Tracking</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-900">{timer} min</span>
                    <span className="text-gray-500">/ 85 min estimated</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-600 mb-2">Progress</div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#1A73E8] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-900">{completedTasks}/{totalTasks}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Tasks */}
            <div className="space-y-4 mb-8">
              {tasks.map((task) => (
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
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className={`text-gray-900 ${task.completed ? 'line-through' : ''}`}>
                            {task.name}
                          </h3>
                          <span className="text-sm text-gray-500">
                            Est. {task.estimated} min
                          </span>
                        </div>
                        
                        {task.completed && (
                          <div className="flex items-center gap-2 text-green-600 text-sm">
                            <Check size={16} />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`px-8 py-3 rounded-lg transition-all ${
                          task.completed
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-[#1A73E8] text-white hover:bg-[#1557B0]'
                        }`}
                      >
                        {task.completed ? (
                          <span className="flex items-center gap-2">
                            <X size={20} />
                            Undo
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Check size={20} />
                            Complete
                          </span>
                        )}
                      </button>
                    </div>

                    {task.completed && (
                      <div className="mt-4 pt-4 border-t border-green-200 grid grid-cols-2 gap-4">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                          <FileText size={18} />
                          Record Notes
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                          <Upload size={18} />
                          Upload Parts Used
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => onNavigate('job-card')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Back to Job Card
              </button>

              <button
                onClick={() => onNavigate('detailing-workflow')}
                className="px-6 py-3 bg-[#1A73E8] text-white rounded-lg hover:bg-[#1557B0]"
                disabled={completedTasks !== totalTasks}
              >
                {completedTasks === totalTasks ? 'Proceed to Detailing' : `Complete ${totalTasks - completedTasks} more tasks`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
