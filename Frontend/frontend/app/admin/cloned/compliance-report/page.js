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

const REPORT_DATA = [
  { hub: 'Chennai Hub', totalVehicles: 8, compliant: 7, nonCompliant: 1, complianceRate: '87.5%', primaryIssue: 'Annual Inspection Overdue (TN-09-AB-1234)' },
  { hub: 'Coimbatore Hub', totalVehicles: 6, compliant: 5, nonCompliant: 1, complianceRate: '83.3%', primaryIssue: 'Insurance Policy Renewal (TN-14-CD-5678)' },
  { hub: 'Madurai Hub', totalVehicles: 5, compliant: 4, nonCompliant: 1, complianceRate: '80.0%', primaryIssue: 'PUC Emissions Expiry (TN-37-EF-9012)' },
  { hub: 'Salem Hub', totalVehicles: 5, compliant: 5, nonCompliant: 0, complianceRate: '100.0%', primaryIssue: 'All Documents Valid' },
];

export default function FleetComplianceReportPage() {
  const [reports] = useState(REPORT_DATA);
  const [exported, setExported] = useState(null);

  const handleExport = (format) => {
    setExported(`Fleet Compliance Report exported as ${format.toUpperCase()} successfully.`);
    setTimeout(() => setExported(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Admin Compliance Center" roleBadge="Fleet-Wide Compliance Report" links={ADMIN_LINKS} activeLink="/admin/cloned/compliance-report" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Fleet-Wide Compliance Master Report</h1>
            <p className="text-xs text-slate-600 mt-0.5">Detailed, exportable compliance view across all regional hubs and vehicle categories.</p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => handleExport('csv')}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 font-bold text-xs shadow-sm cursor-pointer"
            >
              Export CSV
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="px-3.5 py-2 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm cursor-pointer"
            >
              Export PDF Report
            </button>
          </div>
        </div>

        {exported && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-extrabold text-xs border border-emerald-200 shadow-sm">
            ✓ {exported}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                  <th className="py-3.5 px-4">Regional Branch Hub</th>
                  <th className="py-3.5 px-4">Total Fleet Count</th>
                  <th className="py-3.5 px-4">Compliant Vehicles</th>
                  <th className="py-3.5 px-4">Non-Compliant Vehicles</th>
                  <th className="py-3.5 px-4">Compliance % Score</th>
                  <th className="py-3.5 px-4">Primary Compliance Issue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((r, idx) => (
                  <tr key={idx} className="hover:bg-[#E3FDFD]/30 transition-colors">
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">{r.hub}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{r.totalVehicles} Vehicles</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700">{r.compliant}</td>
                    <td className="py-3.5 px-4 font-bold text-rose-600">{r.nonCompliant}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">{r.complianceRate}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{r.primaryIssue}</td>
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
