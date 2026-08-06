'use client';

import { useState } from 'react';
import RoleHeader from '../../../cloned/components/RoleHeader';

const FLEETMANAGER_LINKS = [
  { label: 'Dashboard', href: '/fleetmanager/cloned' },
  { label: 'Vehicle Registry', href: '/fleetmanager/cloned/vehicles' },
  { label: 'Assignments Flow', href: '/fleetmanager/cloned/assignments' },
  { label: 'Override Log', href: '/fleetmanager/cloned/override-log' },
  { label: 'Alert Config', href: '/fleetmanager/cloned/alert-config' },
  { label: 'Historical Entry', href: '/fleetmanager/cloned/historical-entry' },
];

export default function HistoricalDataEntryPage() {
  const [formData, setFormData] = useState({
    plateNumber: '',
    serviceDate: '',
    odometer: '',
    serviceType: 'Routine Overhaul',
    mechanicNotes: '',
  });

  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 4000);
    setFormData({ plateNumber: '', serviceDate: '', odometer: '', serviceType: 'Routine Overhaul', mechanicNotes: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Fleet Manager" roleBadge="Historical Data Entry" links={FLEETMANAGER_LINKS} activeLink="/fleetmanager/cloned/historical-entry" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Historical Data Entry</h1>
          <p className="text-xs text-slate-600 mt-0.5">Manual entry form for legacy/older vehicles without digital service history records.</p>
        </div>

        {submittedNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200">
            ✓ Historical service record saved into digital fleet ledger!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Vehicle Plate Number *</label>
            <input
              type="text"
              required
              placeholder="e.g. TN-09-AB-1234"
              value={formData.plateNumber}
              onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-mono text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Past Service Date *</label>
              <input
                type="date"
                required
                value={formData.serviceDate}
                onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Odometer Reading at Service (km) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 75000"
                value={formData.odometer}
                onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Work Description & Notes</label>
            <textarea
              rows={3}
              placeholder="Record paper receipt notes, replaced parts, legacy technician details..."
              value={formData.mechanicNotes}
              onChange={(e) => setFormData({ ...formData, mechanicNotes: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm transition-all cursor-pointer"
          >
            Save Historical Record
          </button>
        </form>
      </main>
    </div>
  );
}
