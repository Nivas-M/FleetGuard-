'use client';

import { useState } from 'react';
import Navbar from '../components/navbar';

export default function FleetManagerDashboard() {
  // Mock Vehicles Data
  const initialVehicles = [
    {
      id: 'VH001',
      plate: 'TN-02-CD-5678',
      model: 'Volvo FH16 Heavy Freight',
      assignedDriver: 'John Smith',
      location: 'Tamil Nadu, Sector 4',
      mileage: '85,400 km',
      serviceInterval: '80,000 km',
      insurance: { status: 'Valid', expiry: '2026-12-15' },
      inspection: { status: 'Valid', expiry: '2026-11-20' },
      emissions: { status: 'Valid', expiry: '2026-10-05' },
      service: { status: 'Due Soon', lastService: '2026-02-10' },
      riskLevel: 'Medium',
    },
    {
      id: 'VH002',
      plate: 'TN-09-EF-1122',
      model: 'Tata Prima Express Truck',
      assignedDriver: 'Unassigned',
      location: 'Chennai Central Hub',
      mileage: '112,000 km',
      serviceInterval: '100,000 km',
      insurance: { status: 'Valid', expiry: '2026-09-30' },
      inspection: { status: 'Valid', expiry: '2026-08-15' },
      emissions: { status: 'Overdue', expiry: '2026-07-25' },
      service: { status: 'Overdue', lastService: '2025-11-12' },
      riskLevel: 'High',
    },
    {
      id: 'VH003',
      plate: 'TN-14-GH-3344',
      model: 'Ashok Leyland 2820',
      assignedDriver: 'Mike Davis',
      location: 'Coimbatore Hub Depot',
      mileage: '145,800 km',
      serviceInterval: '120,000 km',
      insurance: { status: 'Overdue', expiry: '2026-07-10' },
      inspection: { status: 'Expiring Soon', expiry: '2026-08-05' },
      emissions: { status: 'Valid', expiry: '2026-11-01' },
      service: { status: 'Overdue', lastService: '2025-09-18' },
      riskLevel: 'High',
    },
    {
      id: 'VH004',
      plate: 'TN-37-JK-9988',
      model: 'Eicher Pro 6028',
      assignedDriver: 'Sarah Johnson',
      location: 'Madurai Distribution Center',
      mileage: '42,100 km',
      serviceInterval: '60,000 km',
      insurance: { status: 'Valid', expiry: '2027-03-14' },
      inspection: { status: 'Valid', expiry: '2027-02-10' },
      emissions: { status: 'Expiring Soon', expiry: '2026-08-08' },
      service: { status: 'Up-to-Date', lastService: '2026-04-22' },
      riskLevel: 'Low',
    },
    {
      id: 'VH005',
      plate: 'TN-45-LM-4455',
      model: 'BharatBenz 3528C',
      assignedDriver: 'Randy Gouse',
      location: 'Salem Freight Station',
      mileage: '98,300 km',
      serviceInterval: '90,000 km',
      insurance: { status: 'Valid', expiry: '2026-11-18' },
      inspection: { status: 'Overdue', expiry: '2026-07-15' },
      emissions: { status: 'Valid', expiry: '2026-10-30' },
      service: { status: 'Up-to-Date', lastService: '2026-05-30' },
      riskLevel: 'High',
    },
    {
      id: 'VH006',
      plate: 'TN-72-NP-7711',
      model: 'Mahindra Blazo X 28',
      assignedDriver: 'Giana Schleifer',
      location: 'Trichy Logistics Park',
      mileage: '31,500 km',
      serviceInterval: '50,000 km',
      insurance: { status: 'Valid', expiry: '2027-01-20' },
      inspection: { status: 'Valid', expiry: '2026-12-10' },
      emissions: { status: 'Valid', expiry: '2026-11-15' },
      service: { status: 'Up-to-Date', lastService: '2026-06-05' },
      riskLevel: 'Low',
    },
  ];

  const driversList = [
    { id: 'DRV001', name: 'John Smith', role: 'Senior Driver', cert: 'Heavy Freight' },
    { id: 'DRV002', name: 'Sarah Johnson', role: 'Mid-Level', cert: 'Interstate Haul' },
    { id: 'DRV003', name: 'Mike Davis', role: 'Senior Driver', cert: 'Hazmat & Heavy' },
    { id: 'DRV004', name: 'Randy Gouse', role: 'Senior Driver', cert: 'Heavy Duty' },
    { id: 'DRV005', name: 'Giana Schleifer', role: 'Mid-Level', cert: 'Express Logistics' },
    { id: 'DRV006', name: 'Alex Rivera', role: 'Junior Driver', cert: 'Local Dispatch' },
  ];

  const initialOverrides = [
    {
      id: 'OVR-102',
      who: 'Alex Morgan (Fleet Mgr)',
      vehicle: 'TN-14-GH-3344',
      reason: 'Urgent medical inventory delivery; service dock appointment booked for 18:00 today.',
      timestamp: '2026-07-30 14:15',
    },
    {
      id: 'OVR-101',
      who: 'Alex Morgan (Fleet Mgr)',
      vehicle: 'TN-09-EF-1122',
      reason: 'Assigned for local depot shuttle pending PUC renewal receipt from testing vendor.',
      timestamp: '2026-07-29 09:30',
    },
  ];

  // State Management
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [overrides, setOverrides] = useState(initialOverrides);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [selectedDriverName, setSelectedDriverName] = useState('');
  const [overrideReason, setOverrideReason] = useState('');
  const [assignmentNotice, setAssignmentNotice] = useState(null);
  const [tableFilter, setTableFilter] = useState('all');
  const [notificationTab, setNotificationTab] = useState('all');

  // Helper Functions
  const getVehicleComplianceStatus = (v) => {
    const statuses = [v.insurance.status, v.inspection.status, v.emissions.status, v.service.status];
    if (statuses.includes('Overdue')) return { status: 'Non-Compliant', badge: 'bg-[#CBF1F5] text-[#061d23]' };
    if (statuses.includes('Expiring Soon') || statuses.includes('Due Soon')) return { status: 'Action Required', badge: 'bg-[#A6E3E9]/40 text-[#061d23]' };
    return { status: 'Compliant', badge: 'bg-[#E3FDFD] text-[#061d23]' };
  };

  const getNonCompliantReasons = (v) => {
    if (!v) return [];
    const reasons = [];
    if (v.insurance.status === 'Overdue') reasons.push('Insurance Overdue');
    if (v.inspection.status === 'Overdue') reasons.push('Inspection Overdue');
    if (v.emissions.status === 'Overdue') reasons.push('Emissions (PUC) Overdue');
    if (v.service.status === 'Overdue') reasons.push('Maintenance Service Overdue');
    return reasons;
  };

  const selectedVehicleObj = vehicles.find((v) => v.id === selectedVehicleId);
  const nonCompliantIssues = selectedVehicleObj ? getNonCompliantReasons(selectedVehicleObj) : [];
  const isSelectedVehicleBlocked = nonCompliantIssues.length > 0;

  // Stat computations
  const totalVehiclesCount = vehicles.length;
  const overdueCount = vehicles.filter((v) => getVehicleComplianceStatus(v).status === 'Non-Compliant').length;
  const expiringSoonCount = vehicles.filter((v) => getVehicleComplianceStatus(v).status === 'Action Required').length;
  const highRiskCount = vehicles.filter((v) => v.riskLevel === 'High').length;

  const lowRiskCount = vehicles.filter((v) => v.riskLevel === 'Low').length;
  const medRiskCount = vehicles.filter((v) => v.riskLevel === 'Medium').length;

  // Driver Assignment Handler
  const handleAssignDriver = (e) => {
    e.preventDefault();
    if (!selectedVehicleId || !selectedDriverName) {
      setAssignmentNotice({ type: 'error', text: 'Please select both a vehicle and a driver.' });
      return;
    }

    if (isSelectedVehicleBlocked && !overrideReason.trim()) {
      setAssignmentNotice({
        type: 'error',
        text: 'Hard Block Active: Vehicle has overdue compliance issues. An explicit override reason is mandatory.',
      });
      return;
    }

    setVehicles((prev) =>
      prev.map((v) => (v.id === selectedVehicleId ? { ...v, assignedDriver: selectedDriverName } : v))
    );

    let noticeText = `Assigned ${selectedDriverName} to vehicle ${selectedVehicleObj.plate}.`;

    if (isSelectedVehicleBlocked) {
      const newOverride = {
        id: `OVR-${100 + overrides.length + 1}`,
        who: 'Alex Morgan (Fleet Mgr)',
        vehicle: selectedVehicleObj.plate,
        reason: overrideReason.trim(),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };
      setOverrides([newOverride, ...overrides]);
      noticeText = `Driver assigned via logged override for non-compliant vehicle ${selectedVehicleObj.plate}.`;
    }

    setAssignmentNotice({ type: 'success', text: noticeText });
    setSelectedVehicleId('');
    setSelectedDriverName('');
    setOverrideReason('');

    setTimeout(() => setAssignmentNotice(null), 5000);
  };

  // Filtered vehicles for table
  const filteredVehicles = vehicles.filter((v) => {
    const comp = getVehicleComplianceStatus(v);
    if (tableFilter === 'non-compliant') return comp.status === 'Non-Compliant';
    if (tableFilter === 'expiring') return comp.status === 'Action Required';
    if (tableFilter === 'high-risk') return v.riskLevel === 'High';
    return true;
  });

  // Extract all active notifications
  const allNotifications = [];
  vehicles.forEach((v) => {
    if (v.insurance.status === 'Overdue') {
      allNotifications.push({ id: `${v.id}-ins`, vehicle: v.plate, type: 'overdue', title: 'Insurance Policy Expired', detail: `Expired on ${v.insurance.expiry}` });
    } else if (v.insurance.status === 'Expiring Soon') {
      allNotifications.push({ id: `${v.id}-ins`, vehicle: v.plate, type: 'expiring', title: 'Insurance Expiring Soon', detail: `Expires on ${v.insurance.expiry}` });
    }

    if (v.inspection.status === 'Overdue') {
      allNotifications.push({ id: `${v.id}-insp`, vehicle: v.plate, type: 'overdue', title: 'Safety Inspection Overdue', detail: `Lapsed on ${v.inspection.expiry}` });
    } else if (v.inspection.status === 'Expiring Soon') {
      allNotifications.push({ id: `${v.id}-insp`, vehicle: v.plate, type: 'expiring', title: 'Safety Inspection Due Soon', detail: `Expires on ${v.inspection.expiry}` });
    }

    if (v.emissions.status === 'Overdue') {
      allNotifications.push({ id: `${v.id}-emi`, vehicle: v.plate, type: 'overdue', title: 'PUC / Emissions Certificate Expired', detail: `Expired on ${v.emissions.expiry}` });
    } else if (v.emissions.status === 'Expiring Soon') {
      allNotifications.push({ id: `${v.id}-emi`, vehicle: v.plate, type: 'expiring', title: 'Emissions Renewal Due Soon', detail: `Expires on ${v.emissions.expiry}` });
    }

    if (v.service.status === 'Overdue') {
      allNotifications.push({ id: `${v.id}-srv`, vehicle: v.plate, type: 'overdue', title: 'Scheduled Maintenance Overdue', detail: `Last serviced: ${v.service.lastService}` });
    } else if (v.service.status === 'Due Soon') {
      allNotifications.push({ id: `${v.id}-srv`, vehicle: v.plate, type: 'expiring', title: 'Routine Maintenance Due Soon', detail: `Last serviced: ${v.service.lastService}` });
    }
  });

  const filteredNotifications = allNotifications.filter((n) => {
    if (notificationTab === 'overdue') return n.type === 'overdue';
    if (notificationTab === 'expiring') return n.type === 'expiring';
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans p-5 sm:p-7 lg:p-8">
      <div className="max-w-[1470px] mx-auto flex flex-col gap-7">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Header Title Section */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-sm font-bold text-[#71C9CE] uppercase tracking-wider">Welcome Back</h2>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Fleet Manager Dashboard</h1>
          <p className="text-sm text-slate-600 mt-0.5 font-medium">
            At-a-glance fleet compliance, driver assignment enforcement, and predictive risk summary.
          </p>
        </div>

        {/* DASHBOARD GRID (Border-Free Cards Blending Smoothly into Canvas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* LEFT MAIN COLUMN (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            
            {/* Left Card 1 (TOP 1st): Fleet Summary Stat Cards (Border-free blended card) */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Fleet Summary Stats</h3>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">Live Metrics</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-3.5 bg-[#E3FDFD]/60 rounded-lg border-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600">Total Vehicles</span>
                  <span className="text-3xl font-extrabold text-slate-900">{totalVehiclesCount}</span>
                </div>
                <div className="p-3.5 bg-[#CBF1F5]/80 rounded-lg border-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Overdue</span>
                  <span className="text-3xl font-extrabold text-slate-900">{overdueCount}</span>
                </div>
                <div className="p-3.5 bg-[#A6E3E9]/40 rounded-lg border-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Expiring Soon</span>
                  <span className="text-3xl font-extrabold text-slate-900">{expiringSoonCount}</span>
                </div>
                <div className="p-3.5 bg-[#71C9CE]/20 rounded-lg border-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">High Risk</span>
                  <span className="text-3xl font-extrabold text-slate-900">{highRiskCount}</span>
                </div>
              </div>
            </div>

            {/* Left Card 2: Quick Driver Assignment */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Quick Driver Assignment</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Assign drivers with hard-block compliance checks.
                </p>
              </div>

              {assignmentNotice && (
                <div className={`p-3 rounded-lg border-0 text-xs sm:text-sm font-semibold ${
                  assignmentNotice.type === 'success'
                    ? 'bg-[#E3FDFD] text-slate-900'
                    : 'bg-[#CBF1F5] text-slate-900'
                }`}>
                  {assignmentNotice.text}
                </div>
              )}

              <form onSubmit={handleAssignDriver} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-800">Select Vehicle</label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => {
                      setSelectedVehicleId(e.target.value);
                      setAssignmentNotice(null);
                    }}
                    className="bg-white/90 text-slate-900 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  >
                    <option value="">-- Choose Vehicle --</option>
                    {vehicles.map((v) => {
                      const comp = getVehicleComplianceStatus(v);
                      return (
                        <option key={v.id} value={v.id}>
                          {v.plate} ({v.model}) - [{comp.status}]
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Hard Block Warning */}
                {selectedVehicleObj && isSelectedVehicleBlocked && (
                  <div className="p-3.5 rounded-lg bg-[#CBF1F5]/70 border-0 text-slate-900 text-xs sm:text-sm flex flex-col gap-1">
                    <span className="font-bold flex items-center gap-1.5 text-slate-900">
                      <svg className="w-4 h-4 text-[#71C9CE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Hard Block Active
                    </span>
                    <p className="text-xs text-slate-700 font-medium">
                      Overdue items: {nonCompliantIssues.join(', ')}.
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-800">Select Driver</label>
                  <select
                    value={selectedDriverName}
                    onChange={(e) => setSelectedDriverName(e.target.value)}
                    className="bg-white/90 text-slate-900 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  >
                    <option value="">-- Choose Driver --</option>
                    {driversList.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.role})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Override Reason Field */}
                {isSelectedVehicleBlocked && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Override Reason (Mandatory)
                    </label>
                    <textarea
                      rows="2"
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      placeholder="Enter reason..."
                      className="bg-white/90 text-slate-900 text-xs sm:text-sm p-3 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs sm:text-sm px-4.5 py-2.5 rounded-lg transition-colors mt-1"
                >
                  {isSelectedVehicleBlocked ? 'Override & Assign' : 'Assign Driver'}
                </button>
              </form>
            </div>

            {/* Left Card 3: Risk Flags Summary */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Risk Flags Summary</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Predictive risk level based on mileage vs service intervals.
                </p>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="p-3.5 bg-[#E3FDFD]/60 rounded-lg border-0 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">Low Risk</span>
                  <span className="text-xl font-extrabold text-slate-900">{lowRiskCount} vehicles</span>
                </div>
                <div className="p-3.5 bg-[#CBF1F5]/80 rounded-lg border-0 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Medium Risk</span>
                  <span className="text-xl font-extrabold text-slate-900">{medRiskCount} vehicles</span>
                </div>
                <div className="p-3.5 bg-[#A6E3E9]/50 rounded-lg border-0 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">High Risk</span>
                  <span className="text-xl font-extrabold text-slate-900">{highRiskCount} vehicles</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-600 font-bold">Fleet Risk Ratio</span>
                <div className="w-full bg-slate-200/60 rounded-full h-2.5 overflow-hidden flex border-0">
                  <div style={{ width: `${(lowRiskCount / totalVehiclesCount) * 100}%` }} className="bg-[#E3FDFD] h-full"></div>
                  <div style={{ width: `${(medRiskCount / totalVehiclesCount) * 100}%` }} className="bg-[#A6E3E9] h-full"></div>
                  <div style={{ width: `${(highRiskCount / totalVehiclesCount) * 100}%` }} className="bg-[#71C9CE] h-full"></div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT MAIN COLUMN (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            
            {/* Right Card 1: Notifications Panel */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Notifications Panel</h3>
                <div className="flex items-center gap-1 text-xs sm:text-sm font-bold">
                  <button
                    onClick={() => setNotificationTab('all')}
                    className={`px-2.5 py-1 rounded transition-colors ${notificationTab === 'all' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    All ({allNotifications.length})
                  </button>
                  <button
                    onClick={() => setNotificationTab('overdue')}
                    className={`px-2.5 py-1 rounded transition-colors ${notificationTab === 'overdue' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    Overdue ({allNotifications.filter(n => n.type === 'overdue').length})
                  </button>
                  <button
                    onClick={() => setNotificationTab('expiring')}
                    className={`px-2.5 py-1 rounded transition-colors ${notificationTab === 'expiring' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    Expiring ({allNotifications.filter(n => n.type === 'expiring').length})
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3.5 rounded-lg border-0 text-xs sm:text-sm flex flex-col gap-1 ${
                      notif.type === 'overdue'
                        ? 'bg-[#CBF1F5]/80 text-slate-900'
                        : 'bg-[#E3FDFD] text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{notif.title}</span>
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-white/90">
                        {notif.vehicle}
                      </span>
                    </div>
                    <span className="text-xs text-slate-700 font-medium">{notif.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card 2: Recent Overrides (Mini-Log) */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recent Overrides (Mini-Log)</h3>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">Audit Trail</span>
              </div>

              <div className="flex flex-col gap-3.5">
                {overrides.length === 0 ? (
                  <p className="text-xs sm:text-sm text-slate-500 italic">No recent overrides logged.</p>
                ) : (
                  overrides.map((ovr) => (
                    <div key={ovr.id} className="p-3.5 bg-slate-100/60 rounded-lg border-0 flex flex-col gap-2 text-xs sm:text-sm">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{ovr.vehicle}</span>
                        <span className="text-xs text-slate-500 font-medium">{ovr.timestamp}</span>
                      </div>
                      <p className="text-slate-800 italic bg-[#E3FDFD]/60 p-2.5 rounded border-0 text-xs font-medium">
                        "{ovr.reason}"
                      </p>
                      <div className="text-xs text-slate-600 font-medium">
                        Authorized by: <span className="font-bold text-slate-900">{ovr.who}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Card 3 (DOWN-RIGHT): Compliance Overview Table */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Compliance Overview Table</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Per-vehicle status across Insurance, Inspection, Emissions, Service, and Assigned Driver.
                  </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold">
                  <button
                    onClick={() => setTableFilter('all')}
                    className={`px-3.5 py-1.5 rounded-lg border-0 transition-colors ${
                      tableFilter === 'all'
                        ? 'bg-[#71C9CE] text-slate-950'
                        : 'bg-white/80 text-slate-700 hover:bg-[#E3FDFD]'
                    }`}
                  >
                    All ({vehicles.length})
                  </button>
                  <button
                    onClick={() => setTableFilter('non-compliant')}
                    className={`px-3.5 py-1.5 rounded-lg border-0 transition-colors ${
                      tableFilter === 'non-compliant'
                        ? 'bg-[#71C9CE] text-slate-950'
                        : 'bg-white/80 text-slate-700 hover:bg-[#E3FDFD]'
                    }`}
                  >
                    Non-Compliant ({overdueCount})
                  </button>
                  <button
                    onClick={() => setTableFilter('expiring')}
                    className={`px-3.5 py-1.5 rounded-lg border-0 transition-colors ${
                      tableFilter === 'expiring'
                        ? 'bg-[#71C9CE] text-slate-950'
                        : 'bg-white/80 text-slate-700 hover:bg-[#E3FDFD]'
                    }`}
                  >
                    Action Required ({expiringSoonCount})
                  </button>
                  <button
                    onClick={() => setTableFilter('high-risk')}
                    className={`px-3.5 py-1.5 rounded-lg border-0 transition-colors ${
                      tableFilter === 'high-risk'
                        ? 'bg-[#71C9CE] text-slate-950'
                        : 'bg-white/80 text-slate-700 hover:bg-[#E3FDFD]'
                    }`}
                  >
                    High Risk ({highRiskCount})
                  </button>
                </div>
              </div>

              {/* Table (Border-Free Blended Layout) */}
              <div className="overflow-x-auto rounded-xl border-0">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#CBF1F5]/40 text-slate-700 uppercase tracking-wider text-[11px] font-bold border-0">
                    <tr>
                      <th className="px-4 py-3.5">Vehicle</th>
                      <th className="px-4 py-3.5">Assigned Driver</th>
                      <th className="px-4 py-3.5">Insurance</th>
                      <th className="px-4 py-3.5">Inspection</th>
                      <th className="px-4 py-3.5">Emissions</th>
                      <th className="px-4 py-3.5">Service</th>
                      <th className="px-4 py-3.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/60 bg-white/70">
                    {filteredVehicles.map((v) => {
                      const comp = getVehicleComplianceStatus(v);
                      return (
                        <tr key={v.id} className="hover:bg-[#E3FDFD]/50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900">{v.plate}</span>
                              <span className="text-xs text-slate-500">{v.model}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 font-semibold text-slate-700">
                            {v.assignedDriver}
                          </td>
                          <td className="px-4 py-4 text-slate-600 font-medium">
                            {v.insurance.status}
                          </td>
                          <td className="px-4 py-4 text-slate-600 font-medium">
                            {v.inspection.status}
                          </td>
                          <td className="px-4 py-4 text-slate-600 font-medium">
                            {v.emissions.status}
                          </td>
                          <td className="px-4 py-4 text-slate-600 font-medium">
                            {v.service.status}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="font-bold text-slate-900">
                              {comp.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
