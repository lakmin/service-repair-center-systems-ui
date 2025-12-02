import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor: string;
  iconBg: string;
}

export default function KPICard({ icon: Icon, label, value, iconColor, iconBg }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-gray-600 mb-2">{label}</div>
          <div className="text-gray-900">{value}</div>
        </div>
        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  );
}
