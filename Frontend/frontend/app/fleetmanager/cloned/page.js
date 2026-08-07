'use client';

import { useState } from 'react';
import RoleHeader from '../../cloned/components/RoleHeader';

const FLEETMANAGER_LINKS = [
  { label: 'Dashboard', href: '/fleetmanager/cloned' },
  { label: 'Vehicle Registry', href: '/fleetmanager/cloned/vehicles' },
  { label: 'Assignments Flow', href: '/fleetmanager/cloned/assignments' },
  { label: 'Override Log', href: '/fleetmanager/cloned/override-log' },
  { label: 'Alert Config', href: '/fleetmanager/cloned/alert-config' },
  { label: 'Historical Entry', href: '/fleetmanager/cloned/historical-entry' },
];

const INITIAL_VEHICLES = [
  {
    id: 'v1',
    plateNumber: 'TN-09-AB-1234',
    name: 'Heavy Hauler Alpha',
    model: 'Volvo FH16 (2022)',
    driverId: 'd1',
    driverName: 'Rajesh Kumar',
    insuranceExpiry: '2026-09-15',
    inspectionExpiry: '2026-08-01', // Overdue
    emissionsExpiry: '2026-11-20',
    lastServiceDate: '2026-05-10',
    serviceDueMileage: 120000,
    currentMileage: 118500,
    riskLevel: 'High',
    branch: 'Chennai Hub',
  },
  {
    id: 'v2',
    plateNumber: 'TN-14-CD-5678',
    name: 'Cargo Express Beta',
    model: 'Tata Signa 4825 (2023)',
    driverId: 'd2',
    driverName: 'Suresh Raina',
    insuranceExpiry: '2026-08-10', // Expiring soon
    inspectionExpiry: '2026-10-05',
    emissionsExpiry: '2026-12-01',
    lastServiceDate: '2026-06-15',
    serviceDueMileage: 85000,
    currentMileage: 81200,
    riskLevel: 'Medium',
    branch: 'Coimbatore Hub',
  },
  {
    id: 'v3',
    plateNumber: 'TN-37-EF-9012',
    name: 'LogiTrans Gamma',
    model: 'BharatBenz 2823C (2021)',
    driverId: null,
    driverName: 'Unassigned',
    insuranceExpiry: '2027-01-10',
    inspectionExpiry: '2026-07-28', // Overdue
    emissionsExpiry: '2026-08-12', // Expiring soon
    lastServiceDate: '2026-04-01',
    serviceDueMileage: 95000,
    currentMileage: 94800,
    riskLevel: 'High',
    branch: 'Madurai Hub',
  },
  {
    id: 'v4',
    plateNumber: 'TN-01-GH-3456',
    name: 'Metro Hauler Delta',
    model: 'Eicher Pro 6028 (2024)',
    driverId: 'd4',
    driverName: 'Anil Kapoor',
    insuranceExpiry: '2027-04-18',
    inspectionExpiry: '2027-03-30',
    emissionsExpiry: '2026-12-15',
    lastServiceDate: '2026-07-01',
    serviceDueMileage: 40000,
    currentMileage: 32000,
    riskLevel: 'Low',
    branch: 'Chennai Hub',
  },
  {
    id: 'v5',
    plateNumber: 'TN-11-IJ-7890',
    name: 'Coastal Transport Epsilon',
    model: 'Ashok Leyland 3520 (2022)',
    driverId: 'd5',
    driverName: 'Venkatesh Prasad',
    insuranceExpiry: '2026-08-14', // Expiring soon
    inspectionExpiry: '2026-11-10',
    emissionsExpiry: '2026-09-30',
    lastServiceDate: '2026-05-20',
    serviceDueMileage: 70000,
    currentMileage: 67900,
    riskLevel: 'Medium',
    branch: 'Salem Hub',
  },
  {
    id: 'v6',
    plateNumber: 'TN-05-KL-2345',
    name: 'Southern Logistics Zeta',
    model: 'Mahindra Blazo X (2023)',
    driverId: null,
    driverName: 'Unassigned',
    insuranceExpiry: '2027-02-28',
    inspectionExpiry: '2027-01-15',
    emissionsExpiry: '2027-03-10',
    lastServiceDate: '2026-06-28',
    serviceDueMileage: 50000,
    currentMileage: 41200,
    riskLevel: 'Low',
    branch: 'Chennai Hub',
  },
];

const INITIAL_DRIVERS = [
  { id: 'd1', name: 'Rajesh Kumar', license: 'DL-TN-2018-9941', status: 'Assigned', vehicle: 'TN-09-AB-1234' },
  { id: 'd2', name: 'Suresh Raina', license: 'DL-TN-2020-4412', status: 'Assigned', vehicle: 'TN-14-CD-5678' },
  { id: 'd3', name: 'Manoj Tiwari', license: 'DL-TN-2019-3381', status: 'Available', vehicle: 'None' },
  { id: 'd4', name: 'Anil Kapoor', license: 'DL-TN-2021-7729', status: 'Assigned', vehicle: 'TN-01-GH-3456' },
  { id: 'd5', name: 'Venkatesh Prasad', license: 'DL-TN-2017-1102', status: 'Assigned', vehicle: 'TN-11-IJ-7890' },
  { id: 'd6', name: 'Karthik Subramanian', license: 'DL-TN-2022-8821', status: 'Available', vehicle: 'None' },
];

const INITIAL_OVERRIDES = [
  {
    id: 'ov-1',
    vehiclePlate: 'TN-09-AB-1234',
    driverName: 'Rajesh Kumar',
    requestedBy: 'Fleet Manager (You)',
    reason: 'Critical medical supply shipment. Annual inspection appointment scheduled for tomorrow morning.',
    timestamp: '2026-08-06 09:30 AM',
    status: 'Approved',
  },
  {
    id: 'ov-2',
    vehiclePlate: 'TN-37-EF-9012',
    driverName: 'Manoj Tiwari',
    requestedBy: 'Fleet Manager (You)',
    reason: 'Emergency highway breakdown replacement. Insurance renewal under priority processing.',
    timestamp: '2026-08-05 04:15 PM',
    status: 'Approved',
  },
];

export default function StandaloneFleetManagerDashboard() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [overrides, setOverrides] = useState(INITIAL_OVERRIDES);
  
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [overrideReason, setOverrideReason] = useState('');
  const [notice, setNotice] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [notifTab, setNotifTab] = useState('all');

  const todayISO = new Date().toISOString().split('T')[0];

  const getDocStatus = (expiryDate) => {
    if (!expiryDate) return 'Valid';
    if (expiryDate < todayISO) return 'Overdue';
    const diffDays = Math.ceil((new Date(expiryDate) - new Date(todayISO)) / (1000 * 60 * 60 * 24));
    if (diffDays <= 30) return 'Expiring Soon';
    return 'Valid';
  };

  const getVehicleCompliance = (v) => {
    const statuses = [
      getDocStatus(v.insuranceExpiry),
      getDocStatus(v.inspectionExpiry),
      getDocStatus(v.emissionsExpiry),
    ];
    if (statuses.includes('Overdue')) {
      return { label: 'Non-Compliant', code: 'overdue', badgeBg: 'bg-rose-100 text-rose-800 border-rose-300' };
    }
    if (statuses.includes('Expiring Soon')) {
      return { label: 'Action Required', code: 'expiring', badgeBg: 'bg-amber-100 text-amber-900 border-amber-300' };
    }
    return { label: 'Compliant', code: 'compliant', badgeBg: 'bg-[#E3FDFD] text-[#061d23] border-[#A6E3E9]' };
  };

  const totalVehicles = vehicles.length;
  const overdueCount = vehicles.filter((v) => getVehicleCompliance(v).code === 'overdue').length;
  const expiringCount = vehicles.filter((v) => getVehicleCompliance(v).code === 'expiring').length;
  const highRiskCount = vehicles.filter((v) => v.riskLevel === 'High').length;
  const mediumRiskCount = vehicles.filter((v) => v.riskLevel === 'Medium').length;
  const lowRiskCount = vehicles.filter((v) => v.riskLevel === 'Low').length;

  const currentSelectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const selectedVehicleCompliance = currentSelectedVehicle ? getVehicleCompliance(currentSelectedVehicle) : null;
  const isNonCompliantSelection = selectedVehicleCompliance?.code === 'overdue';

  const handleAssignDriver = (e) => {
    e.preventDefault();
    setNotice(null);

    if (!selectedVehicleId || !selectedDriverId) {
      setNotice({ type: 'error', message: 'Please select both a vehicle and a driver.' });
      return;
    }

    if (isNonCompliantSelection && !overrideReason.trim()) {
      setNotice({
        type: 'error',
        message: 'Non-compliant vehicle selected! A clear override reason is strictly required to proceed.',
      });
      return;
    }

    const driverObj = drivers.find((d) => d.id === selectedDriverId);
    
    setVehicles((prev) =>
      prev.map((v) => (v.id === selectedVehicleId ? { ...v, driverId: driverObj.id, driverName: driverObj.name } : v))
    );

    setDrivers((prev) =>
      prev.map((d) =>
        d.id === selectedDriverId
          ? { ...d, status: 'Assigned', vehicle: currentSelectedVehicle.plateNumber }
          : d
      )
    );

    if (isNonCompliantSelection) {
      const newOverride = {
        id: `ov-${Date.now()}`,
        vehiclePlate: currentSelectedVehicle.plateNumber,
        driverName: driverObj.name,
        requestedBy: 'Fleet Manager (You)',
        reason: overrideReason.trim(),
        timestamp: new Date().toLocaleString(),
        status: 'Approved (Manager Override)',
      };
      setOverrides((prev) => [newOverride, ...prev]);
    }

    setNotice({
      type: 'success',
      message: `Driver ${driverObj.name} successfully assigned to ${currentSelectedVehicle.plateNumber}${
        isNonCompliantSelection ? ' with logged override.' : '.'
      }`,
    });

    setSelectedVehicleId('');
    setSelectedDriverId('');
    setOverrideReason('');
  };

  const filteredVehicles = vehicles.filter((v) => {
    const comp = getVehicleCompliance(v);
    if (statusFilter === 'overdue' && comp.code !== 'overdue') return false;
    if (statusFilter === 'expiring' && comp.code !== 'expiring') return false;
    if (statusFilter === 'compliant' && comp.code !== 'compliant') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        v.plateNumber.toLowerCase().includes(q) ||
        v.name.toLowerCase().includes(q) ||
        v.driverName.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const notifications = vehicles.flatMap((v) => {
    const list = [];
    const ins = getDocStatus(v.insuranceExpiry);
    const insp = getDocStatus(v.inspectionExpiry);
    const ems = getDocStatus(v.emissionsExpiry);

    if (ins === 'Overdue') list.push({ id: `${v.id}-ins`, vehicle: v.plateNumber, type: 'Overdue', doc: 'Insurance Policy', date: v.insuranceExpiry });
    else if (ins === 'Expiring Soon') list.push({ id: `${v.id}-ins`, vehicle: v.plateNumber, type: 'Expiring Soon', doc: 'Insurance Policy', date: v.insuranceExpiry });

    if (insp === 'Overdue') list.push({ id: `${v.id}-insp`, vehicle: v.plateNumber, type: 'Overdue', doc: 'Annual Safety Inspection', date: v.inspectionExpiry });
    else if (insp === 'Expiring Soon') list.push({ id: `${v.id}-insp`, vehicle: v.plateNumber, type: 'Expiring Soon', doc: 'Annual Safety Inspection', date: v.inspectionExpiry });

    if (ems === 'Overdue') list.push({ id: `${v.id}-ems`, vehicle: v.plateNumber, type: 'Overdue', doc: 'PUC Emissions Certificate', date: v.emissionsExpiry });
    else if (ems === 'Expiring Soon') list.push({ id: `${v.id}-ems`, vehicle: v.plateNumber, type: 'Expiring Soon', doc: 'PUC Emissions Certificate', date: v.emissionsExpiry });

    return list;
  });

  const filteredNotifications = notifications.filter((n) => {
    if (notifTab === 'overdue') return n.type === 'Overdue';
    if (notifTab === 'expiring') return n.type === 'Expiring Soon';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Top Role Header */}
      <RoleHeader
        roleTitle="Fleet Manager Portal"
        roleBadge="Fleet Operational Control"
        links={FLEETMANAGER_LINKS}
        activeLink="/fleetmanager/cloned"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Fleet Manager Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time fleet compliance, driver assignments, risk scoring, and override audit logs.
          </p>
        </div>

        {/* 1. FLEET SUMMARY STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setStatusFilter('all')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
              statusFilter === 'all'
                ? 'bg-white border-[#71C9CE] ring-2 ring-[#71C9CE]/30 shadow-md'
                : 'bg-white border-slate-200 hover:border-[#A6E3E9]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Vehicles</span>
              <div className="w-9 h-9 rounded-xl bg-[#E3FDFD] flex items-center justify-center border border-[#A6E3E9]">
                <svg className="w-5 h-5 text-[#061d23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900">{totalVehicles}</span>
              <span className="text-xs font-semibold text-slate-500">Active Fleet</span>
            </div>
          </div>

          <div
            onClick={() => setStatusFilter('overdue')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
              statusFilter === 'overdue'
                ? 'bg-rose-50/80 border-rose-400 ring-2 ring-rose-300 shadow-md'
                : 'bg-white border-slate-200 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Overdue Items</span>
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center border border-rose-200">
                <svg className="w-5 h-5 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-rose-700">{overdueCount}</span>
              <span className="text-xs font-semibold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-full">Requires Action</span>
            </div>
          </div>

          <div
            onClick={() => setStatusFilter('expiring')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-sm ${
              statusFilter === 'expiring'
                ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300 shadow-md'
                : 'bg-white border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Expiring Soon (30 Days)</span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-200">
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-800">{expiringCount}</span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Upcoming Renewal</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">High Risk Vehicles</span>
              <div className="w-9 h-9 rounded-xl bg-[#CBF1F5] flex items-center justify-center border border-[#71C9CE]">
                <svg className="w-5 h-5 text-[#061d23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900">{highRiskCount}</span>
              <span className="text-xs font-semibold text-slate-600 bg-[#E3FDFD] px-2 py-0.5 rounded-full border border-[#A6E3E9]/50">
                Predictive Maintenance
              </span>
            </div>
          </div>
        </div>

        {/* 2. MAIN GRID: ASSIGNMENT FORM + RISK & NOTIFICATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* QUICK DRIVER ASSIGNMENT FORM */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Quick Driver Assignment</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Assign vehicle to driver with hard compliance blocks</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#E3FDFD] flex items-center justify-center border border-[#A6E3E9]">
                  <svg className="w-4 h-4 text-[#71C9CE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{notice.message}</span>
                </div>
              )}

              <form onSubmit={handleAssignDriver} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Select Vehicle
                  </label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE] transition-all"
                  >
                    <option value="">-- Choose Vehicle --</option>
                    {vehicles.map((v) => {
                      const comp = getVehicleCompliance(v);
                      return (
                        <option key={v.id} value={v.id}>
                          {v.plateNumber} — {v.name} ({comp.label})
                        </option>
                      );
                    })}
                  </select>
                </div>

                {isNonCompliantSelection && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-rose-800">
                      <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      HARD COMPLIANCE BLOCK ENFORCED
                    </div>
                    <p className="text-[11px] leading-relaxed text-rose-700">
                      This vehicle has overdue compliance documents. Standard assignment is blocked. You must provide a formal override reason to log this assignment.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Select Driver
                  </label>
                  <select
                    value={selectedDriverId}
                    onChange={(e) => setSelectedDriverId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE] transition-all"
                  >
                    <option value="">-- Choose Driver --</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.status} - {d.license})
                      </option>
                    ))}
                  </select>
                </div>

                {isNonCompliantSelection && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 mb-1.5">
                      Override Justification Reason *
                    </label>
                    <textarea
                      rows={3}
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      placeholder="Specify business reason, emergency details, or renewal status..."
                      className="w-full bg-white border border-rose-300 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder:text-slate-400"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isNonCompliantSelection
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{isNonCompliantSelection ? 'Confirm Assignment with Override' : 'Assign Driver Now'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* RISK FLAGS & NOTIFICATIONS PANEL */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Predictive Risk Flags Summary</h2>
                  <p className="text-xs text-slate-500">Risk level calculated from mileage vs service interval ratio</p>
                </div>
                <span className="text-xs font-extrabold text-[#71C9CE] bg-[#E3FDFD] px-3 py-1 rounded-full border border-[#A6E3E9]">
                  {totalVehicles} Vehicles Monitored
                </span>
              </div>

              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                  <div style={{ width: `${(lowRiskCount / totalVehicles) * 100}%` }} className="bg-[#E3FDFD] border-r border-[#A6E3E9]" title="Low Risk" />
                  <div style={{ width: `${(mediumRiskCount / totalVehicles) * 100}%` }} className="bg-[#A6E3E9] border-r border-[#71C9CE]" title="Medium Risk" />
                  <div style={{ width: `${(highRiskCount / totalVehicles) * 100}%` }} className="bg-[#71C9CE]" title="High Risk" />
                </div>
                <div className="grid grid-cols-3 text-center text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-[#E3FDFD]/60 border border-[#A6E3E9]/30">
                    <span className="font-extrabold text-slate-800">{lowRiskCount}</span>
                    <span className="block text-[11px] text-slate-600 font-medium">Low Risk</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#CBF1F5]/80 border border-[#71C9CE]/40">
                    <span className="font-extrabold text-slate-900">{mediumRiskCount}</span>
                    <span className="block text-[11px] text-slate-700 font-medium">Medium Risk</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#71C9CE]/20 border border-[#71C9CE]/40">
                    <span className="font-extrabold text-[#061d23]">{highRiskCount}</span>
                    <span className="block text-[11px] text-[#061d23] font-medium">High Risk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-slate-900">Notifications Panel</h2>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                    {filteredNotifications.length} Alerts
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setNotifTab('all')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      notifTab === 'all' ? 'bg-[#71C9CE] text-slate-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setNotifTab('overdue')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      notifTab === 'overdue' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Overdue
                  </button>
                  <button
                    onClick={() => setNotifTab('expiring')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      notifTab === 'expiring' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Expiring
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 max-h-52 overflow-y-auto pr-1">
                {filteredNotifications.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No notifications for this filter.</p>
                ) : (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                        notif.type === 'Overdue'
                          ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                          : 'bg-amber-50/80 border-amber-200 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          notif.type === 'Overdue' ? 'bg-rose-600 animate-pulse' : 'bg-amber-500'
                        }`} />
                        <div>
                          <span className="font-extrabold">{notif.vehicle}</span> —{' '}
                          <span className="font-medium">{notif.doc}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold opacity-80">{notif.date}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          notif.type === 'Overdue' ? 'bg-rose-200 text-rose-900' : 'bg-amber-200 text-amber-950'
                        }`}>
                          {notif.type}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. COMPLIANCE OVERVIEW MATRIX TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Fleet Compliance Overview Table</h2>
              <p className="text-xs text-slate-500">Per-vehicle status across Insurance, Inspection, Emissions, and assigned driver</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search vehicle, driver, plate..."
                  className="bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE] w-full sm:w-64"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    statusFilter === 'all' ? 'bg-[#71C9CE] text-slate-950 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  All ({vehicles.length})
                </button>
                <button
                  onClick={() => setStatusFilter('overdue')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    statusFilter === 'overdue' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Overdue ({overdueCount})
                </button>
                <button
                  onClick={() => setStatusFilter('expiring')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    statusFilter === 'expiring' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Expiring ({expiringCount})
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                  <th className="py-3.5 px-4">Vehicle & Model</th>
                  <th className="py-3.5 px-4">Plate Number</th>
                  <th className="py-3.5 px-4">Assigned Driver</th>
                  <th className="py-3.5 px-4">Insurance</th>
                  <th className="py-3.5 px-4">Inspection</th>
                  <th className="py-3.5 px-4">Emissions</th>
                  <th className="py-3.5 px-4">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVehicles.map((v) => {
                  const insStatus = getDocStatus(v.insuranceExpiry);
                  const inspStatus = getDocStatus(v.inspectionExpiry);
                  const emsStatus = getDocStatus(v.emissionsExpiry);
                  const overallComp = getVehicleCompliance(v);

                  return (
                    <tr key={v.id} className="hover:bg-[#E3FDFD]/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900">{v.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{v.model} • {v.branch}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 font-mono">{v.plateNumber}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          v.driverName === 'Unassigned'
                            ? 'bg-slate-100 text-slate-500 border border-slate-200'
                            : 'bg-[#E3FDFD] text-[#061d23] border border-[#A6E3E9]'
                        }`}>
                          {v.driverName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          insStatus === 'Overdue' ? 'bg-rose-100 text-rose-800' : insStatus === 'Expiring Soon' ? 'bg-amber-100 text-amber-800' : 'text-slate-700'
                        }`}>
                          {v.insuranceExpiry}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          inspStatus === 'Overdue' ? 'bg-rose-100 text-rose-800' : inspStatus === 'Expiring Soon' ? 'bg-amber-100 text-amber-800' : 'text-slate-700'
                        }`}>
                          {v.inspectionExpiry}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          emsStatus === 'Overdue' ? 'bg-rose-100 text-rose-800' : emsStatus === 'Expiring Soon' ? 'bg-amber-100 text-amber-800' : 'text-slate-700'
                        }`}>
                          {v.emissionsExpiry}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${overallComp.badgeBg}`}>
                          {overallComp.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. RECENT OVERRIDES LOG */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Recent Assignment Overrides Log</h2>
              <p className="text-xs text-slate-500">Every non-compliant vehicle override is permanently recorded with reason & timestamp</p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {overrides.length} Logged Entries
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {overrides.map((ov) => (
              <div key={ov.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">{ov.vehiclePlate}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-700">Driver: {ov.driverName}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                      {ov.status}
                    </span>
                  </div>
                  <p className="text-slate-600 italic">"{ov.reason}"</p>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 shrink-0">
                  Logged at {ov.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
