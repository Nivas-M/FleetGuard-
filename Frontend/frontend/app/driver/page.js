'use client';

import { useState } from 'react';
import Navbar from '../components/navbar';
import { useAuth } from '../context/AuthContext';

export default function DriverDashboard() {
  const { user } = useAuth();
  // Mock Driver Assigned Vehicle Data
  const driverVehicles = [
    {
      id: 'VH001',
      plate: 'TN-02-CD-5678',
      model: 'Volvo FH16 Heavy Freight',
      assignedDriver: 'John Smith',
      location: 'Tamil Nadu, Sector 4',
      mileage: '85,400 km',
      serviceInterval: '80,000 km',
      insurance: { status: 'Valid', expiry: '2026-12-15', daysLeft: 138 },
      inspection: { status: 'Valid', expiry: '2026-11-20', daysLeft: 113 },
      emissions: { status: 'Valid', expiry: '2026-10-05', daysLeft: 67 },
      service: { status: 'Due Soon', lastService: '2026-02-10', daysLeft: 12 },
      riskLevel: 'Medium',
    },
    {
      id: 'VH002',
      plate: 'TN-09-EF-1122',
      model: 'Tata Prima Express Truck',
      assignedDriver: 'John Smith',
      location: 'Chennai Central Hub',
      mileage: '112,000 km',
      serviceInterval: '100,000 km',
      insurance: { status: 'Valid', expiry: '2026-09-30', daysLeft: 62 },
      inspection: { status: 'Valid', expiry: '2026-08-15', daysLeft: 16 },
      emissions: { status: 'Overdue', expiry: '2026-07-25', daysLeft: -5 },
      service: { status: 'Overdue', lastService: '2025-11-12', daysLeft: -260 },
      riskLevel: 'High',
    },
  ];

  // State Management
  const [selectedVehicleId, setSelectedVehicleId] = useState('VH001');
  const activeVehicle = driverVehicles.find((v) => v.id === selectedVehicleId) || driverVehicles[0];

  // Checklist Items State
  const [checklist, setChecklist] = useState({
    brakes: false,
    lights: false,
    tires: false,
    fluids: false,
    safetyKit: false,
  });

  const [checklistCompleted, setChecklistCompleted] = useState(false);
  const [checklistNotice, setChecklistNotice] = useState(null);

  // History State
  const [checklistHistory, setChecklistHistory] = useState([
    {
      id: 'CHK-904',
      date: '2026-07-29',
      time: '07:30 AM',
      vehicle: 'TN-02-CD-5678',
      status: 'Passed (5/5 Checked)',
      driver: 'John Smith',
    },
    {
      id: 'CHK-881',
      date: '2026-07-28',
      time: '07:15 AM',
      vehicle: 'TN-02-CD-5678',
      status: 'Passed (5/5 Checked)',
      driver: 'John Smith',
    },
  ]);

  // Determine Road Legal Status
  const isOverdue =
    activeVehicle.insurance.status === 'Overdue' ||
    activeVehicle.inspection.status === 'Overdue' ||
    activeVehicle.emissions.status === 'Overdue' ||
    activeVehicle.service.status === 'Overdue';

  const roadLegalStatus = isOverdue ? 'Do Not Drive' : 'Road-Legal';

  // Checklist Handlers
  const handleCheckItem = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChecklistSubmit = (e) => {
    e.preventDefault();
    const allChecked = Object.values(checklist).every(Boolean);

    if (!allChecked) {
      setChecklistNotice({
        type: 'error',
        text: 'Please tap and verify all 5 pre-trip inspection items before submitting.',
      });
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    const newHistoryItem = {
      id: `CHK-${Math.floor(100 + Math.random() * 900)}`,
      date: dateStr,
      time: timeStr,
      vehicle: activeVehicle.plate,
      status: 'Passed (5/5 Checked)',
      driver: activeVehicle.assignedDriver,
    };

    setChecklistHistory([newHistoryItem, ...checklistHistory]);
    setChecklistCompleted(true);
    setChecklistNotice({
      type: 'success',
      text: `Pre-trip inspection completed successfully for ${activeVehicle.plate} at ${timeStr}.`,
    });
  };

  // Extract Heads-up notices for active vehicle
  const headsUpNotices = [];
  if (activeVehicle.insurance.daysLeft <= 60 && activeVehicle.insurance.daysLeft > 0) {
    headsUpNotices.push({
      id: 'n-ins',
      title: 'Insurance Policy Expiry Warning',
      detail: `Policy expires in ${activeVehicle.insurance.daysLeft} days (${activeVehicle.insurance.expiry}). Renewal pending.`,
      urgency: 'medium',
    });
  }
  if (activeVehicle.inspection.daysLeft <= 30 && activeVehicle.inspection.daysLeft > 0) {
    headsUpNotices.push({
      id: 'n-insp',
      title: 'Safety Inspection Due Soon',
      detail: `Annual safety certificate expires in ${activeVehicle.inspection.daysLeft} days (${activeVehicle.inspection.expiry}).`,
      urgency: 'high',
    });
  }
  if (activeVehicle.emissions.status === 'Overdue') {
    headsUpNotices.push({
      id: 'n-emi',
      title: 'EMISSIONS (PUC) CERTIFICATE EXPIRED',
      detail: `Certificate expired on ${activeVehicle.emissions.expiry}. Vehicle is currently not road-legal!`,
      urgency: 'critical',
    });
  }
  if (activeVehicle.service.status === 'Due Soon') {
    headsUpNotices.push({
      id: 'n-srv',
      title: 'Routine Maintenance Service Due Soon',
      detail: `Last serviced on ${activeVehicle.service.lastService}. Scheduled service window approaching.`,
      urgency: 'medium',
    });
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans p-5 sm:p-7 lg:p-8">
      <div className="max-w-[1470px] mx-auto flex flex-col gap-7">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Header Title Section */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-sm font-bold text-[#71C9CE] uppercase tracking-wider">
            Welcome Back{user?.name ? ` ${user.name}` : ''}
          </h2>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Driver Dashboard</h1>
          <p className="text-sm text-slate-600 mt-0.5 font-medium">
            Verify road-legal vehicle status, complete pre-trip safety checklist, and view compliance alerts.
          </p>
        </div>

        {/* DASHBOARD GRID (Border-Free Blended Cards mimicking Fleet Manager layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* LEFT MAIN COLUMN (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            
            {/* Left Card 1: My Vehicle Card */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Vehicle</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">{activeVehicle.plate}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">{activeVehicle.model}</p>
                </div>

                {/* Prominent Road Legal / Do Not Drive Status Badge */}
                <div className={`px-4 py-2 rounded-lg font-extrabold text-xs sm:text-sm flex items-center gap-2 shrink-0 ${
                  roadLegalStatus === 'Road-Legal'
                    ? 'bg-[#E3FDFD] text-[#061d23]'
                    : 'bg-[#CBF1F5] text-[#061d23]'
                }`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${roadLegalStatus === 'Road-Legal' ? 'bg-[#71C9CE]' : 'bg-[#061d23]'}`}></span>
                  {roadLegalStatus}
                </div>
              </div>

              {/* Vehicle Selection Switcher */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100/60">
                <label className="text-xs font-bold text-slate-700 shrink-0">Switch Vehicle:</label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="bg-white/90 text-slate-900 text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE] w-full"
                >
                  {driverVehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.plate} - {v.model} ({v.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Vehicle Compliance Summary Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
                <div className="p-3 bg-[#E3FDFD]/60 rounded-lg border-0 flex flex-col gap-1 text-xs">
                  <span className="text-slate-600 font-semibold">Insurance</span>
                  <span className="font-bold text-slate-900">{activeVehicle.insurance.status}</span>
                </div>
                <div className="p-3 bg-[#E3FDFD]/60 rounded-lg border-0 flex flex-col gap-1 text-xs">
                  <span className="text-slate-600 font-semibold">Inspection</span>
                  <span className="font-bold text-slate-900">{activeVehicle.inspection.status}</span>
                </div>
                <div className={`p-3 rounded-lg border-0 flex flex-col gap-1 text-xs ${
                  activeVehicle.emissions.status === 'Overdue' ? 'bg-[#CBF1F5]/80' : 'bg-[#E3FDFD]/60'
                }`}>
                  <span className="text-slate-600 font-semibold">Emissions</span>
                  <span className="font-bold text-slate-900">{activeVehicle.emissions.status}</span>
                </div>
                <div className="p-3 bg-[#A6E3E9]/40 rounded-lg border-0 flex flex-col gap-1 text-xs">
                  <span className="text-slate-600 font-semibold">Service Clock</span>
                  <span className="font-bold text-slate-900">{activeVehicle.service.status}</span>
                </div>
              </div>
            </div>

            {/* Left Card 2: Pre-Trip Checklist Prompt (Quick Tap-Through) */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Pre-Trip Safety Checklist</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Quick tap-through inspection before starting today's trip.
                  </p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                  checklistCompleted ? 'bg-[#E3FDFD] text-slate-900' : 'bg-[#CBF1F5]/80 text-slate-900'
                }`}>
                  {checklistCompleted ? 'Completed Today' : 'Not Started'}
                </span>
              </div>

              {checklistNotice && (
                <div className={`p-3 rounded-lg border-0 text-xs sm:text-sm font-semibold ${
                  checklistNotice.type === 'success' ? 'bg-[#E3FDFD] text-slate-900' : 'bg-[#CBF1F5] text-slate-900'
                }`}>
                  {checklistNotice.text}
                </div>
              )}

              <form onSubmit={handleChecklistSubmit} className="flex flex-col gap-3">
                {/* Checkbox Item 1 */}
                <div
                  onClick={() => handleCheckItem('brakes')}
                  className={`p-3.5 rounded-lg cursor-pointer transition-colors flex items-center justify-between border-0 ${
                    checklist.brakes ? 'bg-[#E3FDFD]/80 text-slate-900' : 'bg-slate-100/60 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checklist.brakes}
                      onChange={() => {}}
                      className="w-4 h-4 text-[#71C9CE] rounded border-0 focus:ring-0 pointer-events-none"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold">1. Brakes & Air Pressure</span>
                      <span className="text-[11px] text-slate-500 font-medium">Brake pedal response and air pressure gauge verified.</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{checklist.brakes ? 'PASSED' : 'TAP TO VERIFY'}</span>
                </div>

                {/* Checkbox Item 2 */}
                <div
                  onClick={() => handleCheckItem('lights')}
                  className={`p-3.5 rounded-lg cursor-pointer transition-colors flex items-center justify-between border-0 ${
                    checklist.lights ? 'bg-[#E3FDFD]/80 text-slate-900' : 'bg-slate-100/60 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checklist.lights}
                      onChange={() => {}}
                      className="w-4 h-4 text-[#71C9CE] rounded border-0 focus:ring-0 pointer-events-none"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold">2. Headlights & Signal Lamps</span>
                      <span className="text-[11px] text-slate-500 font-medium">Headlamps, brake lights, and turn indicators tested.</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{checklist.lights ? 'PASSED' : 'TAP TO VERIFY'}</span>
                </div>

                {/* Checkbox Item 3 */}
                <div
                  onClick={() => handleCheckItem('tires')}
                  className={`p-3.5 rounded-lg cursor-pointer transition-colors flex items-center justify-between border-0 ${
                    checklist.tires ? 'bg-[#E3FDFD]/80 text-slate-900' : 'bg-slate-100/60 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checklist.tires}
                      onChange={() => {}}
                      className="w-4 h-4 text-[#71C9CE] rounded border-0 focus:ring-0 pointer-events-none"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold">3. Tires & Wheel Alignment</span>
                      <span className="text-[11px] text-slate-500 font-medium">Visual inspection for tread wear, cracks, and inflation.</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{checklist.tires ? 'PASSED' : 'TAP TO VERIFY'}</span>
                </div>

                {/* Checkbox Item 4 */}
                <div
                  onClick={() => handleCheckItem('fluids')}
                  className={`p-3.5 rounded-lg cursor-pointer transition-colors flex items-center justify-between border-0 ${
                    checklist.fluids ? 'bg-[#E3FDFD]/80 text-slate-900' : 'bg-slate-100/60 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checklist.fluids}
                      onChange={() => {}}
                      className="w-4 h-4 text-[#71C9CE] rounded border-0 focus:ring-0 pointer-events-none"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold">4. Engine Fluid Levels</span>
                      <span className="text-[11px] text-slate-500 font-medium">Engine oil, coolant reservoir, and washer fluid levels checked.</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{checklist.fluids ? 'PASSED' : 'TAP TO VERIFY'}</span>
                </div>

                {/* Checkbox Item 5 */}
                <div
                  onClick={() => handleCheckItem('safetyKit')}
                  className={`p-3.5 rounded-lg cursor-pointer transition-colors flex items-center justify-between border-0 ${
                    checklist.safetyKit ? 'bg-[#E3FDFD]/80 text-slate-900' : 'bg-slate-100/60 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checklist.safetyKit}
                      onChange={() => {}}
                      className="w-4 h-4 text-[#71C9CE] rounded border-0 focus:ring-0 pointer-events-none"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-bold">5. Safety Kit & Fire Extinguisher</span>
                      <span className="text-[11px] text-slate-500 font-medium">Reflective triangles, first aid kit, and extinguisher present.</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">{checklist.safetyKit ? 'PASSED' : 'TAP TO VERIFY'}</span>
                </div>

                <button
                  type="submit"
                  disabled={checklistCompleted}
                  className={`mt-2 font-extrabold text-xs sm:text-sm px-4.5 py-2.5 rounded-lg transition-colors border-0 ${
                    checklistCompleted
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950'
                  }`}
                >
                  {checklistCompleted ? 'Checklist Completed for Today' : 'Submit Pre-Trip Inspection'}
                </button>
              </form>
            </div>

          </div>

          {/* RIGHT MAIN COLUMN (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            
            {/* Right Card 1: Heads-Up Notice (Proactive Vehicle Alerts) */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Heads-Up Compliance Notice</h3>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">Vehicle Expiry Alerts</span>
              </div>

              <div className="flex flex-col gap-3">
                {headsUpNotices.length === 0 ? (
                  <p className="text-xs sm:text-sm text-slate-500 italic p-3.5 bg-slate-50 rounded-lg">
                    No active compliance warnings for vehicle {activeVehicle.plate}.
                  </p>
                ) : (
                  headsUpNotices.map((notice) => (
                    <div
                      key={notice.id}
                      className={`p-3.5 rounded-lg border-0 text-xs sm:text-sm flex flex-col gap-1 ${
                        notice.urgency === 'critical'
                          ? 'bg-[#CBF1F5]/80 text-slate-900'
                          : 'bg-[#E3FDFD] text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>{notice.title}</span>
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-white/90">
                          {activeVehicle.plate}
                        </span>
                      </div>
                      <span className="text-xs text-slate-700 font-medium">{notice.detail}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Card 2: Recent Checklist Status (Inspection Log History) */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recent Checklist Submissions</h3>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">Inspection Log</span>
              </div>

              <div className="flex flex-col gap-3.5">
                {checklistHistory.map((item) => (
                  <div key={item.id} className="p-3.5 bg-slate-100/60 rounded-lg border-0 flex flex-col gap-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>Vehicle: {item.vehicle}</span>
                      <span className="text-xs text-slate-500 font-medium">{item.date} at {item.time}</span>
                    </div>
                    <div className="flex items-center justify-between bg-[#E3FDFD]/60 p-2.5 rounded border-0 text-xs font-medium">
                      <span className="text-slate-800 font-bold">{item.status}</span>
                      <span className="text-slate-600">ID: {item.id}</span>
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Inspector: <span className="font-bold text-slate-900">{item.driver}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
