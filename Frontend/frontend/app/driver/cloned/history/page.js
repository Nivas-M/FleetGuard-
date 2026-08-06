'use client';

import { useState } from 'react';
import RoleHeader from '../../../cloned/components/RoleHeader';

const DRIVER_LINKS = [
  { label: 'Dashboard', href: '/driver/cloned' },
  { label: 'Pre-Trip Inspection', href: '/driver/cloned/checklist' },
  { label: 'Checklist History', href: '/driver/cloned/history' },
  { label: 'My Vehicle', href: '/driver/cloned/vehicle' },
  { label: 'Notifications', href: '/driver/cloned/notifications' },
];

const INITIAL_HISTORY = [
  { id: 'ch-1', date: '2026-08-05 07:45 AM', status: 'Passed', verified: 5, notes: 'All systems green. Ready for interstate route.' },
  { id: 'ch-2', date: '2026-08-04 08:00 AM', status: 'Passed', verified: 5, notes: 'Tire pressure verified at 110 PSI.' },
  { id: 'ch-3', date: '2026-08-03 07:30 AM', status: 'Passed', verified: 5, notes: 'Oil level optimal.' },
  { id: 'ch-4', date: '2026-08-02 08:15 AM', status: 'Passed', verified: 5, notes: 'Clean pre-trip inspection.' },
];

export default function DriverChecklistHistoryPage() {
  const [history] = useState(INITIAL_HISTORY);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Driver Portal" roleBadge="Checklist History" links={DRIVER_LINKS} activeLink="/driver/cloned/history" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Pre-Trip Inspection History</h1>
          <p className="text-xs text-slate-600 mt-0.5">Past submissions with verified timestamps ("supports accountability, low overhead").</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900">Completed Inspections Timeline</h2>
            <span className="text-xs font-bold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
              {history.length} Logs
            </span>
          </div>

          <div className="space-y-3">
            {history.map((log) => (
              <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md text-[11px]">
                      ✓ {log.status} ({log.verified}/5)
                    </span>
                    <span className="font-semibold text-slate-500">{log.date}</span>
                  </div>
                  <p className="text-slate-600 font-medium">{log.notes}</p>
                </div>
                <span className="text-[11px] font-bold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-xl border border-[#A6E3E9]/40 shrink-0">
                  Digitally Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
