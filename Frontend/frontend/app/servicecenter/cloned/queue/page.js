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

const INITIAL_QUEUE = [
  { id: 'wo-101', plate: 'TN-09-AB-1234', name: 'Heavy Hauler Alpha', type: 'Heavy Truck', branch: 'Chennai Hub', urgency: 'Overdue', currentKm: 121500, dueKm: 120000, risk: 'High', issue: '120k km Preventive Overhaul & Oil Flush' },
  { id: 'wo-102', plate: 'TN-37-EF-9012', name: 'LogiTrans Gamma', type: 'Tipper Truck', branch: 'Madurai Hub', urgency: 'Due Today', currentKm: 94800, dueKm: 95000, risk: 'High', issue: 'Brake Liner Inspection & Differential Oil' },
  { id: 'wo-103', plate: 'TN-14-CD-5678', name: 'Cargo Express Beta', type: 'Multi-Axle Truck', branch: 'Coimbatore Hub', urgency: 'Scheduled Soon', currentKm: 81200, dueKm: 85000, risk: 'Medium', issue: '85k km Service Check & Air Filter Change' },
  { id: 'wo-104', plate: 'TN-11-IJ-7890', name: 'Coastal Transport Epsilon', type: 'Rigid Truck', branch: 'Salem Hub', urgency: 'Scheduled Soon', currentKm: 67900, dueKm: 70000, risk: 'Medium', issue: 'Transmission Fluid Flushing' },
];

export default function WorkOrderServiceQueuePage() {
  const [queue] = useState(INITIAL_QUEUE);
  const [urgencyFilter, setUrgencyFilter] = useState('All');

  const filtered = queue.filter((q) => {
    if (urgencyFilter === 'Overdue') return q.urgency === 'Overdue';
    if (urgencyFilter === 'Due Today') return q.urgency === 'Due Today';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Service Center" roleBadge="Work Orders Queue" links={SERVICECENTER_LINKS} activeLink="/servicecenter/cloned/queue" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Service Queue & Work Orders</h1>
            <p className="text-xs text-slate-600 mt-0.5">Full filterable list of vehicles due/overdue for service sorted by urgency & risk score.</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
            <button
              onClick={() => setUrgencyFilter('All')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                urgencyFilter === 'All' ? 'bg-[#71C9CE] text-slate-950 shadow-sm' : 'text-slate-600'
              }`}
            >
              All Queue ({queue.length})
            </button>
            <button
              onClick={() => setUrgencyFilter('Overdue')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                urgencyFilter === 'Overdue' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Overdue
            </button>
            <button
              onClick={() => setUrgencyFilter('Due Today')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                urgencyFilter === 'Due Today' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Due Today
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                  <th className="py-3.5 px-4">Work Order ID</th>
                  <th className="py-3.5 px-4">Vehicle Plate & Name</th>
                  <th className="py-3.5 px-4">Branch Hub</th>
                  <th className="py-3.5 px-4">Odometer vs Due Target</th>
                  <th className="py-3.5 px-4">Urgency Status</th>
                  <th className="py-3.5 px-4">Predictive Risk</th>
                  <th className="py-3.5 px-4">Maintenance Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-[#E3FDFD]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{q.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 font-mono">{q.plate}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{q.name}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{q.branch}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {q.currentKm.toLocaleString()} / <span className="font-bold">{q.dueKm.toLocaleString()} km</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        q.urgency === 'Overdue' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {q.urgency}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{q.risk}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{q.issue}</td>
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
