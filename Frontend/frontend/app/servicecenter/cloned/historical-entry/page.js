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

export default function WorkshopHistoricalEntryPage() {
  const [form, setForm] = useState({ plate: '', date: '', odometer: '', serviceAction: '', notes: '' });
  const [notice, setNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotice(true);
    setTimeout(() => setNotice(false), 4000);
    setForm({ plate: '', date: '', odometer: '', serviceAction: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Service Center" roleBadge="Historical Paper Entry" links={SERVICECENTER_LINKS} activeLink="/servicecenter/cloned/historical-entry" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Historical Paper Record Entry</h1>
          <p className="text-xs text-slate-600 mt-0.5">Shared manual-entry path for service center technicians to digitize older paper service logs.</p>
        </div>

        {notice && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-extrabold text-xs border border-emerald-200">
            ✓ Historical paper service log digitized and recorded into database!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Vehicle Registration Plate *</label>
            <input
              type="text"
              required
              placeholder="e.g. TN-14-CD-5678"
              value={form.plate}
              onChange={(e) => setForm({ ...form, plate: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-mono text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Historical Service Date *</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Odometer Reading (km) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 62000"
                value={form.odometer}
                onChange={(e) => setForm({ ...form, odometer: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Paper Receipt & Work Order Notes</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Enter paper receipt receipt details, workshop stamp, replaced components..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm transition-all cursor-pointer"
          >
            Save Paper Record
          </button>
        </form>
      </main>
    </div>
  );
}
