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

const INITIAL_REQUESTS = [
  { id: 'req-101', vehicle: 'TN-09-AB-1234', driver: 'Rajesh Kumar', requestedBy: 'Fleet Manager (Chennai)', reason: 'Emergency interstate haulage of essential healthcare equipment. Maintenance slot booked for tomorrow morning.', date: '2026-08-06 09:15 AM' },
  { id: 'req-102', vehicle: 'TN-37-EF-9012', driver: 'Manoj Tiwari', requestedBy: 'Fleet Manager (Madurai)', reason: 'Vehicle substitution following primary truck gearbox fault. PUC renewal submitted for processing.', date: '2026-08-05 02:40 PM' },
];

export default function AdminOverrideApprovalsPage() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [notice, setNotice] = useState(null);

  const handleAction = (id, type) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setNotice(`Override request #${id} ${type === 'approve' ? 'APPROVED with Admin Sign-off' : 'REJECTED'}.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Admin Governance" roleBadge="Override Approval Queue" links={ADMIN_LINKS} activeLink="/admin/cloned/override-approvals" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Override Approval Queue</h1>
          <p className="text-xs text-slate-600 mt-0.5">Admin sign-off queue for pending driver assignment overrides (Phase 2 CR scope item).</p>
        </div>

        {notice && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-extrabold text-xs border border-emerald-200 shadow-sm">
            ✓ {notice}
          </div>
        )}

        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500 font-medium">
              No pending driver assignment override requests awaiting Admin sign-off.
            </div>
          ) : (
            requests.map((r) => (
              <div key={r.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm font-mono">{r.vehicle}</span>
                    <span className="text-slate-500 ml-2 font-semibold">Driver: {r.driver}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                    Awaiting Sign-Off
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-500 font-semibold">Requested By: {r.requestedBy} • {r.date}</div>
                  <p className="text-slate-700 italic bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    "{r.reason}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => handleAction(r.id, 'approve')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    ✓ Approve Request
                  </button>
                  <button
                    onClick={() => handleAction(r.id, 'reject')}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer"
                  >
                    ✕ Reject Override
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
