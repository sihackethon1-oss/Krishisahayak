
import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight, TrendingUp, Info } from 'lucide-react';

const mockRates = [
  { id: 1, commodity: 'Soybean', mandi: 'Latur', district: 'Latur', min: 4200, max: 4850, modal: 4500, trend: 'up' },
  { id: 2, commodity: 'Cotton (Long Staple)', mandi: 'Akola', district: 'Akola', min: 6500, max: 7200, modal: 6800, trend: 'down' },
  { id: 3, commodity: 'Onion (Red)', mandi: 'Lasalgaon', district: 'Nashik', min: 1200, max: 2800, modal: 2400, trend: 'up' },
  { id: 4, commodity: 'Wheat', mandi: 'Nagpur', district: 'Nagpur', min: 2100, max: 2450, modal: 2300, trend: 'stable' },
  { id: 5, commodity: 'Tur (Arhar)', mandi: 'Amravati', district: 'Amravati', min: 8000, max: 9200, modal: 8800, trend: 'up' },
  { id: 6, commodity: 'Sugar Cane', mandi: 'Kolhapur', district: 'Kolhapur', min: 2800, max: 3200, modal: 3000, trend: 'stable' },
];

const MarketRates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRates = mockRates.filter(rate => 
    rate.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.mandi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Mandi Prices</h2>
          <p className="text-gray-500 mt-1">Live market rates from Mandis across Maharashtra (MSAMB)</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2 text-sm text-gray-600">
             <TrendingUp className="w-4 h-4 text-green-600" />
             Average Price: <b>₹4,133/q</b>
           </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search crop or mandi..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors font-medium">
          <Filter className="w-5 h-5" />
          Filter District
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Commodity</th>
              <th className="px-6 py-4">Mandi (Market)</th>
              <th className="px-6 py-4 text-right">Min (₹)</th>
              <th className="px-6 py-4 text-right">Max (₹)</th>
              <th className="px-6 py-4 text-right">Modal (₹)</th>
              <th className="px-6 py-4 text-center">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRates.map((rate) => (
              <tr key={rate.id} className="hover:bg-green-50/30 transition-colors cursor-default">
                <td className="px-6 py-5 font-bold text-gray-800">{rate.commodity}</td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium">{rate.mandi}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{rate.district}</p>
                </td>
                <td className="px-6 py-5 text-right font-medium text-gray-600">₹{rate.min.toLocaleString()}</td>
                <td className="px-6 py-5 text-right font-medium text-gray-600">₹{rate.max.toLocaleString()}</td>
                <td className="px-6 py-5 text-right font-bold text-green-700">₹{rate.modal.toLocaleString()}</td>
                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    {rate.trend === 'up' && <ArrowUpRight className="w-5 h-5 text-green-500" />}
                    {rate.trend === 'down' && <ArrowDownRight className="w-5 h-5 text-red-500" />}
                    {rate.trend === 'stable' && <div className="w-5 h-1 bg-gray-300 rounded-full" />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-100 p-3 rounded-lg">
        <Info className="w-4 h-4" />
        <span>Rates are updated every 2 hours from MSAMB & Agmarknet. Prices are per Quintal (100kg).</span>
      </div>
    </div>
  );
};

export default MarketRates;
