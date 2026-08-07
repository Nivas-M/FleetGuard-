'use client';

import { useState, use } from 'react';
import RoleHeader from '../../../../cloned/components/RoleHeader';

const FLEETMANAGER_LINKS = [
  { label: 'Dashboard', href: '/fleetmanager/cloned' },
  { label: 'Vehicle Registry', href: '/fleetmanager/cloned/vehicles' },
  { label: 'Assignments Flow', href: '/fleetmanager/cloned/assignments' },
  { label: 'Override Log', href: '/fleetmanager/cloned/override-log' },
  { label: 'Alert Config', href: '/fleetmanager/cloned/alert-config' },
  { label: 'Historical Entry', href: '/fleetmanager/cloned/historical-entry' },
];

export default function VehicleDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const vehicleId = params.id || 'v1';

  const [vehicle] = useState({
    id: vehicleId,
    plate: 'TN-09-AB-1234',
    name: 'Heavy Hauler Alpha',
    model: 'Volvo FH16 (2022 Heavy Duty)',
    assignedDriver: 'Rajesh Kumar (DL-TN-2018-9941)',
    branch: 'Chennai Main Fleet Hub',
    predictiveRisk: 'High (Service overdue by 1,500 km)',
    documents: [
      { type: 'Commercial Vehicle Insurance', expiry: '2026-09-15', status: 'Valid', issuer: 'National Insurance Corp' },
      { type: 'Annual RTO Safety Inspection', expiry: '2026-08-01', status: 'Overdue', issuer: 'TN RTO Unit 09' },
      { type: 'PUC Emissions Certificate', expiry: '2026-11-20', status: 'Valid', issuer: 'CleanAir Testing' },
    ],
    serviceHistory: [
      { date: '2026-05-10', odometer: '105,000 km', action: 'Engine Oil & Filter Flushing', workshop: 'Chennai Central Workshop' },
      { date: '2026-01-15', odometer: '90,000 km', action: 'Brake Liner Replacement', workshop: 'Chennai Central Workshop' },
    ],
  });

  const [uploadNotice, setUploadNotice] = useState(null);

  const handleSimulateUpload = (e) => {
    e.preventDefault();
    setUploadNotice('New compliance document uploaded successfully. Sent for verification review.');
    setTimeout(() => setUploadNotice(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Fleet Manager" roleBadge="Vehicle Detail View" links={FLEETMANAGER_LINKS} activeLink="/fleetmanager/cloned/vehicles" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Back Link & Header */}
        <div className="space-y-1">
          <a href="/fleetmanager/cloned/vehicles" className="text-xs font-bold text-[#71C9CE] hover:underline">
            ← Back to Vehicle Registry
          </a>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <div>
              <h1 className="text-2xl font-black text-slate-900">{vehicle.plate} — {vehicle.name}</h1>
              <p className="text-xs text-slate-500 font-medium">{vehicle.model} • {vehicle.branch}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300 self-start sm:self-auto">
              Current Status: Non-Compliant
            </span>
          </div>
        </div>

        {/* 1. Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Assigned Driver</span>
            <span className="block font-extrabold text-slate-900 text-sm">{vehicle.assignedDriver}</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Predictive Risk Flag</span>
            <span className="block font-extrabold text-rose-700 text-sm">{vehicle.predictiveRisk}</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Branch Allocation</span>
            <span className="block font-extrabold text-slate-900 text-sm">{vehicle.branch}</span>
          </div>
        </div>

        {/* 2. Compliance Documents Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-extrabold text-slate-900">Compliance Documents & Renewal Status</h2>
            <span className="text-xs font-bold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
              3 Tracked Docs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vehicle.documents.map((doc, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{doc.type}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    doc.status === 'Overdue' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <div className="text-slate-600 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Expiry Date:</span>
                    <span className="font-bold text-slate-900">{doc.expiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issuing Body:</span>
                    <span className="font-medium text-slate-700">{doc.issuer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Simulation Form */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">Upload Renewal Document</h3>
            
            {uploadNotice && (
              <div className="mb-3 p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200">
                ✓ {uploadNotice}
              </div>
            )}

            <form onSubmit={handleSimulateUpload} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-xs">
              <input
                type="file"
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-600 focus:outline-none w-full sm:w-auto"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold transition-all cursor-pointer whitespace-nowrap"
              >
                Upload Document
              </button>
            </form>
          </div>
        </div>

        {/* 3. Service History Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100">Vehicle Service & Maintenance Timeline</h2>
          <div className="space-y-3">
            {vehicle.serviceHistory.map((sh, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-1">
                  <div className="font-extrabold text-slate-900">{sh.action}</div>
                  <div className="text-slate-500 font-medium">{sh.workshop} • Recorded at {sh.odometer}</div>
                </div>
                <div className="font-bold text-slate-700 text-right shrink-0">{sh.date}</div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
