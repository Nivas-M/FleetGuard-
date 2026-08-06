'use client';

import { useState } from 'react';
import RoleHeader from '../../../cloned/components/RoleHeader';

const DRIVER_LINKS = [
  { label: 'Dashboard', href: '/driver/cloned' },
  { label: 'Pre-Trip Inspection', href: '/driver/cloned/checklist' },
  { label: 'Checklist History', href: '/driver/cloned/history' },
  { label: 'My Vehicle', href: '/driver/cloned/vehicle' },
  { label: 'Notifications', href: '/driver/cloned/notifications' },
];

export default function MyVehicleReadOnlyPage() {
  const [vehicle] = useState({
    plate: 'TN-09-AB-1234',
    name: 'Heavy Hauler Alpha',
    model: 'Volvo FH16 (2022 Heavy Duty)',
    assignedHub: 'Chennai Central Hub',
    status: 'Road-Legal',
    documents: [
      { name: 'Commercial Fleet Insurance Policy', status: 'Valid', expiry: '2026-09-15' },
      { name: 'Annual RTO Safety Inspection', status: 'Expiring Soon (9 Days)', expiry: '2026-08-15' },
      { name: 'PUC Emissions Certificate', status: 'Valid', expiry: '2026-11-20' },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Driver Portal" roleBadge="My Vehicle (Read-Only)" links={DRIVER_LINKS} activeLink="/driver/cloned/vehicle" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">My Assigned Vehicle Details</h1>
          <p className="text-xs text-slate-600 mt-0.5">Read-only view showing compliance doc statuses (no edit rights per security brief).</p>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Assigned Truck</span>
              <h2 className="text-2xl font-black text-slate-900 font-mono">{vehicle.plate}</h2>
              <p className="text-xs text-slate-600 font-semibold">{vehicle.name} • {vehicle.model}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#E3FDFD] text-[#061d23] border border-[#71C9CE] self-start sm:self-auto">
              ✓ {vehicle.status}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px]">Compliance Document Statuses</h3>
            <div className="space-y-2">
              {vehicle.documents.map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-slate-900">{doc.name}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Expiry: {doc.expiry}</div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    doc.status.includes('Expiring') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
