import { Search, Bell } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      {/* Search bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers, vehicles, or job cards..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
          />
        </div>
      </div>

      {/* Right side - Notifications & Profile */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <div className="text-gray-900">John Smith</div>
            <div className="text-gray-500 text-sm">Admin</div>
          </div>
          <div className="w-10 h-10 bg-[#1A73E8] rounded-full flex items-center justify-center text-white">
            JS
          </div>
        </div>
      </div>
    </div>
  );
}
