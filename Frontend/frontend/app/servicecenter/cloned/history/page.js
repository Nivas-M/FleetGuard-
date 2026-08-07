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

const INITIAL_HISTORY = [
  { id: 'sh-1', plate: 'TN-05-KL-2345', name: 'Southern Logistics Zeta', serviceType: '50,000 km Major Overhaul', odometer: 50120, date: '2026-08-06 11:20 AM', status: 'Clock Reset (+15,000 km)', mechanic: 'Master Tech Vikram' },
  { id: 'sh-2', plate: 'TN-22-XY-9988', name: 'Express Cargo 09', serviceType: 'Preventive Safety Inspection', odometer: 64200, date: '2026-08-05 03:45 PM', status: 'Clock Reset (+10,000 km)', mechanic: 'Tech Ramesh' },
  { id: 'sh-3', plate: 'TN-01-GH-3456', name: 'Metro Hauler Delta', serviceType: 'Brake Liner & Fluid Flush', odometer: 32000, date: '2026-07-20 09:15 AM', status: 'Clock Reset (+15,000 km)', mechanic: 'Master Tech Vikram' },
];

export default function VehicleServiceHistoryPage() {
  const [history] = useState(INITIAL_HISTORY);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Service Center" roleBadge="Vehicle Service History" links={SERVICECENTER_LINKS} activeLink="/servicecenter/cloned/history" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Vehicle Service History Timeline</h1>
          <p className="text-xs text-slate-600 mt-0.5">Full historical timeline per vehicle including digital logs and manually entered paper records.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900">Completed Service Records</h2>
            <span className="text-xs font-bold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
              {history.length} Master Logs
            </span>
          </div>

          <div className="space-y-3">
            {history.map((sh) => (
              <div key={sh.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-slate-900 font-mono">{sh.plate}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-800">{sh.name}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md text-[11px]">
                      ✓ {sh.status}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">{sh.serviceType} • Technician: {sh.mechanic}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-900 block">{sh.odometer.toLocaleString()} km</span>
                  <span className="text-[11px] text-slate-500 font-semibold">{sh.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
