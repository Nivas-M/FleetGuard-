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

const HUB_COSTS = [
  { hub: 'Chennai Hub', count: 8, routine: 172000, insurance: 96000, inspection: 46000, puc: 28000, total: 342000 },
  { hub: 'Coimbatore Hub', count: 6, routine: 129000, insurance: 72000, inspection: 34500, puc: 21000, total: 256500 },
  { hub: 'Madurai Hub', count: 5, routine: 107500, insurance: 60000, inspection: 28750, puc: 17500, total: 213750 },
  { hub: 'Salem Hub', count: 5, routine: 107500, insurance: 60000, inspection: 28750, puc: 17500, total: 213750 },
];

export default function FleetCostTrackingPage() {
  const [costs] = useState(HUB_COSTS);
  const totalSpend = costs.reduce((sum, c) => sum + c.total, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Admin Governance" roleBadge="Cost Tracking & Financials" links={ADMIN_LINKS} activeLink="/admin/cloned/cost-tracking" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Fleet Service & Compliance Spend Tracking</h1>
            <p className="text-xs text-slate-600 mt-0.5">Aggregate estimated cost figures and per-hub breakdown placeholders ("what it's costing us").</p>
          </div>
          <span className="text-xs font-extrabold text-[#71C9CE] bg-[#E3FDFD] px-4 py-2 rounded-2xl border border-[#A6E3E9] text-sm">
            Total Fleet YTD: ₹{totalSpend.toLocaleString()}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 font-extrabold text-sm text-slate-900">Per-Hub Cost Allocation Snapshot</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                  <th className="py-3.5 px-4">Regional Branch Hub</th>
                  <th className="py-3.5 px-4">Fleet Count</th>
                  <th className="py-3.5 px-4">Routine Servicing</th>
                  <th className="py-3.5 px-4">Insurance Premiums</th>
                  <th className="py-3.5 px-4">Safety Inspections</th>
                  <th className="py-3.5 px-4">PUC Emissions</th>
                  <th className="py-3.5 px-4">Total YTD Spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {costs.map((c, idx) => (
                  <tr key={idx} className="hover:bg-[#E3FDFD]/30 transition-colors">
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">{c.hub}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">{c.count} Vehicles</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">₹{c.routine.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">₹{c.insurance.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">₹{c.inspection.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">₹{c.puc.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">₹{c.total.toLocaleString()}</td>
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
