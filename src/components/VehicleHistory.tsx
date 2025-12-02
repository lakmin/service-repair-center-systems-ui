import { useState } from 'react';
import { Filter, Calendar, Wrench, Sparkles, Settings, Image, FileText } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface VehicleHistoryProps {
  onNavigate: (view: any) => void;
}

export default function VehicleHistory({ onNavigate }: VehicleHistoryProps) {
  const [filterType, setFilterType] = useState<string>('all');

  const historyEvents = [
    {
      id: 1,
      date: 'November 25, 2024',
      type: 'service',
      title: 'Full Service + Detailing',
      items: [
        'Engine Oil Change',
        'Oil Filter Replacement',
        'Air Filter Replacement',
        'Brake Fluid Top-up',
        'Gold Detailing Package',
      ],
      repairs: [
        { item: 'Brake Pads Replacement (Front)', status: 'completed' },
        { item: 'AC Filter Replacement', status: 'pending' },
      ],
      technician: 'Mike Ross',
      photos: 4,
      notes: 'Customer requested premium oil. All work completed as per job card.',
      cost: 455,
    },
    {
      id: 2,
      date: 'September 15, 2024',
      type: 'detailing',
      title: 'Ceramic Coating',
      items: [
        'Full exterior wash',
        'Paint correction',
        'Swirl removal',
        'Ceramic coating application',
      ],
      repairs: [],
      technician: 'Sarah Lee',
      photos: 8,
      notes: 'Applied 5-year ceramic coating. Customer very satisfied with results.',
      cost: 650,
    },
    {
      id: 3,
      date: 'July 10, 2024',
      type: 'repairs',
      title: 'AC System Repair',
      items: [
        'AC system diagnosis',
        'Compressor replacement',
        'System recharge',
      ],
      repairs: [
        { item: 'AC Compressor Replacement', status: 'completed' },
        { item: 'AC Gas Refill', status: 'completed' },
      ],
      technician: 'John Davis',
      photos: 2,
      notes: 'Compressor was faulty. Replaced with OEM part. System cooling normally.',
      cost: 890,
    },
    {
      id: 4,
      date: 'May 5, 2024',
      type: 'service',
      title: 'Regular Service',
      items: [
        'Engine Oil Change',
        'Oil Filter Replacement',
        'Multi-point inspection',
      ],
      repairs: [
        { item: 'Wiper blades replacement', status: 'completed' },
      ],
      technician: 'Mike Ross',
      photos: 0,
      notes: 'Routine service. All systems functioning normally.',
      cost: 125,
    },
  ];

  const filteredEvents = filterType === 'all' 
    ? historyEvents 
    : historyEvents.filter(event => event.type === filterType);

  const pendingRepairs = historyEvents
    .flatMap(event => event.repairs.filter(r => r.status === 'pending'));

  const getIcon = (type: string) => {
    switch (type) {
      case 'service': return Wrench;
      case 'detailing': return Sparkles;
      case 'repairs': return Settings;
      default: return Wrench;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-blue-100 text-blue-700';
      case 'detailing': return 'bg-purple-100 text-purple-700';
      case 'repairs': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar currentView="history" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Vehicle History</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span>Toyota Camry 2021</span>
                <span>•</span>
                <span>REG: ABC-1234</span>
                <span>•</span>
                <span>Customer: Sarah Johnson</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Main Timeline */}
              <div className="col-span-2">
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-600" />
                    <span className="text-gray-700 mr-4">Filter by:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFilterType('all')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          filterType === 'all'
                            ? 'bg-[#1A73E8] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilterType('service')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          filterType === 'service'
                            ? 'bg-[#1A73E8] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Services
                      </button>
                      <button
                        onClick={() => setFilterType('detailing')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          filterType === 'detailing'
                            ? 'bg-[#1A73E8] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Detailing
                      </button>
                      <button
                        onClick={() => setFilterType('repairs')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          filterType === 'repairs'
                            ? 'bg-[#1A73E8] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Repairs
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timeline Events */}
                <div className="space-y-6">
                  {filteredEvents.map((event, idx) => {
                    const Icon = getIcon(event.type);
                    
                    return (
                      <div key={event.id} className="relative">
                        {/* Timeline line */}
                        {idx < filteredEvents.length - 1 && (
                          <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200"></div>
                        )}
                        
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(event.type)}`}>
                              <Icon size={24} />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-gray-900 mb-1">{event.title}</h3>
                                  <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <Calendar size={14} />
                                      {event.date}
                                    </div>
                                    <span>•</span>
                                    <span>Technician: {event.technician}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-gray-900">${event.cost}</div>
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${getTypeColor(event.type)}`}>
                                    {event.type}
                                  </span>
                                </div>
                              </div>

                              {/* Items Completed */}
                              <div className="mb-3">
                                <div className="text-gray-700 mb-2">Items Completed:</div>
                                <ul className="space-y-1">
                                  {event.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-center gap-2 text-gray-600 text-sm">
                                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Repairs */}
                              {event.repairs.length > 0 && (
                                <div className="mb-3">
                                  <div className="text-gray-700 mb-2">Repairs:</div>
                                  <div className="space-y-1">
                                    {event.repairs.map((repair, repairIdx) => (
                                      <div key={repairIdx} className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                          repair.status === 'completed' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-red-100 text-red-700'
                                        }`}>
                                          {repair.item}
                                        </span>
                                        {repair.status === 'pending' && (
                                          <span className="text-xs text-red-600">(Pending)</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Photos */}
                              {event.photos > 0 && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                  <Image size={16} />
                                  <span>{event.photos} photos attached</span>
                                </div>
                              )}

                              {/* Notes */}
                              {event.notes && (
                                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                                  <FileText size={16} className="text-gray-600 flex-shrink-0 mt-0.5" />
                                  <div className="text-sm text-gray-700">{event.notes}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Sidebar - Summary */}
              <div className="space-y-6">
                {/* Stats */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-gray-900 mb-4">Service Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Visits</span>
                      <span className="text-gray-900">{historyEvents.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Services</span>
                      <span className="text-gray-900">
                        {historyEvents.filter(e => e.type === 'service').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Detailing</span>
                      <span className="text-gray-900">
                        {historyEvents.filter(e => e.type === 'detailing').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Repairs</span>
                      <span className="text-gray-900">
                        {historyEvents.filter(e => e.type === 'repairs').length}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-gray-200 flex justify-between">
                      <span className="text-gray-900">Total Spent</span>
                      <span className="text-gray-900">
                        ${historyEvents.reduce((sum, e) => sum + e.cost, 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pending Repairs */}
                {pendingRepairs.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-red-900 mb-4">Pending Repairs</h3>
                    <div className="space-y-2">
                      {pendingRepairs.map((repair, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                          <span className="text-red-700 text-sm">{repair.item}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => onNavigate('customer-intake')}
                      className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Schedule Repair
                    </button>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => onNavigate('customer-intake')}
                      className="w-full px-4 py-3 bg-[#1A73E8] text-white rounded-lg hover:bg-[#1557B0]"
                    >
                      New Booking
                    </button>
                    <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Export History
                    </button>
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Back to Dashboard
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