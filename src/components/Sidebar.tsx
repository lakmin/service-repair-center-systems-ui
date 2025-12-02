import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardCheck, 
  Wrench, 
  Sparkles, 
  Settings as SettingsIcon, 
  Receipt, 
  History, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
    { icon: Calendar, label: 'Bookings', view: 'customer-intake' },
    { icon: ClipboardCheck, label: 'Inspection', view: 'inspection' },
    { icon: Wrench, label: 'Service', view: 'service-workflow' },
    { icon: Sparkles, label: 'Detailing', view: 'detailing-workflow' },
    { icon: SettingsIcon, label: 'Repairs', view: 'job-card' },
    { icon: Receipt, label: 'Billing', view: 'billing' },
    { icon: History, label: 'History', view: 'history' },
    { icon: Settings, label: 'Settings', view: 'dashboard' },
  ];

  return (
    <div className="w-60 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1A73E8] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-gray-900">ServicePro</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            
            return (
              <li key={item.view}>
                <button
                  onClick={() => onNavigate(item.view)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#1A73E8] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}