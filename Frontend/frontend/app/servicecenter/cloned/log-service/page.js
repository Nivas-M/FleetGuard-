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

export default function DedicatedLogServicePage() {
  const [form, setForm] = useState({
    vehiclePlate: 'TN-09-AB-1234',
    serviceCategory: 'Full Preventive Servicing',
    odometer: 121550,
    serviceDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [notice, setNotice] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotice(`Service logged for ${form.vehiclePlate}! Service-due compliance clock automatically reset (+15,000 km target).`);
    setTimeout(() => setNotice(null), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Service Center" roleBadge="Log Service & Clock Reset" links={SERVICECENTER_LINKS} activeLink="/servicecenter/cloned/log-service" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Log Service & Reset Compliance Clock</h1>
          <p className="text-xs text-slate-600 mt-0.5">Completing a service automatically resets the service-due clock ("not require updating three things by hand").</p>
        </div>

        {notice && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-extrabold text-xs border border-emerald-200 shadow-sm">
            ✓ {notice}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Vehicle Plate *</label>
            <input
              type="text"
              required
              value={form.vehiclePlate}
              onChange={(e) => setForm({ ...form, vehiclePlate: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Service Action Category</label>
              <select
                value={form.serviceCategory}
                onChange={(e) => setForm({ ...form, serviceCategory: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              >
                <option value="Full Preventive Servicing">Full Preventive Servicing</option>
                <option value="Brake Pad & Liner Overhaul">Brake Pad & Liner Overhaul</option>
                <option value="Engine Oil & Filter Flush">Engine Oil & Filter Flush</option>
                <option value="Transmission Fluid Flushing">Transmission Fluid Flushing</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Odometer Reading (km) *</label>
              <input
                type="number"
                required
                value={form.odometer}
                onChange={(e) => setForm({ ...form, odometer: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Work Order Details & Parts Replaced</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Record oil grade, filter serial numbers, technician sign-off..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm transition-all cursor-pointer"
          >
            Complete Work Order & Reset Compliance Clock
          </button>
        </form>
      </main>
    </div>
  );
}
