'use client';

import { useState } from 'react';
import RoleHeader from '../../../cloned/components/RoleHeader';

const SERVICECENTER_LINKS = [
  { label: 'Dashboard', href: '/servicecenter/cloned' },
  { label: 'Service Queue', href: '/servicecenter/cloned/queue' },
  { label: 'Log Service', href: '/servicecenter/cloned/log-service' },
  { label: 'Vehicle Service History', href: '/servicecenter/cloned/history' },
  { label: 'Historical Entry', href: '/servicecenter/cloned/historical-entry' },
  { label: 'Predictive Detail', href: '/servicecenter/cloned/predictive-detail' },
];

const PREDICTIVE_ITEMS = [
  { plate: 'TN-09-AB-1234', name: 'Heavy Hauler Alpha', risk: 'High Risk', ratio: '101.2%', currentKm: 121500, intervalKm: 120000, reason: 'Current mileage exceeds manufacturer recommended overhaul interval by 1,500 km.' },
  { plate: 'TN-37-EF-9012', name: 'LogiTrans Gamma', risk: 'High Risk', ratio: '99.7%', currentKm: 94800, intervalKm: 95000, reason: 'High load factor + differential oil degradation threshold reached.' },
  { plate: 'TN-14-CD-5678', name: 'Cargo Express Beta', risk: 'Medium Risk', ratio: '95.5%', currentKm: 81200, intervalKm: 85000, reason: 'Approaching 85,000 km air filter replacement threshold.' },
  { plate: 'TN-11-IJ-7890', name: 'Coastal Transport Epsilon', risk: 'Medium Risk', ratio: '97.0%', currentKm: 67900, intervalKm: 70000, reason: 'Transmission fluid service due within 2,100 km.' },
];

export default function PredictiveMaintenanceDetailPage() {
  const [items] = useState(PREDICTIVE_ITEMS);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Service Center" roleBadge="Predictive Risk Detail" links={SERVICECENTER_LINKS} activeLink="/servicecenter/cloned/predictive-detail" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Predictive Maintenance Risk Breakdown</h1>
          <p className="text-xs text-slate-600 mt-0.5">Detailed breakdown explaining why vehicles are flagged (mileage vs. manufacturer interval ratio).</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900">Risk Algorithm Breakdown & Wear Metrics</h2>
            <span className="text-xs font-bold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
              {items.length} Flagged Vehicles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm font-mono">{item.plate}</span>
                    <div className="text-[11px] text-slate-500 font-semibold">{item.name}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                    item.risk === 'High Risk' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {item.risk} ({item.ratio})
                  </span>
                </div>

                <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200/80 text-slate-700">
                  <div className="flex justify-between font-semibold">
                    <span>Recorded Odometer:</span>
                    <span className="font-bold text-slate-900">{item.currentKm.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Manufacturer Interval Target:</span>
                    <span className="font-bold text-slate-900">{item.intervalKm.toLocaleString()} km</span>
                  </div>
                </div>

                <p className="text-slate-600 font-medium leading-relaxed italic bg-[#E3FDFD]/50 p-2.5 rounded-xl border border-[#A6E3E9]/30">
                  "{item.reason}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
