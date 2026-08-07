'use client';

import { useState } from 'react';
import RoleHeader from '../../cloned/components/RoleHeader';

const ADMIN_LINKS = [
  { label: 'Dashboard', href: '/admin/cloned' },
  { label: 'Compliance Report', href: '/admin/cloned/compliance-report' },
  { label: 'User & Role Management', href: '/admin/cloned/users' },
  { label: 'Override Approvals', href: '/admin/cloned/override-approvals' },
  { label: 'Alert Config', href: '/admin/cloned/alert-config' },
  { label: 'Audit Log', href: '/admin/cloned/audit-log' },
  { label: 'Cost Tracking', href: '/admin/cloned/cost-tracking' },
];

const INITIAL_ADMIN_OVERVIEW = {
  totalVehicles: 24,
  compliantVehicles: 21,
  overdueDocs: 3,
  expiringDocs: 5,
  complianceRate: 87.5,
  ytdTotalSpend: 1028400,
};

const INITIAL_HUB_BREAKDOWN = [
  { name: 'Chennai Hub', total: 8, compliant: 7, overdue: 1, complianceRate: 87.5, riskHigh: 1 },
  { name: 'Coimbatore Hub', total: 6, compliant: 5, overdue: 1, complianceRate: 83.3, riskHigh: 1 },
  { name: 'Madurai Hub', total: 5, compliant: 4, overdue: 1, complianceRate: 80.0, riskHigh: 1 },
  { name: 'Salem Hub', total: 5, compliant: 5, overdue: 0, complianceRate: 100.0, riskHigh: 0 },
];

const INITIAL_UPCOMING_DOCUMENTS = [
  { id: 'doc-1', plateNumber: 'TN-09-AB-1234', branch: 'Chennai Hub', docType: 'Annual Inspection', expiryDate: '2026-08-01', status: 'Overdue', urgency: 'Immediate' },
  { id: 'doc-2', plateNumber: 'TN-37-EF-9012', branch: 'Madurai Hub', docType: 'PUC Emissions', expiryDate: '2026-08-12', status: 'Expiring Soon', urgency: 'Warning' },
  { id: 'doc-3', plateNumber: 'TN-14-CD-5678', branch: 'Coimbatore Hub', docType: 'Insurance Policy', expiryDate: '2026-08-10', status: 'Expiring Soon', urgency: 'Warning' },
  { id: 'doc-4', plateNumber: 'TN-11-IJ-7890', branch: 'Salem Hub', docType: 'Insurance Policy', expiryDate: '2026-08-14', status: 'Expiring Soon', urgency: 'Warning' },
  { id: 'doc-5', plateNumber: 'TN-01-GH-3456', branch: 'Chennai Hub', docType: 'Service Due', expiryDate: '2026-08-25', status: 'Expiring Soon', urgency: 'Upcoming' },
];

const INITIAL_OVERRIDE_REQUESTS = [
  {
    id: 'req-101',
    vehiclePlate: 'TN-09-AB-1234',
    driverName: 'Rajesh Kumar',
    requestedBy: 'Fleet Manager (Chennai)',
    reason: 'Emergency interstate haulage of essential healthcare equipment. Maintenance slot booked for tomorrow morning.',
    timestamp: '2026-08-06 09:15 AM',
    status: 'Pending Admin Sign-off',
  },
  {
    id: 'req-102',
    vehiclePlate: 'TN-37-EF-9012',
    driverName: 'Manoj Tiwari',
    requestedBy: 'Fleet Manager (Madurai)',
    reason: 'Vehicle substitution following primary truck gearbox fault. PUC renewal submitted for processing.',
    timestamp: '2026-08-05 02:40 PM',
    status: 'Pending Admin Sign-off',
  },
];

export default function StandaloneAdminDashboard() {
  const [overview] = useState(INITIAL_ADMIN_OVERVIEW);
  const [hubs] = useState(INITIAL_HUB_BREAKDOWN);
  const [upcomingDocs] = useState(INITIAL_UPCOMING_DOCUMENTS);
  const [overrideRequests, setOverrideRequests] = useState(INITIAL_OVERRIDE_REQUESTS);
  
  const [branchFilter, setBranchFilter] = useState('All');
  const [docTypeFilter, setDocTypeFilter] = useState('All');
  const [notice, setNotice] = useState(null);

  const handleApproveOverride = (reqId) => {
    setOverrideRequests((prev) => prev.filter((r) => r.id !== reqId));
    setNotice({
      type: 'success',
      message: `Override request #${reqId} officially APPROVED by Admin sign-off. Logged in audit trail.`,
    });
  };

  const handleRejectOverride = (reqId) => {
    setOverrideRequests((prev) => prev.filter((r) => r.id !== reqId));
    setNotice({
      type: 'error',
      message: `Override request #${reqId} REJECTED by Admin. Vehicle assignment remain blocked.`,
    });
  };

  const filteredDocs = upcomingDocs.filter((doc) => {
    if (branchFilter !== 'All' && doc.branch !== branchFilter) return false;
    if (docTypeFilter !== 'All' && doc.docType !== docTypeFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader
        roleTitle="Admin Compliance Center"
        roleBadge="System Governance & Audit"
        links={ADMIN_LINKS}
        activeLink="/admin/cloned"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Admin Fleet Compliance & Audit Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Fleet-wide compliance scorecards, regional hub breakdowns, override approvals, and cost estimates.
          </p>
        </div>

        {/* 1. EXECUTIVE KPI BANNER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#E3FDFD] via-white to-white border border-[#71C9CE]/60 shadow-sm col-span-1 sm:col-span-2 lg:col-span-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Overall Compliance Rate</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-black text-[#061d23]">{overview.complianceRate}%</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Target: 95%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
              <div style={{ width: `${overview.complianceRate}%` }} className="bg-[#71C9CE] h-full" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Total Active Fleet</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900">{overview.totalVehicles}</span>
              <span className="text-xs font-semibold text-slate-500">Across 4 Hubs</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 block">Overdue Documents</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-rose-700">{overview.overdueDocs}</span>
              <span className="text-xs font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">Non-Compliant</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">Expiring Soon (30 Days)</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-800">{overview.expiringDocs}</span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">Renewal Due</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#CBF1F5]/40 border border-[#71C9CE]/40 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#061d23] block">YTD Estimated Spend</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">₹{overview.ytdTotalSpend.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-slate-600 bg-[#E3FDFD] px-2 py-0.5 rounded-full border border-[#A6E3E9]">
                Cost Placeholder
              </span>
            </div>
          </div>
        </div>

        {/* 2. REGIONAL HUB BREAKDOWN CARDS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Regional Branch Hub Breakdown</h2>
              <p className="text-xs text-slate-500">Per-hub compliance snapshots and fleet count distribution</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hubs.map((hub) => (
              <div key={hub.name} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">{hub.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    hub.complianceRate === 100
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#E3FDFD] text-[#061d23] border border-[#A6E3E9]'
                  }`}>
                    {hub.complianceRate}% Compliant
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between font-semibold">
                    <span>Fleet Count:</span>
                    <span className="font-bold text-slate-900">{hub.total} Vehicles</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Overdue Items:</span>
                    <span className={`font-bold ${hub.overdue > 0 ? 'text-rose-600' : 'text-slate-700'}`}>{hub.overdue}</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${hub.complianceRate}%` }} className="bg-[#71C9CE] h-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. MAIN GRID: OVERRIDE APPROVAL QUEUE + UPCOMING RADAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-slate-900">Override Approval Queue</h2>
                    <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                      {overrideRequests.length} Pending
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Manager assignments requiring formal Admin sign-off</p>
                </div>
              </div>

              {notice && (
                <div className={`mt-4 p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2 ${
                  notice.type === 'error'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                }`}>
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{notice.message}</span>
                </div>
              )}

              <div className="mt-4 space-y-4">
                {overrideRequests.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center font-medium">
                    No pending driver override requests awaiting Admin sign-off.
                  </p>
                ) : (
                  overrideRequests.map((req) => (
                    <div key={req.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900">{req.vehiclePlate}</span>
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                            {req.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                          Driver: {req.driverName} • Requested by: {req.requestedBy}
                        </p>
                      </div>

                      <p className="text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200/80">
                        "{req.reason}"
                      </p>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleApproveOverride(req.id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all cursor-pointer shadow-sm text-center"
                        >
                          ✓ Approve Request
                        </button>
                        <button
                          onClick={() => handleRejectOverride(req.id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-all cursor-pointer shadow-sm text-center"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Upcoming Compliance Expiry Radar</h2>
                  <p className="text-xs text-slate-500">Fleet-wide document radar filterable by branch hub and document type</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
                  >
                    <option value="All">All Hubs</option>
                    <option value="Chennai Hub">Chennai Hub</option>
                    <option value="Coimbatore Hub">Coimbatore Hub</option>
                    <option value="Madurai Hub">Madurai Hub</option>
                    <option value="Salem Hub">Salem Hub</option>
                  </select>

                  <select
                    value={docTypeFilter}
                    onChange={(e) => setDocTypeFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
                  >
                    <option value="All">All Doc Types</option>
                    <option value="Insurance Policy">Insurance Policy</option>
                    <option value="Annual Inspection">Annual Inspection</option>
                    <option value="PUC Emissions">PUC Emissions</option>
                    <option value="Service Due">Service Due</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                      <th className="py-3 px-4">Vehicle Plate</th>
                      <th className="py-3 px-4">Branch Hub</th>
                      <th className="py-3 px-4">Document Type</th>
                      <th className="py-3 px-4">Expiry Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-[#E3FDFD]/30 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900 font-mono">{doc.plateNumber}</td>
                        <td className="py-3 px-4 text-slate-700 font-medium">{doc.branch}</td>
                        <td className="py-3 px-4 font-bold text-slate-800">{doc.docType}</td>
                        <td className="py-3 px-4 font-semibold text-slate-600">{doc.expiryDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            doc.status === 'Overdue'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* 4. COST TRACKING BREAKDOWN PLACEHOLDER */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Fleet Service & Compliance Spend Breakdown</h2>
              <p className="text-xs text-slate-500">Estimated cost distribution placeholder per fleet specification</p>
            </div>
            <span className="text-xs font-extrabold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
              Total: ₹1,028,400 YTD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block">Routine Servicing (50.2%)</span>
              <span className="text-lg font-extrabold text-slate-900">₹516,256</span>
              <p className="text-[10px] text-slate-500">Preventive oil, filter, and brake replacements</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block">Insurance Premiums (28.0%)</span>
              <span className="text-lg font-extrabold text-slate-900">₹287,952</span>
              <p className="text-[10px] text-slate-500">Annual commercial fleet policy renewals</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block">Safety Inspections (13.6%)</span>
              <span className="text-lg font-extrabold text-slate-900">₹139,862</span>
              <p className="text-[10px] text-slate-500">Certified RTO fitness testing & overhaul</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 block">PUC & Emissions (8.2%)</span>
              <span className="text-lg font-extrabold text-slate-900">₹84,330</span>
              <p className="text-[10px] text-slate-500">Quarterly emission compliance checks</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
