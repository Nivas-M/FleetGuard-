'use client';

import { useState } from 'react';
import RoleHeader from '../../cloned/components/RoleHeader';

const DRIVER_LINKS = [
  { label: 'Dashboard', href: '/driver/cloned' },
  { label: 'Pre-Trip Inspection', href: '/driver/cloned/checklist' },
  { label: 'Checklist History', href: '/driver/cloned/history' },
  { label: 'My Vehicle', href: '/driver/cloned/vehicle' },
  { label: 'Notifications', href: '/driver/cloned/notifications' },
];

const INITIAL_DRIVER_DATA = {
  driverName: 'Rajesh Kumar',
  licenseNumber: 'DL-TN-2018-9941',
  assignedVehicle: {
    plateNumber: 'TN-09-AB-1234',
    name: 'Heavy Hauler Alpha',
    model: 'Volvo FH16 (2022)',
    assignedDate: '2026-08-01',
    nextServiceDue: '120,000 km (1,500 km remaining)',
    compliance: {
      insurance: { status: 'Valid', expiryDate: '2026-09-15' },
      inspection: { status: 'Expiring Soon', expiryDate: '2026-08-15' },
      emissions: { status: 'Valid', expiryDate: '2026-11-20' },
    },
  },
  headsUp: {
    type: 'Warning',
    message: 'Annual Safety Inspection expires in 9 days (2026-08-15). Fleet Manager has scheduled renewal.',
  },
  history: [
    { id: 'ch-1', date: '2026-08-05 07:45 AM', status: 'Passed', itemsChecked: 5, remarks: 'All systems green. Ready for interstate route.' },
    { id: 'ch-2', date: '2026-08-04 08:00 AM', status: 'Passed', itemsChecked: 5, remarks: 'Tire pressure verified at 110 PSI.' },
    { id: 'ch-3', date: '2026-08-03 07:30 AM', status: 'Passed', itemsChecked: 5, remarks: 'Oil level optimal.' },
  ],
};

const CHECKLIST_ITEMS = [
  { key: 'brakes', title: 'Brake Operation & Air Pressure', desc: 'Verify brake pedal feel and air tank pressure gauge' },
  { key: 'lights', title: 'Headlights, Indicators & Signals', desc: 'Inspect high beam, low beam, hazards, and taillights' },
  { key: 'tires', title: 'Tire Tread & Inflation', desc: 'Check for visible wear, punctures, and pressure' },
  { key: 'fluids', title: 'Engine Oil, Coolant & Fluids', desc: 'Inspect under-hood fluid levels and check for leaks' },
  { key: 'safetyKit', title: 'Emergency Kit & Fire Extinguisher', desc: 'Ensure triangles, first aid, and extinguisher are present' },
];

export default function StandaloneDriverDashboard() {
  const [driverData] = useState(INITIAL_DRIVER_DATA);
  const [checklist, setChecklist] = useState({
    brakes: false,
    lights: false,
    tires: false,
    fluids: false,
    safetyKit: false,
  });
  const [remarks, setRemarks] = useState('');
  const [history, setHistory] = useState(driverData.history);
  const [notice, setNotice] = useState(null);
  const [simulatedLegalStatus, setSimulatedLegalStatus] = useState('Road-Legal');

  const handleToggleItem = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAll = () => {
    const allChecked = Object.values(checklist).every(Boolean);
    setChecklist({
      brakes: !allChecked,
      lights: !allChecked,
      tires: !allChecked,
      fluids: !allChecked,
      safetyKit: !allChecked,
    });
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const isFullyChecked = checkedCount === CHECKLIST_ITEMS.length;

  const handleSubmitChecklist = (e) => {
    e.preventDefault();
    setNotice(null);

    if (!isFullyChecked) {
      setNotice({
        type: 'error',
        message: `Please tap and verify all 5 pre-trip inspection items before submitting (${checkedCount}/5 completed).`,
      });
      return;
    }

    const newLog = {
      id: `ch-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'Passed',
      itemsChecked: 5,
      remarks: remarks.trim() || 'Pre-trip inspection verified by driver.',
    };

    setHistory([newLog, ...history]);
    setNotice({
      type: 'success',
      message: 'Pre-trip inspection successfully recorded! Safe driving.',
    });

    setChecklist({
      brakes: false,
      lights: false,
      tires: false,
      fluids: false,
      safetyKit: false,
    });
    setRemarks('');
  };

  const isRoadLegal = simulatedLegalStatus === 'Road-Legal';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader
        roleTitle="Driver Portal"
        roleBadge="Pre-Trip Inspection & Status"
        links={DRIVER_LINKS}
        activeLink="/driver/cloned"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Driver Portal & Inspection
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Welcome back, <span className="font-bold text-slate-800">{driverData.driverName}</span> ({driverData.licenseNumber})
          </p>
        </div>

        {/* 1. HERO VEHICLE ROAD-LEGAL STATUS CARD */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-md transition-all relative overflow-hidden ${
          isRoadLegal
            ? 'bg-gradient-to-br from-[#E3FDFD] via-[#CBF1F5]/50 to-white border-[#71C9CE]/50'
            : 'bg-gradient-to-br from-rose-100 via-rose-50 to-white border-rose-300'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                  isRoadLegal
                    ? 'bg-[#71C9CE] text-slate-950'
                    : 'bg-rose-600 text-white animate-pulse'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isRoadLegal ? 'bg-slate-950' : 'bg-white'}`} />
                  {isRoadLegal ? 'ROAD-LEGAL & READY TO DRIVE' : 'DO NOT DRIVE — COMPLIANCE ISSUES'}
                </span>
                
                <button
                  onClick={() => setSimulatedLegalStatus(isRoadLegal ? 'Do Not Drive' : 'Road-Legal')}
                  className="text-[11px] font-bold text-slate-600 underline hover:text-slate-900 cursor-pointer ml-2"
                  title="Click to toggle status for demo"
                >
                  (Demo Toggle)
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {driverData.assignedVehicle.plateNumber}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                {driverData.assignedVehicle.name} • {driverData.assignedVehicle.model}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Service Interval</span>
              <span className="text-xs font-extrabold text-slate-800">{driverData.assignedVehicle.nextServiceDue}</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-500 block">Insurance</span>
              <span className="font-extrabold text-emerald-700">Valid</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 block">Inspection</span>
              <span className="font-extrabold text-amber-900">Expires 08/15</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-500 block">PUC Emissions</span>
              <span className="font-extrabold text-emerald-700">Valid</span>
            </div>
          </div>
        </div>

        {/* 2. HEADS-UP NOTICE BANNER */}
        {driverData.headsUp && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 border border-amber-200 mt-0.5">
              <svg className="w-4 h-4 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-0.5">
              <span className="font-extrabold text-amber-900 uppercase tracking-wider text-[11px] block">Heads-Up Compliance Renewal</span>
              <p className="text-amber-800 font-medium leading-relaxed">{driverData.headsUp.message}</p>
            </div>
          </div>
        )}

        {/* 3. TAP-THROUGH PRE-TRIP CHECKLIST */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900">Pre-Trip Inspection Checklist</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#E3FDFD] text-[#061d23]">
                  {checkedCount} / 5 Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Quick tap-through verification before starting today's route</p>
            </div>

            <button
              onClick={handleSelectAll}
              className="text-xs font-bold text-[#71C9CE] hover:text-[#5bb8bc] bg-[#E3FDFD] hover:bg-[#CBF1F5] px-3.5 py-2 rounded-xl border border-[#A6E3E9] transition-all cursor-pointer self-start sm:self-auto"
            >
              {isFullyChecked ? 'Deselect All' : 'Tap All (Quick Check)'}
            </button>
          </div>

          {notice && (
            <div className={`mt-6 p-4 rounded-2xl text-xs font-semibold flex items-center gap-3 ${
              notice.type === 'error'
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
            }`}>
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{notice.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmitChecklist} className="mt-6 space-y-4">
            <div className="space-y-3">
              {CHECKLIST_ITEMS.map((item, idx) => {
                const isChecked = checklist[item.key];
                return (
                  <div
                    key={item.key}
                    onClick={() => handleToggleItem(item.key)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isChecked
                        ? 'bg-[#E3FDFD]/80 border-[#71C9CE] shadow-sm ring-1 ring-[#71C9CE]'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 transition-all ${
                        isChecked
                          ? 'bg-[#71C9CE] text-slate-950'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className={`text-xs sm:text-sm font-extrabold transition-all ${isChecked ? 'text-[#061d23]' : 'text-slate-900'}`}>
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      isChecked
                        ? 'bg-[#71C9CE] border-[#71C9CE] text-slate-950 scale-105'
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isChecked && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Optional Inspection Notes / Observations
              </label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="e.g. Minor tire wear noted on rear left outer dual..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-2xl text-sm font-black tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isFullyChecked
                  ? 'bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 scale-[1.01]'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Submit Pre-Trip Inspection ({checkedCount}/5 Verified)</span>
            </button>
          </form>
        </div>

        {/* 4. RECENT CHECKLIST HISTORY TIMELINE */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Checklist Submission History</h2>
              <p className="text-xs text-slate-500">Audit trail of completed daily inspection logs</p>
            </div>
            <span className="text-xs font-extrabold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
              {history.length} Past Checks
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {history.map((log) => (
              <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md text-[11px]">
                      ✓ {log.status} ({log.itemsChecked}/5)
                    </span>
                    <span className="font-semibold text-slate-500">{log.date}</span>
                  </div>
                  <p className="text-slate-600 font-medium">{log.remarks}</p>
                </div>
                <div className="text-[11px] font-bold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1.5 rounded-xl border border-[#A6E3E9]/40 shrink-0 self-start sm:self-auto">
                  Verified Digital Sign
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
