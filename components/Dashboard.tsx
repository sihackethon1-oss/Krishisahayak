
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Droplets, Thermometer, Wind, Beaker, MapPin, Calendar, TrendingUp } from 'lucide-react';

const mockHistoricalData = [
  { day: 'Mon', moisture: 35, temp: 28 },
  { day: 'Tue', moisture: 32, temp: 29 },
  { day: 'Wed', moisture: 45, temp: 26 },
  { day: 'Thu', moisture: 40, temp: 27 },
  { day: 'Fri', moisture: 38, temp: 30 },
  { day: 'Sat', moisture: 30, temp: 31 },
  { day: 'Sun', moisture: 25, temp: 32 },
];

const mockNPK = [
  { name: 'N', value: 45, full: 100 },
  { name: 'P', value: 30, full: 100 },
  { name: 'K', value: 65, full: 100 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Field Overview</h2>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />
            <span>Plot 42B • Nashik District, Maharashtra</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <Calendar className="w-5 h-5 text-green-600" />
          <span className="font-medium text-gray-700">Oct 24, 2024</span>
        </div>
      </header>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Droplets} label="Soil Moisture" value="34%" color="blue" trend="-5%" />
        <StatCard icon={Thermometer} label="Ambient Temp" value="31°C" color="orange" trend="+2%" />
        <StatCard icon={Wind} label="Humidity" value="62%" color="cyan" trend="+1%" />
        <StatCard icon={Beaker} label="Soil pH" value="6.8" color="purple" trend="Stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Moisture vs Temperature</h3>
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider">
              <span className="flex items-center gap-1 text-blue-500"><div className="w-3 h-3 bg-blue-500 rounded-full" /> Moisture</span>
              <span className="flex items-center gap-1 text-orange-500"><div className="w-3 h-3 bg-orange-500 rounded-full" /> Temp</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockHistoricalData}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMoisture)" />
                <Area type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NPK Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Soil Nutrients (NPK)</h3>
          <div className="flex-1 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockNPK} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={30} tick={{fontWeight: 'bold'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {mockNPK.map((entry, index) => (
                    <circle key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#f59e0b'} />
                  ))}
                  {/* Recharts Bar mapping colors doesn't work well with simpler syntax in this build, using conditional class instead for basic bar color */}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-4 mt-4">
              <NutrientProgress label="Nitrogen (N)" value={45} color="bg-emerald-500" />
              <NutrientProgress label="Phosphorus (P)" value={30} color="bg-blue-500" />
              <NutrientProgress label="Potassium (K)" value={65} color="bg-amber-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions / Alerts */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h4 className="font-bold text-green-900">Crop Health Recommendation</h4>
            <p className="text-sm text-green-700">Nitrogen levels are slightly low for Wheat. Consider top-dressing with Urea in the next irrigation cycle.</p>
          </div>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-colors whitespace-nowrap">
          View Detailed Guide
        </button>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: any, label: string, value: string, color: string, trend: string }> = ({ icon: Icon, label, value, color, trend }) => {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-100',
    orange: 'text-orange-600 bg-orange-100',
    cyan: 'text-cyan-600 bg-cyan-100',
    purple: 'text-purple-600 bg-purple-100',
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-green-200 group">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : trend.startsWith('-') ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
          {trend}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

const NutrientProgress: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5 uppercase">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default Dashboard;
