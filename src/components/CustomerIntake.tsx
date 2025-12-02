import { useState } from 'react';
import { ArrowRight, Save, Upload, X } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface CustomerIntakeProps {
  onNavigate: (view: any) => void;
}

export default function CustomerIntake({ onNavigate }: CustomerIntakeProps) {
  const [photos, setPhotos] = useState<{ [key: string]: string | null }>({
    front: null,
    back: null,
    left: null,
    right: null,
  });

  const handlePhotoUpload = (position: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos(prev => ({ ...prev, [position]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const photoPositions = [
    { key: 'front', label: 'Front View' },
    { key: 'back', label: 'Back View' },
    { key: 'left', label: 'Left Side' },
    { key: 'right', label: 'Right Side' },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar currentView="customer-intake" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Customer Intake</h1>
              <p className="text-gray-600">Enter customer and vehicle information</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left & Middle Columns - Form */}
              <div className="col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column - Customer Info */}
                    <div>
                      <h3 className="text-gray-900 mb-6">Customer Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            placeholder="Enter customer name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="Enter phone number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            placeholder="Enter email address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Vehicle Info */}
                    <div>
                      <h3 className="text-gray-900 mb-6">Vehicle Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Registration Number</label>
                          <input
                            type="text"
                            placeholder="Enter registration number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">Mileage</label>
                          <input
                            type="text"
                            placeholder="Enter current mileage"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-2">Make</label>
                            <input
                              type="text"
                              placeholder="e.g. Toyota"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-2">Model</label>
                            <input
                              type="text"
                              placeholder="e.g. Camry"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Photo Upload */}
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-gray-900 mb-6">Vehicle Photos</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {photoPositions.map(({ key, label }) => (
                      <div key={key}>
                        <label className="block text-gray-700 mb-2 text-sm">{label}</label>
                        <div className="relative aspect-square border-2 border-dashed border-[#D0D0D0] rounded-lg overflow-hidden hover:border-[#1A73E8] transition-colors">
                          {photos[key] ? (
                            <>
                              <img
                                src={photos[key]!}
                                alt={label}
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => setPhotos(prev => ({ ...prev, [key]: null }))}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                              >
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <label className="cursor-pointer flex flex-col items-center justify-center h-full">
                              <Upload size={24} className="text-gray-400 mb-2" />
                              <span className="text-gray-500 text-sm">Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePhotoUpload(key, file);
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Save size={20} />
                Save & Exit
              </button>

              <button
                onClick={() => onNavigate('inspection')}
                className="px-6 py-3 bg-[#1A73E8] text-white rounded-lg hover:bg-[#1557B0] flex items-center gap-2"
              >
                Next - Inspection
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
