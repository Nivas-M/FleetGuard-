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

export default function FleetAlertConfigPage() {
  const [config, setConfig] = useState({
    insuranceLeadDays: 30,
    inspectionLeadDays: 15,
    emissionsLeadDays: 7,
    serviceIntervalKm: 15000,
    notifyEmail: true,
    notifyInApp: true,
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Fleet Manager" roleBadge="Alert Configuration" links={FLEETMANAGER_LINKS} activeLink="/fleetmanager/cloned/alert-config" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Alert Configuration & Lead Times</h1>
          <p className="text-xs text-slate-600 mt-0.5">Set proactive warning lead times (30/15/7 days) per document type and vehicle group.</p>
        </div>

        {savedNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200">
            ✓ Alert thresholds and lead time configurations saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 text-xs">
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100">Document Expiry Lead Times</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Insurance Lead Time (Days)</label>
                <input
                  type="number"
                  value={config.insuranceLeadDays}
                  onChange={(e) => setConfig({ ...config, insuranceLeadDays: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Safety Inspection (Days)</label>
                <input
                  type="number"
                  value={config.inspectionLeadDays}
                  onChange={(e) => setConfig({ ...config, inspectionLeadDays: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Emissions Certificate (Days)</label>
                <input
                  type="number"
                  value={config.emissionsLeadDays}
                  onChange={(e) => setConfig({ ...config, emissionsLeadDays: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100">Predictive Maintenance Intervals</h2>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Default Service Interval Threshold (km)</label>
              <input
                type="number"
                value={config.serviceIntervalKm}
                onChange={(e) => setConfig({ ...config, serviceIntervalKm: Number(e.target.value) })}
                className="w-full sm:w-64 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm transition-all cursor-pointer"
          >
            Save Alert Configuration
          </button>
        </form>
      </main>
    </div>
  );
}
