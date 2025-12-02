import { Car, Wrench, CheckCircle, Bell, MoreVertical } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import KPICard from './KPICard';

interface DashboardProps {
  onNavigate: (view: any) => void;
}

const mockBookings = [
  {
    id: 1,
    customer: 'Sarah Johnson',
    vehicle: 'Toyota Camry 2021',
    serviceType: 'Full Service',
    technician: 'Mike Ross',
    status: 'In Progress',
    statusColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 2,
    customer: 'David Chen',
    vehicle: 'Honda Accord 2020',
    serviceType: 'Oil Change',
    technician: 'John Davis',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: 3,
    customer: 'Emma Wilson',
    vehicle: 'BMW X5 2022',
    serviceType: 'Detailing + Service',
    technician: 'Mike Ross',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: 4,
    customer: 'James Brown',
    vehicle: 'Mercedes C-Class 2019',
    serviceType: 'Brake Repair',
    technician: 'Sarah Lee',
    status: 'In Progress',
    statusColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 5,
    customer: 'Lisa Anderson',
    vehicle: 'Audi A4 2021',
    serviceType: 'AC Service',
    technician: 'John Davis',
    status: 'QC',
    statusColor: 'bg-purple-100 text-purple-700'
  },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="flex h-screen">
      <Sidebar currentView="dashboard" onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-auto p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <KPICard
              icon={Car}
              label="Vehicles Today"
              value="24"
              iconColor="text-blue-600"
              iconBg="bg-blue-100"
            />
            <KPICard
              icon={Wrench}
              label="Pending Repairs"
              value="8"
              iconColor="text-orange-600"
              iconBg="bg-orange-100"
            />
            <KPICard
              icon={CheckCircle}
              label="Completed Jobs"
              value="15"
              iconColor="text-green-600"
              iconBg="bg-green-100"
            />
            <KPICard
              icon={Bell}
              label="Upcoming Reminders"
              value="12"
              iconColor="text-purple-600"
              iconBg="bg-purple-100"
            />
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-gray-900">Recent Bookings</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-700">Customer</th>
                    <th className="text-left px-6 py-4 text-gray-700">Vehicle</th>
                    <th className="text-left px-6 py-4 text-gray-700">Service Type</th>
                    <th className="text-left px-6 py-4 text-gray-700">Technician</th>
                    <th className="text-left px-6 py-4 text-gray-700">Status</th>
                    <th className="text-left px-6 py-4 text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{booking.customer}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">{booking.vehicle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">{booking.serviceType}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700">{booking.technician}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${booking.statusColor}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => onNavigate('job-card')}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical size={18} className="text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
