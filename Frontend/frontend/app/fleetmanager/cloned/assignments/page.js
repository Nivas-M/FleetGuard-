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

const INITIAL_ASSIGNMENTS = [
  { id: 'as-1', vehicle: 'TN-09-AB-1234', driver: 'Rajesh Kumar', assignedAt: '2026-08-01 09:00 AM', status: 'Active', isOverride: true, reason: 'Medical shipment priority override' },
  { id: 'as-2', vehicle: 'TN-14-CD-5678', driver: 'Suresh Raina', assignedAt: '2026-07-28 08:30 AM', status: 'Active', isOverride: false, reason: '-' },
  { id: 'as-3', vehicle: 'TN-01-GH-3456', driver: 'Anil Kapoor', assignedAt: '2026-07-25 10:15 AM', status: 'Active', isOverride: false, reason: '-' },
  { id: 'as-4', vehicle: 'TN-11-IJ-7890', driver: 'Venkatesh Prasad', assignedAt: '2026-07-20 02:00 PM', status: 'Active', isOverride: false, reason: '-' },
];

export default function DriverAssignmentsFullFlowPage() {
  const [assignments] = useState(INITIAL_ASSIGNMENTS);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Fleet Manager" roleBadge="Driver Assignment Flow" links={FLEETMANAGER_LINKS} activeLink="/fleetmanager/cloned/assignments" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Driver Assignment Management</h1>
          <p className="text-xs text-slate-600 mt-0.5">Full assignment history, driver compliance checks, and manager override modal logs.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900">Assignment History & Override Audit</h2>
            <span className="text-xs font-extrabold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
              {assignments.length} Active Assignments
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                  <th className="py-3 px-4">Vehicle Plate</th>
                  <th className="py-3 px-4">Assigned Driver</th>
                  <th className="py-3 px-4">Assignment Timestamp</th>
                  <th className="py-3 px-4">Assignment Status</th>
                  <th className="py-3 px-4">Override Flag</th>
                  <th className="py-3 px-4">Logged Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assignments.map((as) => (
                  <tr key={as.id} className="hover:bg-[#E3FDFD]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{as.vehicle}</td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">{as.driver}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">{as.assignedAt}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        {as.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {as.isOverride ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
                          OVERRIDE LOGGED
                        </span>
                      ) : (
                        <span className="text-slate-400 font-semibold">Standard</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 italic">{as.reason}</td>
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
