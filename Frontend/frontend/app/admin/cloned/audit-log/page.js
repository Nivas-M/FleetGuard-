'use client';

import { useState } from 'react';
import RoleHeader from '../../../cloned/components/RoleHeader';

const ADMIN_LINKS = [
  { label: 'Dashboard', href: '/admin/cloned' },
  { label: 'Compliance Report', href: '/admin/cloned/compliance-report' },
  { label: 'User & Role Management', href: '/admin/cloned/users' },
  { label: 'Override Approvals', href: '/admin/cloned/override-approvals' },
  { label: 'Alert Config', href: '/admin/cloned/alert-config' },
  { label: 'Audit Log', href: '/admin/cloned/audit-log' },
  { label: 'Cost Tracking', href: '/admin/cloned/cost-tracking' },
];

const INITIAL_AUDIT = [
  { id: 'aud-101', action: 'Driver Assignment Override', actor: 'Fleet Manager (Chennai)', details: 'Assigned Rajesh Kumar to non-compliant vehicle TN-09-AB-1234. Medical shipment priority.', timestamp: '2026-08-06 09:30 AM' },
  { id: 'aud-102', action: 'Service Clock Reset', actor: 'Master Tech Vikram', details: 'Completed 50,000 km overhaul on TN-05-KL-2345. Service clock reset (+15,000 km).', timestamp: '2026-08-06 11:20 AM' },
  { id: 'aud-103', action: 'Pre-Trip Inspection', actor: 'Rajesh Kumar (Driver)', details: 'Pre-trip checklist completed (5/5 items verified) for TN-09-AB-1234.', timestamp: '2026-08-05 07:45 AM' },
  { id: 'aud-104', action: 'Admin Sign-off Approval', actor: 'Alexander Wright (Admin)', details: 'Approved pending override request #req-101 for TN-09-AB-1234.', timestamp: '2026-08-06 10:00 AM' },
];

export default function SystemAuditLogPage() {
  const [logs] = useState(INITIAL_AUDIT);
  const [filter, setFilter] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(filter.toLowerCase()) ||
      l.actor.toLowerCase().includes(filter.toLowerCase()) ||
      l.details.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Admin Governance" roleBadge="Immutable Audit Log" links={ADMIN_LINKS} activeLink="/admin/cloned/audit-log" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">System Master Audit Log</h1>
          <p className="text-xs text-slate-600 mt-0.5">Immutable audit log tracking every override, assignment, and service-clock reset system-wide.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search audit trail by action, user, or details..."
            className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-[#71C9CE] w-full sm:w-80"
          />
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{filtered.length} Recorded Trail Items</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                  <th className="py-3.5 px-4">Audit ID</th>
                  <th className="py-3.5 px-4">System Action Event</th>
                  <th className="py-3.5 px-4">Actor Account</th>
                  <th className="py-3.5 px-4">Audit Event Details</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-[#E3FDFD]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{l.id}</td>
                    <td className="py-3.5 px-4 font-extrabold text-[#061d23]">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#E3FDFD] border border-[#A6E3E9] text-[11px]">
                        {l.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{l.actor}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{l.details}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-500">{l.timestamp}</td>
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
