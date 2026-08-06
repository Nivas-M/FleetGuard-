'use client';

import { useState } from 'react';
import Navbar from '../../components/navbar';

const SHARED_NOTIFS = [
  { id: 'sn-1', title: 'Critical Safety Inspection Overdue', target: 'TN-09-AB-1234', message: 'Annual RTO inspection lapsed. Hard driver assignment block enforced.', time: '10 mins ago', level: 'Danger' },
  { id: 'sn-2', title: 'Override Approved by Admin', target: 'TN-37-EF-9012', message: 'Admin sign-off granted for driver assignment override.', time: '1 hour ago', level: 'Success' },
  { id: 'sn-3', title: 'Upcoming Insurance Renewal', target: 'TN-14-CD-5678', message: 'Policy renewal due in 4 days.', time: '3 hours ago', level: 'Warning' },
];

export default function GlobalNotificationCenterPage() {
  const [notifications, setNotifications] = useState(SHARED_NOTIFS);

  const clearAll = () => setNotifications([]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Notification Center</h1>
            <p className="text-xs text-slate-600 mt-0.5">In-app notification center for urgent alerts across all roles.</p>
          </div>
          {notifications.length > 0 && (
            <button onClick={clearAll} className="text-xs font-bold text-slate-500 hover:text-slate-900">
              Clear All Alerts
            </button>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
          {notifications.length === 0 ? (
            <p className="text-slate-500 py-6 text-center font-medium">All notifications cleared.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                n.level === 'Danger' ? 'bg-rose-50 border-rose-200 text-rose-900' : n.level === 'Warning' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="space-y-0.5">
                  <div className="font-extrabold text-sm">{n.title} ({n.target})</div>
                  <p className="font-medium opacity-90">{n.message}</p>
                </div>
                <span className="text-[11px] font-semibold opacity-70 shrink-0">{n.time}</span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
