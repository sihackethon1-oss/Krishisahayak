
import React from 'react';
import { Users, Server, Megaphone, Map, CheckCircle, XCircle, MoreVertical, Search } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Rahul Patil', location: 'Sangli', status: 'Approved', joined: '20 Oct 2024' },
  { id: 2, name: 'Sunita Deshmukh', location: 'Solapur', status: 'Pending', joined: '22 Oct 2024' },
  { id: 3, name: 'Amol Kulkarni', location: 'Satara', status: 'Approved', joined: '15 Oct 2024' },
];

const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <header>
        <h2 className="text-3xl font-bold text-gray-800">Control Center</h2>
        <p className="text-gray-500 mt-1">Manage platform users, IoT infrastructure, and regional data.</p>
      </header>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStat icon={Users} label="Active Farmers" value="12,408" color="bg-blue-500" />
        <AdminStat icon={Server} label="IoT Nodes" value="482" color="bg-purple-500" />
        <AdminStat icon={Megaphone} label="Active Campaigns" value="14" color="bg-orange-500" />
        <AdminStat icon={Map} label="Region Coverage" value="84%" color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* User Management */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Farmer Registrations</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs font-bold uppercase">
                <tr>
                  <th className="px-6 py-3">Farmer Name</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.location}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {user.status === 'Pending' && (
                          <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle className="w-5 h-5" /></button>
                        )}
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><XCircle className="w-5 h-5" /></button>
                        <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><MoreVertical className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Campaign Management */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Active Government Schemes</h3>
          <div className="space-y-4">
            <CampaignItem title="PM-Kisan Samman Nidhi" reach="94% Farmers" type="Direct Benefit" status="Active" />
            <CampaignItem title="Subsidized Fertilizer Drive" reach="Maharashtra Wide" type="Supply Chain" status="Ending Soon" />
            <CampaignItem title="Solar Pump Distribution 2024" reach="Regional (Vidarbha)" type="Equipment" status="New" />
          </div>
          <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-medium hover:border-green-300 hover:text-green-600 transition-all">
            + Create New Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminStat: React.FC<{ icon: any, label: string, value: string, color: string }> = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6" />
    </div>
    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const CampaignItem: React.FC<{ title: string, reach: string, type: string, status: string }> = ({ title, reach, type, status }) => (
  <div className="p-4 rounded-2xl border border-gray-100 hover:border-green-200 transition-all flex justify-between items-center group">
    <div>
      <h4 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">{title}</h4>
      <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
        <span>{type}</span> • <span className="text-green-600 font-medium">{reach}</span>
      </p>
    </div>
    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
      status === 'Active' ? 'bg-green-100 text-green-700' : 
      status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
    }`}>
      {status}
    </span>
  </div>
);

export default AdminPanel;
