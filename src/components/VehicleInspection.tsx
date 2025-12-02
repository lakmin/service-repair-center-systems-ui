import { useState } from 'react';
import { ChevronDown, ChevronUp, Upload, AlertCircle, ArrowRight, Save } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface VehicleInspectionProps {
  onNavigate: (view: any) => void;
}

export default function VehicleInspection({ onNavigate }: VehicleInspectionProps) {
  const [activeSection, setActiveSection] = useState<string>('service');
  const [paintQuality, setPaintQuality] = useState(75);
  const [issues, setIssues] = useState([
    { id: 1, issue: 'Brake pads worn', severity: 'high', decision: 'fix' },
    { id: 2, issue: 'AC filter replacement', severity: 'medium', decision: 'fix' },
  ]);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  const urgentCount = issues.filter(i => i.severity === 'high').length;

  return (
    <div className="flex h-screen">
      <Sidebar currentView="inspection" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Full Vehicle Inspection</h1>
              <p className="text-gray-600">Toyota Camry 2021 - REG: ABC-1234</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="col-span-2 space-y-6">
                {/* Section A - Service Checklist */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleSection('service')}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
                  >
                    <h2 className="text-gray-900">Section A - Service Checklist</h2>
                    {activeSection === 'service' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  
                  {activeSection === 'service' && (
                    <div className="p-6 pt-0 grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Oil Level</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8]">
                          <option>Good</option>
                          <option>Low</option>
                          <option>Replace</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Air Filter</label>
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                            OK
                          </button>
                          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            Replace
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Brake Condition</label>
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            OK
                          </button>
                          <button className="flex-1 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg">
                            Poor
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Battery</label>
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                            OK
                          </button>
                          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            Weak
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Tyres</label>
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                            OK
                          </button>
                          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            Worn
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">AC Cooling</label>
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                            OK
                          </button>
                          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                            Poor
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section B - Detailing Inspection */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleSection('detailing')}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
                  >
                    <h2 className="text-gray-900">Section B - Detailing Inspection</h2>
                    {activeSection === 'detailing' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  
                  {activeSection === 'detailing' && (
                    <div className="p-6 pt-0 space-y-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Paint Quality: {paintQuality}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={paintQuality}
                          onChange={(e) => setPaintQuality(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1A73E8]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Swirl Marks</label>
                          <label className="flex items-center justify-center h-32 border-2 border-dashed border-[#D0D0D0] rounded-lg cursor-pointer hover:border-[#1A73E8]">
                            <div className="text-center">
                              <Upload className="mx-auto mb-2 text-gray-400" />
                              <span className="text-gray-500">Upload Photo</span>
                            </div>
                            <input type="file" className="hidden" accept="image/*" />
                          </label>
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">Scratches</label>
                          <label className="flex items-center justify-center h-32 border-2 border-dashed border-[#D0D0D0] rounded-lg cursor-pointer hover:border-[#1A73E8]">
                            <div className="text-center">
                              <Upload className="mx-auto mb-2 text-gray-400" />
                              <span className="text-gray-500">Upload Photo</span>
                            </div>
                            <input type="file" className="hidden" accept="image/*" />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Interior Dirt Level</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8]">
                          <option>Clean</option>
                          <option>Moderate</option>
                          <option>Heavy</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-gray-700">Seat Stains Present</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A73E8]"></div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section C - Repair Issues */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleSection('repairs')}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50"
                  >
                    <h2 className="text-gray-900">Section C - Repair Issues</h2>
                    {activeSection === 'repairs' ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  
                  {activeSection === 'repairs' && (
                    <div className="p-6 pt-0">
                      <div className="space-y-4">
                        {issues.map((issue) => (
                          <div key={issue.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                            <div className="flex-1">
                              <div className="text-gray-900">{issue.issue}</div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                              issue.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {issue.severity.toUpperCase()}
                            </span>
                            <div className="flex gap-2">
                              <button className={`px-4 py-2 rounded-lg ${
                                issue.decision === 'fix' ? 'bg-green-100 text-green-700' : 'border border-gray-300 text-gray-700'
                              }`}>
                                Fix Today
                              </button>
                              <button className={`px-4 py-2 rounded-lg ${
                                issue.decision === 'postpone' ? 'bg-yellow-100 text-yellow-700' : 'border border-gray-300 text-gray-700'
                              }`}>
                                Postpone
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-[#1A73E8] hover:text-[#1A73E8]">
                        + Add New Issue
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Sidebar - Summary */}
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
                  <h3 className="text-gray-900 mb-4">Inspection Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-blue-900">Pending Repairs</div>
                      <div className="text-blue-600">{issues.length} items</div>
                    </div>

                    {urgentCount > 0 && (
                      <div className="p-4 bg-red-50 rounded-lg flex items-start gap-2">
                        <AlertCircle className="text-red-600 mt-1" size={20} />
                        <div>
                          <div className="text-red-900">Urgent Issues</div>
                          <div className="text-red-600">{urgentCount} critical</div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service Items</span>
                        <span className="text-gray-900">6 checked</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Detailing</span>
                        <span className="text-gray-900">Completed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Photos</span>
                        <span className="text-gray-900">2 uploaded</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => onNavigate('customer-intake')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Save size={20} />
                Save & Exit
              </button>

              <button
                onClick={() => onNavigate('approval')}
                className="px-6 py-3 bg-[#1A73E8] text-white rounded-lg hover:bg-[#1557B0] flex items-center gap-2"
              >
                Next - Customer Approval
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
