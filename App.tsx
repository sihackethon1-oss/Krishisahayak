
import React, { useState } from 'react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import CropDoctor from './components/CropDoctor';
import MarketRates from './components/MarketRates';
import VoiceAssistant from './components/VoiceAssistant';
import AdminPanel from './components/AdminPanel';
import { Layout, Menu, Activity, ShieldCheck, TrendingUp, Mic, Settings, LogOut, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isAdmin, setIsAdmin] = useState(false);

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Farm Health', icon: Activity },
    { id: AppView.CROP_DOCTOR, label: 'Crop Doctor', icon: ShieldCheck },
    { id: AppView.MARKET_RATES, label: 'Market Rates', icon: TrendingUp },
    { id: AppView.VOICE_ASSISTANT, label: 'AI Assistant', icon: Mic },
  ];

  if (isAdmin) {
    navItems.push({ id: AppView.ADMIN, label: 'Admin Panel', icon: Settings });
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.CROP_DOCTOR: return <CropDoctor />;
      case AppView.MARKET_RATES: return <MarketRates />;
      case AppView.VOICE_ASSISTANT: return <VoiceAssistant />;
      case AppView.ADMIN: return <AdminPanel />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-green-700 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Activity className="w-6 h-6" />
          KrishiSahayak
        </h1>
        <button onClick={() => setIsAdmin(!isAdmin)} className="text-xs bg-green-600 px-2 py-1 rounded">
          {isAdmin ? 'Admin' : 'Farmer'}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-green-800 text-white min-h-screen p-6 sticky top-0">
        <div className="mb-10 flex items-center gap-3">
          <Activity className="w-8 h-8 text-green-400" />
          <h1 className="text-2xl font-bold tracking-tight">KrishiSahayak</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.id ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-green-700">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold">
              SJ
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-medium truncate">Sanjay J.</p>
              <p className="text-xs text-green-300">Nashik, MH</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="w-full mt-4 flex items-center justify-center gap-2 text-xs text-green-200 hover:text-white"
          >
            Switch to {isAdmin ? 'Farmer' : 'Admin'} Mode
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
              currentView === item.id ? 'text-green-700' : 'text-gray-500'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
