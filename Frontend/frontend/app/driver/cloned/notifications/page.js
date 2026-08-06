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

const INITIAL_NOTIFS = [
  { id: 'dn-1', title: 'Annual Safety Inspection Expiry', message: 'Annual RTO Inspection on TN-09-AB-1234 expires in 9 days. Fleet Manager has booked renewal slot.', date: '2026-08-06', type: 'Warning' },
  { id: 'dn-2', title: 'Route Schedule Assigned', message: 'Assigned for Chennai to Salem interstate haulage starting tomorrow at 06:00 AM.', date: '2026-08-05', type: 'Info' },
];

export default function DriverNotificationsPage() {
  const [notifs] = useState(INITIAL_NOTIFS);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Driver Portal" roleBadge="Vehicle Alerts & Notifications" links={DRIVER_LINKS} activeLink="/driver/cloned/notifications" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Vehicle Alerts & Notifications</h1>
          <p className="text-xs text-slate-600 mt-0.5">Alerts specific to the driver's assigned vehicle ("know before taking it out").</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900">Notifications Feed</h2>
            <span className="text-xs font-bold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
              {notifs.length} Alerts
            </span>
          </div>

          <div className="space-y-3">
            {notifs.map((n) => (
              <div key={n.id} className={`p-4 rounded-2xl border text-xs flex items-start justify-between gap-3 ${
                n.type === 'Warning' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <div className="space-y-1">
                  <div className="font-extrabold text-slate-900">{n.title}</div>
                  <p className="font-medium text-slate-700">{n.message}</p>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 shrink-0">{n.date}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
