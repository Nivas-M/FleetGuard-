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

const INITIAL_LOGS = [
  { id: 'ov-101', vehicle: 'TN-09-AB-1234', driver: 'Rajesh Kumar', manager: 'Fleet Manager Alpha', reason: 'Critical medical supply shipment. Annual inspection appointment scheduled for tomorrow morning.', date: '2026-08-06 09:30 AM', status: 'Logged & Approved' },
  { id: 'ov-102', vehicle: 'TN-37-EF-9012', driver: 'Manoj Tiwari', manager: 'Fleet Manager Beta', reason: 'Emergency highway breakdown replacement. Insurance renewal under priority processing.', date: '2026-08-05 04:15 PM', status: 'Logged & Approved' },
  { id: 'ov-103', vehicle: 'TN-14-CD-5678', driver: 'Suresh Raina', manager: 'Fleet Manager Alpha', reason: 'Short distance yard movement to workshop facility.', date: '2026-07-29 11:20 AM', status: 'Logged & Approved' },
];

export default function FleetOverrideLogPage() {
  const [logs] = useState(INITIAL_LOGS);
  const [search, setSearch] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      l.driver.toLowerCase().includes(search.toLowerCase()) ||
      l.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Fleet Manager" roleBadge="Override Log Audit Trail" links={FLEETMANAGER_LINKS} activeLink="/fleetmanager/cloned/override-log" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Override Log Audit Trail</h1>
          <p className="text-xs text-slate-600 mt-0.5">Full audit trail of every override across the fleet ("override must be logged, not silently allowed").</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter override log by vehicle, driver, or reason..."
            className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE] w-full sm:w-80"
          />
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{filtered.length} Recorded Overrides</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                  <th className="py-3.5 px-4">Log ID</th>
                  <th className="py-3.5 px-4">Vehicle Plate</th>
                  <th className="py-3.5 px-4">Assigned Driver</th>
                  <th className="py-3.5 px-4">Requested By</th>
                  <th className="py-3.5 px-4">Mandatory Justification Reason</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-[#E3FDFD]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-500 font-bold">{l.id}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{l.vehicle}</td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">{l.driver}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{l.manager}</td>
                    <td className="py-3.5 px-4 text-slate-700 italic max-w-xs">{l.reason}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-500">{l.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
