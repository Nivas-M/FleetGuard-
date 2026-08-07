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

const CHECKLIST_ITEMS = [
  { id: 'brakes', title: '1. Brake Pedal & Air Tanks', desc: 'Confirm pressure gauge reads above 90 PSI and pedal is firm.' },
  { id: 'lights', title: '2. Exterior Lights & Signal Indicators', desc: 'Inspect high beams, low beams, hazards, and taillights.' },
  { id: 'tires', title: '3. Tire Tread Depth & Air Pressure', desc: 'Check tread wear, dual spacing, and sidewalls for cuts.' },
  { id: 'fluids', title: '4. Engine Oil, Coolant & Steering Fluid', desc: 'Check dipstick, coolant reservoir, and inspect for leaks.' },
  { id: 'safety', title: '5. Emergency Safety Kit & Extinguisher', desc: 'Verify warning triangles, first aid box, and extinguisher charge.' },
];

export default function DriverPreTripChecklistPage() {
  const [checked, setChecked] = useState({ brakes: false, lights: false, tires: false, fluids: false, safety: false });
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleCheck = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const completedCount = Object.values(checked).filter(Boolean).length;
  const isAllDone = completedCount === CHECKLIST_ITEMS.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAllDone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setChecked({ brakes: false, lights: false, tires: false, fluids: false, safety: false });
      setNotes('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Driver Portal" roleBadge="Pre-Trip Checklist Flow" links={DRIVER_LINKS} activeLink="/driver/cloned/checklist" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Pre-Trip Inspection Checklist Flow</h1>
          <p className="text-xs text-slate-600 mt-0.5">Quick tap-through inspection flow (large touch targets) for daily departure.</p>
        </div>

        {submitted && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-extrabold text-xs border border-emerald-200 shadow-sm">
            ✓ Pre-Trip Inspection successfully submitted and logged into digital vehicle manifest!
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Inspection Items</span>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#E3FDFD] text-[#061d23] border border-[#A6E3E9]">
              {completedCount} of 5 Tap Verified
            </span>
          </div>

          <div className="space-y-3">
            {CHECKLIST_ITEMS.map((item) => {
              const isChecked = checked[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isChecked
                      ? 'bg-[#E3FDFD] border-[#71C9CE] ring-2 ring-[#71C9CE]/40'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isChecked ? 'bg-[#71C9CE] border-[#71C9CE] text-slate-950 font-bold' : 'bg-white border-slate-300'
                  }`}>
                    {isChecked && '✓'}
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Driver Observations & Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Tires clear, windshield clean..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
            />
          </div>

          <button
            type="submit"
            disabled={!isAllDone}
            className={`w-full py-4 rounded-2xl text-sm font-black transition-all shadow-md ${
              isAllDone ? 'bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit Pre-Trip Inspection ({completedCount}/5 Verified)
          </button>
        </form>
      </main>
    </div>
  );
}
