'use client';

import { useState } from 'react';
import RoleHeader from '../../cloned/components/RoleHeader';

const SERVICECENTER_LINKS = [
  { label: 'Dashboard', href: '/servicecenter/cloned' },
  { label: 'Service Queue', href: '/servicecenter/cloned/queue' },
  { label: 'Log Service', href: '/servicecenter/cloned/log-service' },
  { label: 'Vehicle Service History', href: '/servicecenter/cloned/history' },
  { label: 'Historical Entry', href: '/servicecenter/cloned/historical-entry' },
  { label: 'Predictive Detail', href: '/servicecenter/cloned/predictive-detail' },
];

const INITIAL_SERVICE_QUEUE = [
  {
    id: 'sq-1',
    vehicleId: 'v1',
    plateNumber: 'TN-09-AB-1234',
    name: 'Heavy Hauler Alpha',
    model: 'Volvo FH16 (2022)',
    currentMileage: 121500,
    dueMileage: 120000,
    urgency: 'Overdue',
    riskLevel: 'High',
    scheduledToday: true,
    branch: 'Chennai Hub',
    issueSummary: '120k km Preventive Maintenance & Engine Oil Flush',
  },
  {
    id: 'sq-2',
    vehicleId: 'v3',
    plateNumber: 'TN-37-EF-9012',
    name: 'LogiTrans Gamma',
    model: 'BharatBenz 2823C (2021)',
    currentMileage: 94800,
    dueMileage: 95000,
    urgency: 'Due Today',
    riskLevel: 'High',
    scheduledToday: true,
    branch: 'Madurai Hub',
    issueSummary: 'Brake Liner Inspection & Differential Gear Oil Replacement',
  },
  {
    id: 'sq-3',
    vehicleId: 'v2',
    plateNumber: 'TN-14-CD-5678',
    name: 'Cargo Express Beta',
    model: 'Tata Signa 4825 (2023)',
    currentMileage: 81200,
    dueMileage: 85000,
    urgency: 'Scheduled Soon',
    riskLevel: 'Medium',
    scheduledToday: false,
    branch: 'Coimbatore Hub',
    issueSummary: 'Routine 85k km Inspection & Air Filter Change',
  },
  {
    id: 'sq-4',
    vehicleId: 'v5',
    plateNumber: 'TN-11-IJ-7890',
    name: 'Coastal Transport Epsilon',
    model: 'Ashok Leyland 3520 (2022)',
    currentMileage: 67900,
    dueMileage: 70000,
    urgency: 'Scheduled Soon',
    riskLevel: 'Medium',
    scheduledToday: false,
    branch: 'Salem Hub',
    issueSummary: 'Transmission Fluid Flushing & Suspension Check',
  },
  {
    id: 'sq-5',
    vehicleId: 'v4',
    plateNumber: 'TN-01-GH-3456',
    name: 'Metro Hauler Delta',
    model: 'Eicher Pro 6028 (2024)',
    currentMileage: 39500,
    dueMileage: 40000,
    urgency: 'Due Today',
    riskLevel: 'Low',
    scheduledToday: true,
    branch: 'Chennai Hub',
    issueSummary: '40k km Service Check & Wheel Alignment',
  },
];

const INITIAL_COMPLETED_SERVICES = [
  {
    id: 'cs-1',
    plateNumber: 'TN-05-KL-2345',
    vehicleName: 'Southern Logistics Zeta',
    serviceType: '50,000 km Major Overhaul',
    odometer: 50120,
    completedAt: '2026-08-06 11:20 AM',
    mechanicName: 'Master Tech Vikram',
    clockResetStatus: 'Service Clock Reset (+15,000 km)',
    notes: 'Engine oil, fuel filters, and brake pads replaced. All diagnostic checks passed.',
  },
  {
    id: 'cs-2',
    plateNumber: 'TN-22-XY-9988',
    vehicleName: 'Express Cargo 09',
    serviceType: 'Preventive Safety Inspection',
    odometer: 64200,
    completedAt: '2026-08-05 03:45 PM',
    mechanicName: 'Service Tech Ramesh',
    clockResetStatus: 'Service Clock Reset (+10,000 km)',
    notes: 'Safety inspection completed. Replaced headlamp bulb.',
  },
];

export default function StandaloneServiceCenterDashboard() {
  const [queue, setQueue] = useState(INITIAL_SERVICE_QUEUE);
  const [completedServices, setCompletedServices] = useState(INITIAL_COMPLETED_SERVICES);
  
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [odometerInput, setOdometerInput] = useState('');
  const [serviceType, setServiceType] = useState('Full Preventive Servicing');
  const [serviceNotes, setServiceNotes] = useState('');
  const [notice, setNotice] = useState(null);

  const [queueFilter, setQueueFilter] = useState('all');

  const totalInQueue = queue.length;
  const overdueCount = queue.filter((item) => item.urgency === 'Overdue').length;
  const scheduledTodayCount = queue.filter((item) => item.scheduledToday).length;
  const highRiskCount = queue.filter((item) => item.riskLevel === 'High').length;

  const handleSelectVehicleForLog = (vehId) => {
    setSelectedVehicleId(vehId);
    const item = queue.find((q) => q.vehicleId === vehId);
    if (item) {
      setOdometerInput(String(item.currentMileage + 50));
    }
  };

  const handleLogService = (e) => {
    e.preventDefault();
    setNotice(null);

    if (!selectedVehicleId || !odometerInput) {
      setNotice({
        type: 'error',
        message: 'Please select a vehicle from the service queue and enter the recorded odometer reading.',
      });
      return;
    }

    const queueItem = queue.find((q) => q.vehicleId === selectedVehicleId);
    if (!queueItem) return;

    const newCompleted = {
      id: `cs-${Date.now()}`,
      plateNumber: queueItem.plateNumber,
      vehicleName: queueItem.name,
      serviceType: serviceType,
      odometer: Number(odometerInput),
      completedAt: new Date().toLocaleString(),
      mechanicName: 'Senior Mechanic (You)',
      clockResetStatus: 'Service Clock Automatically Reset (+15,000 km)',
      notes: serviceNotes.trim() || 'Scheduled service performed. Vehicle cleared for deployment.',
    };

    setQueue((prev) => prev.filter((q) => q.vehicleId !== selectedVehicleId));
    setCompletedServices([newCompleted, ...completedServices]);

    setNotice({
      type: 'success',
      message: `Service logged for ${queueItem.plateNumber}! Service-due clock automatically reset.`,
    });

    setSelectedVehicleId('');
    setOdometerInput('');
    setServiceNotes('');
  };

  const filteredQueue = queue.filter((item) => {
    if (queueFilter === 'overdue') return item.urgency === 'Overdue';
    if (queueFilter === 'today') return item.scheduledToday;
    if (queueFilter === 'highrisk') return item.riskLevel === 'High';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader
        roleTitle="Service Center Workshop"
        roleBadge="Maintenance Queue & Clock Resets"
        links={SERVICECENTER_LINKS}
        activeLink="/servicecenter/cloned"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Service Center & Workshop Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Servicing queue, priority risk flags, and one-click compliance clock reset logging.
          </p>
        </div>

        {/* 1. WORKSHOP KPI STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setQueueFilter('all')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
              queueFilter === 'all'
                ? 'bg-white border-[#71C9CE] ring-2 ring-[#71C9CE]/30 shadow-md'
                : 'bg-white border-slate-200 hover:border-[#A6E3E9]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Service Queue</span>
              <div className="w-9 h-9 rounded-xl bg-[#E3FDFD] flex items-center justify-center border border-[#A6E3E9]">
                <svg className="w-5 h-5 text-[#061d23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900">{totalInQueue}</span>
              <span className="text-xs font-semibold text-slate-500">Pending Vehicles</span>
            </div>
          </div>

          <div
            onClick={() => setQueueFilter('overdue')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
              queueFilter === 'overdue'
                ? 'bg-rose-50/80 border-rose-400 ring-2 ring-rose-300 shadow-md'
                : 'bg-white border-slate-200 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Overdue Service</span>
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center border border-rose-200">
                <svg className="w-5 h-5 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-rose-700">{overdueCount}</span>
              <span className="text-xs font-semibold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-full">Urgent Maintenance</span>
            </div>
          </div>

          <div
            onClick={() => setQueueFilter('today')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
              queueFilter === 'today'
                ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300 shadow-md'
                : 'bg-white border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Due Today</span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-200">
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-800">{scheduledTodayCount}</span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Scheduled Slot</span>
            </div>
          </div>

          <div
            onClick={() => setQueueFilter('highrisk')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
              queueFilter === 'highrisk'
                ? 'bg-[#E3FDFD] border-[#71C9CE] ring-2 ring-[#71C9CE]/30 shadow-md'
                : 'bg-white border-slate-200 hover:border-[#A6E3E9]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">High Risk Flags</span>
              <div className="w-9 h-9 rounded-xl bg-[#CBF1F5] flex items-center justify-center border border-[#71C9CE]">
                <svg className="w-5 h-5 text-[#061d23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900">{highRiskCount}</span>
              <span className="text-xs font-semibold text-slate-700 bg-[#A6E3E9]/50 px-2 py-0.5 rounded-full">
                Predictive Maintenance
              </span>
            </div>
          </div>
        </div>

        {/* 2. MAIN GRID: QUEUE CARDS + LOG SERVICE FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Service Queue</h2>
                  <p className="text-xs text-slate-500">Vehicles sorted by urgency and predictive maintenance risk</p>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
                  <button
                    onClick={() => setQueueFilter('all')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      queueFilter === 'all' ? 'bg-[#71C9CE] text-slate-950 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    All ({queue.length})
                  </button>
                  <button
                    onClick={() => setQueueFilter('overdue')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      queueFilter === 'overdue' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Overdue ({overdueCount})
                  </button>
                  <button
                    onClick={() => setQueueFilter('today')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      queueFilter === 'today' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    Today ({scheduledTodayCount})
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {filteredQueue.length === 0 ? (
                  <p className="text-xs text-slate-500 py-8 text-center font-medium">
                    No vehicles found matching the selected queue filter.
                  </p>
                ) : (
                  filteredQueue.map((item) => {
                    const kmDiff = item.dueMileage - item.currentMileage;
                    const isOverdue = kmDiff <= 0;

                    return (
                      <div
                        key={item.id}
                        className={`p-5 rounded-2xl border transition-all shadow-sm hover:shadow-md ${
                          selectedVehicleId === item.vehicleId
                            ? 'bg-[#E3FDFD]/50 border-[#71C9CE] ring-2 ring-[#71C9CE]/40'
                            : 'bg-white border-slate-200 hover:border-[#A6E3E9]'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-extrabold text-slate-900 text-sm">{item.plateNumber}</span>
                              <span className="text-xs font-semibold text-slate-500">• {item.name}</span>
                              
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                isOverdue
                                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                  : item.scheduledToday
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-[#E3FDFD] text-[#061d23] border border-[#A6E3E9]'
                              }`}>
                                {isOverdue ? `OVERDUE (${Math.abs(kmDiff).toLocaleString()} km)` : item.urgency}
                              </span>

                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.riskLevel === 'High'
                                  ? 'bg-[#71C9CE]/20 text-[#061d23] border border-[#71C9CE]/40'
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                Risk: {item.riskLevel}
                              </span>
                            </div>

                            <p className="text-xs font-semibold text-slate-700 mt-1">{item.issueSummary}</p>
                            <div className="text-[11px] text-slate-500 mt-1 font-medium">
                              Current Odometer: <span className="font-bold text-slate-800">{item.currentMileage.toLocaleString()} km</span> | Service Target: <span className="font-bold text-slate-800">{item.dueMileage.toLocaleString()} km</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleSelectVehicleForLog(item.vehicleId)}
                            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 transition-all cursor-pointer shrink-0 shadow-sm flex items-center justify-center gap-1.5"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Log Service Now</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Log Service & Reset Clock</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Automatically resets the compliance clock on submit</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#E3FDFD] flex items-center justify-center border border-[#A6E3E9]">
                  <svg className="w-4 h-4 text-[#71C9CE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              {notice && (
                <div className={`mt-4 p-3.5 rounded-xl text-xs font-semibold flex items-start gap-2.5 ${
                  notice.type === 'error'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                }`}>
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{notice.message}</span>
                </div>
              )}

              <form onSubmit={handleLogService} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Select Vehicle from Queue
                  </label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => handleSelectVehicleForLog(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE] transition-all"
                  >
                    <option value="">-- Choose Queue Vehicle --</option>
                    {queue.map((q) => (
                      <option key={q.vehicleId} value={q.vehicleId}>
                        {q.plateNumber} — {q.name} ({q.urgency})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Service Category / Action
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE] transition-all"
                  >
                    <option value="Full Preventive Servicing">Full Preventive Servicing</option>
                    <option value="Brake Pad & Liner Overhaul">Brake Pad & Liner Overhaul</option>
                    <option value="Engine Oil & Filter Flush">Engine Oil & Filter Flush</option>
                    <option value="Transmission & Gearbox Flush">Transmission & Gearbox Flush</option>
                    <option value="Annual Safety Inspection Reset">Annual Safety Inspection Reset</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Recorded Odometer Mileage (km) *
                  </label>
                  <input
                    type="number"
                    value={odometerInput}
                    onChange={(e) => setOdometerInput(e.target.value)}
                    placeholder="e.g. 121550"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Work Order Notes & Parts Replaced
                  </label>
                  <textarea
                    rows={3}
                    value={serviceNotes}
                    onChange={(e) => setServiceNotes(e.target.value)}
                    placeholder="Specify work details, replacement parts, technician sign-off..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-extrabold bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete Service & Reset Clock</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 3. RECENTLY COMPLETED SERVICES TIMELINE */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Recently Completed Services Feed</h2>
              <p className="text-xs text-slate-500">Live timeline confirming completed work and automatic compliance clock resets</p>
            </div>
            <span className="text-xs font-extrabold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
              {completedServices.length} Completed Logs
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {completedServices.map((cs) => (
              <div key={cs.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-slate-900">{cs.plateNumber}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-800">{cs.serviceType}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md text-[11px]">
                      ✓ {cs.clockResetStatus}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">{cs.notes}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-800 block">{cs.odometer.toLocaleString()} km recorded</span>
                  <span className="text-[11px] font-semibold text-slate-500 block">{cs.completedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
