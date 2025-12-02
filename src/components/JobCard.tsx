import { useState } from 'react';
import { Check, Circle } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface JobCardProps {
  onNavigate: (view: any) => void;
}

export default function JobCard({ onNavigate }: JobCardProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: 'Inspection', status: 'completed' },
    { id: 2, label: 'Service', status: 'active' },
    { id: 3, label: 'Detailing', status: 'pending' },
    { id: 4, label: 'QC', status: 'pending' },
    { id: 5, label: 'Ready', status: 'pending' },
  ];

  const approvedServices = [
    'Engine Oil Change',
    'Oil Filter Replacement',
    'Air Filter Replacement',
    'Brake Fluid Top-up',
    'Gold Detailing Package',
  ];

  const approvedRepairs = [
    'Brake pads worn - Front axle',
  ];

  const pendingRepairs = [
    'AC filter replacement',
  ];

  return (
    <div className="flex h-screen">
      <Sidebar currentView="job-card" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Job Card</h1>
              <p className="text-gray-600">Job Card #JC-2024-00156</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="col-span-2 space-y-6">
                {/* Customer & Vehicle Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-gray-900 mb-4">Customer & Vehicle Information</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-gray-600 mb-1">Customer Name</div>
                      <div className="text-gray-900">Sarah Johnson</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Phone</div>
                      <div className="text-gray-900">+1 (555) 123-4567</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Vehicle</div>
                      <div className="text-gray-900">Toyota Camry 2021</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Registration</div>
                      <div className="text-gray-900">ABC-1234</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Mileage</div>
                      <div className="text-gray-900">45,230 km</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Date</div>
                      <div className="text-gray-900">Nov 25, 2024</div>
                    </div>
                  </div>
                </div>

                {/* Approved Services */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-gray-900 mb-4">Approved Services</h2>
                  <ul className="space-y-2">
                    {approvedServices.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-[#1A73E8] rounded-full"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Repairs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-gray-900 mb-4">Repairs</h2>
                  
                  <div className="mb-4">
                    <h3 className="text-gray-700 mb-2">Approved Repairs</h3>
                    <div className="space-y-2">
                      {approvedRepairs.map((repair, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            {repair}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-gray-700 mb-2">Pending Repairs</h3>
                    <div className="space-y-2">
                      {pendingRepairs.map((repair, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                            {repair}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Assignment */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-gray-900 mb-4">Assignment</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Assign Technician</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8]">
                        <option>Mike Ross</option>
                        <option>John Davis</option>
                        <option>Sarah Lee</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Expected Delivery</label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-gray-900 mb-6">Status Timeline</h3>
                  
                  <div className="space-y-4">
                    {steps.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-100' :
                          step.status === 'active' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          {step.status === 'completed' ? (
                            <Check size={20} className="text-green-600" />
                          ) : step.status === 'active' ? (
                            <Circle size={20} className="text-blue-600 fill-blue-600" />
                          ) : (
                            <Circle size={20} className="text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className={`${
                            step.status === 'active' ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {step.label}
                          </div>
                          {step.status === 'completed' && (
                            <div className="text-sm text-gray-500">Completed</div>
                          )}
                          {step.status === 'active' && (
                            <div className="text-sm text-blue-600">In Progress</div>
                          )}
                        </div>
                        
                        {idx < steps.length - 1 && (
                          <div className={`absolute left-5 w-0.5 h-8 mt-10 ${
                            step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                          }`} style={{ marginLeft: '20px' }}></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('service-workflow')}
                    className="w-full mt-6 py-3 bg-[#1A73E8] text-white rounded-lg hover:bg-[#1557B0]"
                  >
                    Start Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
