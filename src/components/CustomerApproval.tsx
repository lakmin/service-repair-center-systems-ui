import { useState } from 'react';
import { Download, Check } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface CustomerApprovalProps {
  onNavigate: (view: any) => void;
}

export default function CustomerApproval({ onNavigate }: CustomerApprovalProps) {
  const [selectedPackage, setSelectedPackage] = useState('gold');
  const [repairDecisions, setRepairDecisions] = useState({
    1: 'approve',
    2: 'approve',
  });

  const mechanicalServices = [
    { id: 1, name: 'Engine Oil Change', checked: true, price: 45 },
    { id: 2, name: 'Oil Filter Replacement', checked: true, price: 15 },
    { id: 3, name: 'Air Filter Replacement', checked: true, price: 25 },
    { id: 4, name: 'Brake Fluid Top-up', checked: true, price: 20 },
    { id: 5, name: 'Coolant Check', checked: true, price: 0 },
    { id: 6, name: 'Tire Pressure Check', checked: true, price: 0 },
  ];

  const detailingPackages = [
    { id: 'silver', name: 'Silver Package', price: 80, features: ['Exterior wash', 'Vacuum', 'Tire shine'] },
    { id: 'gold', name: 'Gold Package', price: 150, features: ['Everything in Silver', 'Interior detailing', 'Dashboard polish', 'Glass cleaning'] },
    { id: 'ceramic', name: 'Ceramic Coating', price: 500, features: ['Everything in Gold', 'Ceramic coating', 'Paint correction', 'Swirl removal'] },
  ];

  const repairs = [
    { id: 1, issue: 'Brake pads worn - Front axle', severity: 'high', parts: 120, labour: 80 },
    { id: 2, issue: 'AC filter replacement', severity: 'medium', parts: 35, labour: 25 },
  ];

  const mechanicalTotal = mechanicalServices.reduce((sum, s) => s.checked ? sum + s.price : sum, 0);
  const detailingTotal = detailingPackages.find(p => p.id === selectedPackage)?.price || 0;
  const repairsTotal = repairs
    .filter(r => repairDecisions[r.id as keyof typeof repairDecisions] === 'approve')
    .reduce((sum, r) => sum + r.parts + r.labour, 0);
  const subtotal = mechanicalTotal + detailingTotal + repairsTotal;
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  return (
    <div className="flex h-screen">
      <Sidebar currentView="approval" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Customer Approval</h1>
              <p className="text-gray-600">Review and approve services - Toyota Camry 2021</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Services */}
              <div className="col-span-2 space-y-6">
                {/* Mechanical Services */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-gray-900 mb-6">Mechanical Services</h2>
                  <div className="space-y-3">
                    {mechanicalServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={service.checked}
                            readOnly
                            className="w-5 h-5 text-[#1A73E8] rounded focus:ring-[#1A73E8]"
                          />
                          <span className="text-gray-900">{service.name}</span>
                        </div>
                        <span className="text-gray-700">
                          {service.price > 0 ? `$${service.price}` : 'Included'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailing Packages */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-gray-900 mb-6">Detailing Packages</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {detailingPackages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedPackage === pkg.id
                            ? 'border-[#1A73E8] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-gray-900">{pkg.name}</h3>
                          {selectedPackage === pkg.id && (
                            <Check size={20} className="text-[#1A73E8]" />
                          )}
                        </div>
                        <div className="text-[#1A73E8] mb-3">${pkg.price}</div>
                        <ul className="space-y-1 text-sm text-gray-600">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Repairs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-gray-900 mb-6">Recommended Repairs</h2>
                  <div className="space-y-4">
                    {repairs.map((repair) => (
                      <div key={repair.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="text-gray-900 mb-2">{repair.issue}</div>
                            <div className="flex gap-4 text-sm text-gray-600">
                              <span>Parts: ${repair.parts}</span>
                              <span>Labour: ${repair.labour}</span>
                              <span className={`px-2 py-1 rounded-full ${
                                repair.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                                {repair.severity.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="text-gray-900">
                            ${repair.parts + repair.labour}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setRepairDecisions({ ...repairDecisions, [repair.id]: 'approve' })}
                            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                              repairDecisions[repair.id as keyof typeof repairDecisions] === 'approve'
                                ? 'bg-green-100 text-green-700'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRepairDecisions({ ...repairDecisions, [repair.id]: 'postpone' })}
                            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                              repairDecisions[repair.id as keyof typeof repairDecisions] === 'postpone'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            Postpone
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Cost Summary */}
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
                  <h3 className="text-gray-900 mb-6">Cost Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Mechanical Services</span>
                        <span className="text-gray-900">${mechanicalTotal}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Detailing Package</span>
                        <span className="text-gray-900">${detailingTotal}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Approved Repairs</span>
                        <span className="text-gray-900">${repairsTotal}</span>
                      </div>
                    </div>

                    <div className="pb-4 border-b border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">${subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (15%)</span>
                        <span className="text-gray-900">${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${total.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => onNavigate('job-card')}
                      className="w-full py-3 bg-[#1A73E8] text-white rounded-lg hover:bg-[#1557B0] mt-6"
                    >
                      Approve Job Card
                    </button>

                    <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                      <Download size={20} />
                      Download Estimate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
