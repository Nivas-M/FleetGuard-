'use client';

/**
 * ==============================================================================
 * FLEETGUARD INTEGRATION SUMMARY & API SPECIFICATION
 * ==============================================================================
 * PAGE / MODULE: Fleet Manager Dashboard (app/fleetmanager/page.js)
 * STATUS: 🟢 Fully Connected to Backend Express API & Supabase Database
 * 
 * API ENDPOINTS USED:
 *   1. GET /api/fleet-manager/dashboard
 *      - Description: Fetches fleet summary stats, risk distribution, active compliance
 *                     notifications, compliance table, override queue, and available drivers/vehicles.
 *      - Headers: Authorization: Bearer <JWT Token>
 * 
 *   2. POST /assignments
 *      - Description: Primary Driver Assignment route (handled by assignment.service.js).
 *                     Passes ISO `startTime` in payload to fulfill Supabase `vehicle_assignments.start_time` NOT NULL constraint.
 *      - Headers: Authorization: Bearer <JWT Token>
 *      - Request Body: { vehicleId: string, driverId: string, startTime: string }
 *      - Response: { success: true, message: "Vehicle assigned successfully.", data: object }
 * 
 * AUDIT TRAIL CUSTOMIZATION:
 *   - Keeps status/override text (e.g. "Status: Assigned", "Emergency reassignment approved").
 *   - Removes the white background box container around audit log messages.
 * ==============================================================================
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import api from '../../lib/api';
import { useAuth } from '../context/AuthContext';

export default function FleetManagerDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();

  // Backend Data States
  const [fleetSummary, setFleetSummary] = useState(null);
  const [riskSummary, setRiskSummary] = useState(null);
  const [notificationsList, setNotificationsList] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [overrides, setOverrides] = useState([]);
  const [recentAssignments, setRecentAssignments] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form & Action States
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [overrideReason, setOverrideReason] = useState('');
  const [assignmentNotice, setAssignmentNotice] = useState(null);

  // UI Filter States
  const [tableFilter, setTableFilter] = useState('all');
  const [notificationTab, setNotificationTab] = useState('all');

  // Route Protection & Role Check
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch Fleet Manager Data from Backend
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/api/fleet-manager/dashboard');
      const data = response.data;

      if (data) {
        if (data.fleetSummary) setFleetSummary(data.fleetSummary);
        if (data.riskSummary) setRiskSummary(data.riskSummary);

        const notifArray = Array.isArray(data.notifications?.notifications)
          ? data.notifications.notifications
          : Array.isArray(data.notifications)
          ? data.notifications
          : [];
        setNotificationsList(notifArray);

        if (Array.isArray(data.complianceTable)) {
          setVehicles(data.complianceTable);
        }

        if (Array.isArray(data.recentAssignments)) setRecentAssignments(data.recentAssignments);
        if (Array.isArray(data.overrideQueue)) setOverrides(data.overrideQueue);
        if (Array.isArray(data.availableDrivers)) setAvailableDrivers(data.availableDrivers);
        if (Array.isArray(data.availableVehicles)) setAvailableVehicles(data.availableVehicles);
      }
    } catch (err) {
      console.error('Fetch Fleet Manager Dashboard error:', err);
      const errMsg = err.response?.data?.message || err.message || 'Failed to connect to Fleet Manager endpoints.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  // Helper Functions for Compliance Formatting
  const todayISO = new Date().toISOString().split('T')[0];

  const getDocStatus = (expiryDateStr) => {
    if (!expiryDateStr || expiryDateStr === '-') return 'Valid';
    if (expiryDateStr < todayISO) return 'Overdue';
    const expDate = new Date(expiryDateStr);
    const todayDate = new Date();
    const diffDays = Math.ceil((expDate - todayDate) / (1000 * 60 * 60 * 24));
    if (diffDays <= 30) return 'Expiring Soon';
    return 'Valid';
  };

  const getVehicleComplianceStatus = (v) => {
    if (!v) return { status: 'Compliant', badge: 'bg-[#E3FDFD] text-[#061d23]' };
    
    const insStatus = v.insuranceExpiry ? getDocStatus(v.insuranceExpiry) : (v.insurance?.status || 'Valid');
    const inspStatus = v.inspectionExpiry ? getDocStatus(v.inspectionExpiry) : (v.inspection?.status || 'Valid');
    const emiStatus = v.emissionExpiry ? getDocStatus(v.emissionExpiry) : (v.emissions?.status || 'Valid');

    const statuses = [insStatus, inspStatus, emiStatus];
    if (statuses.includes('Overdue')) return { status: 'Non-Compliant', badge: 'bg-[#CBF1F5] text-[#061d23]' };
    if (statuses.includes('Expiring Soon')) return { status: 'Action Required', badge: 'bg-[#A6E3E9]/40 text-[#061d23]' };
    return { status: 'Compliant', badge: 'bg-[#E3FDFD] text-[#061d23]' };
  };

  const getNonCompliantReasons = (v) => {
    if (!v) return [];
    const reasons = [];

    if (v.status && v.status !== 'Active') {
      reasons.push(`Vehicle Status: ${v.status}`);
    }

    const insStatus = v.insuranceExpiry ? getDocStatus(v.insuranceExpiry) : (v.insurance?.status || 'Valid');
    const inspStatus = v.inspectionExpiry ? getDocStatus(v.inspectionExpiry) : (v.inspection?.status || 'Valid');
    const emiStatus = v.emissionExpiry ? getDocStatus(v.emissionExpiry) : (v.emissions?.status || 'Valid');

    if (insStatus === 'Overdue') reasons.push('Insurance Overdue');
    if (inspStatus === 'Overdue') reasons.push('Inspection Overdue');
    if (emiStatus === 'Overdue') reasons.push('Emissions (PUC) Overdue');
    return reasons;
  };

  // Cross-reference selected vehicle against full compliance table + available vehicles
  const selectedVehicleObj = vehicles.find(
    (v) => (v.vehicleId || v.id || v.vehicle_id) === selectedVehicleId ||
           (v.registrationNumber || v.registration_number || v.plate) === selectedVehicleId
  ) || availableVehicles.find(
    (v) => (v.vehicle_id || v.id || v.vehicleId) === selectedVehicleId
  );

  const nonCompliantIssues = selectedVehicleObj ? getNonCompliantReasons(selectedVehicleObj) : [];
  const isSelectedVehicleBlocked = nonCompliantIssues.length > 0;
  const isInactiveVehicle = selectedVehicleObj?.status && selectedVehicleObj.status !== 'Active';

  // Driver Assignment Submission
  const handleAssignDriver = async (e) => {
    e.preventDefault();
    setAssignmentNotice(null);

    if (!selectedVehicleId || !selectedDriverId) {
      setAssignmentNotice({ type: 'error', text: 'Please select both a vehicle and a driver.' });
      return;
    }

    if (isSelectedVehicleBlocked && !overrideReason.trim()) {
      setAssignmentNotice({
        type: 'error',
        text: 'Hard Block Active: Selected vehicle has overdue compliance issues. An explicit override reason is mandatory.',
      });
      return;
    }

    try {
      const nowISO = new Date().toISOString();

      let response;
      try {
        response = await api.post('/assignments', {
          vehicleId: selectedVehicleId,
          driverId: selectedDriverId,
          startTime: nowISO,
          reason: overrideReason,
        });
      } catch (primaryErr) {
        if (primaryErr.response?.status === 404) {
          response = await api.post('/api/fleet-manager/assign-vehicle', {
            vehicle_id: selectedVehicleId,
            driver_id: selectedDriverId,
            start_time: nowISO,
            reason: overrideReason,
          });
        } else {
          throw primaryErr;
        }
      }

      if (response.data?.success) {
        const assignedDriverObj = availableDrivers.find((d) => d.id === selectedDriverId);
        const driverName = assignedDriverObj?.name || 'Driver';

        let noticeText = `Assigned ${driverName} to vehicle successfully.`;
        if (isSelectedVehicleBlocked) {
          noticeText = `Driver assigned via logged override for non-compliant vehicle. Audit trail updated.`;
        }

        setAssignmentNotice({ type: 'success', text: noticeText });
        setSelectedVehicleId('');
        setSelectedDriverId('');
        setOverrideReason('');

        fetchDashboardData();
        setTimeout(() => setAssignmentNotice(null), 5000);
      } else {
        setAssignmentNotice({ type: 'error', text: response.data?.message || 'Vehicle assignment failed.' });
      }
    } catch (err) {
      console.error('Assign vehicle error:', err);
      const errMsg = err.response?.data?.message || err.message || 'Failed to submit vehicle assignment.';
      setAssignmentNotice({ type: 'error', text: errMsg });
    }
  };

  // Stat Computations
  const totalVehiclesCount = fleetSummary?.totalVehicles ?? vehicles.length;
  const overdueCount = fleetSummary?.overdueDocuments ?? fleetSummary?.overdue ?? vehicles.filter((v) => getVehicleComplianceStatus(v).status === 'Non-Compliant').length;
  const expiringSoonCount = fleetSummary?.expiringSoon ?? vehicles.filter((v) => getVehicleComplianceStatus(v).status === 'Action Required').length;
  const highRiskCount = riskSummary?.highRisk ?? fleetSummary?.highRisk ?? 0;
  const lowRiskCount = riskSummary?.lowRisk ?? 0;
  const medRiskCount = riskSummary?.mediumRisk ?? 0;

  const lowRiskPct = riskSummary?.lowRiskPercentage ?? (totalVehiclesCount > 0 ? ((lowRiskCount / totalVehiclesCount) * 100).toFixed(1) : '100');
  const medRiskPct = riskSummary?.mediumRiskPercentage ?? (totalVehiclesCount > 0 ? ((medRiskCount / totalVehiclesCount) * 100).toFixed(1) : '0');
  const highRiskPct = riskSummary?.highRiskPercentage ?? (totalVehiclesCount > 0 ? ((highRiskCount / totalVehiclesCount) * 100).toFixed(1) : '0');

  // Combined Audit Trail
  const auditLogsCombined = [];

  overrides.forEach((ovr) => {
    const vehName = ovr.vehicle || ovr.vehicles?.registration_number || ovr.registration_number || 'Vehicle';
    auditLogsCombined.push({
      id: ovr.overrideId || ovr.id || Math.random(),
      type: 'override',
      title: 'Compliance Override Approved',
      vehicle: vehName !== 'Vehicle' ? vehName : 'Vehicle Override',
      actor: ovr.approvedBy || ovr.who || ovr.requestedBy?.name || 'Fleet Manager',
      reason: ovr.reason || 'Emergency override approved for dispatch.',
      timestamp: ovr.createdAt ? new Date(ovr.createdAt).toISOString().substring(0, 10) : 'Recent',
    });
  });

  recentAssignments.forEach((asg) => {
    const reg = asg.registrationNumber || '';
    const model = asg.vehicle || 'Truck';
    const vehTitle = reg ? `${reg} (${model})` : model;

    auditLogsCombined.push({
      id: asg.assignmentId || Math.random(),
      type: 'assignment',
      title: 'Vehicle Assignment',
      vehicle: vehTitle,
      actor: `Driver: ${asg.driver || 'Assigned'}`,
      reason: `Status: ${asg.status || 'Assigned'}`,
      timestamp: asg.assignedOn ? new Date(asg.assignedOn).toISOString().substring(0, 10) : 'Recent',
    });
  });

  // Display raw notification details exactly as stored in Supabase database table
  const formattedNotifications = notificationsList.map((notif) => {
    const regNum = notif.vehicles?.registration_number || notif.vehicle || 'Vehicle';
    return {
      id: notif.notification_id || notif.id || Math.random(),
      title: notif.title || 'Alert',
      detail: notif.message || notif.detail || 'Notification message',
      vehicle: regNum,
      type: notif.type || 'Expiring',
    };
  });

  // Filtered vehicles for compliance table
  const filteredVehicles = vehicles.filter((v) => {
    const comp = getVehicleComplianceStatus(v);
    if (tableFilter === 'non-compliant') return comp.status === 'Non-Compliant';
    if (tableFilter === 'expiring') return comp.status === 'Action Required';
    if (tableFilter === 'high-risk') return v.riskLevel === 'High';
    return true;
  });

  // Filtered notifications
  const filteredNotifications = formattedNotifications.filter((n) => {
    if (notificationTab === 'overdue') return (n.type || '').toLowerCase().includes('overdue');
    if (notificationTab === 'expiring') return (n.type || '').toLowerCase().includes('expir') || (n.type || '').toLowerCase().includes('reminder');
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans p-5 sm:p-7 lg:p-8">
      <div className="max-w-[1470px] mx-auto flex flex-col gap-7">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Header Title Section */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#71C9CE] uppercase tracking-wider">Welcome Back</h2>
            {user?.name && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E3FDFD] text-slate-800 border border-[#A6E3E9]">
                {user.name} ({user.role || 'Fleet Manager'})
              </span>
            )}
            {isAuthenticated && (
              <button
                onClick={logout}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ml-1"
              >
                Log Out
              </button>
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Fleet Manager Dashboard</h1>
          <p className="text-sm text-slate-600 mt-0.5 font-medium">
            At-a-glance fleet compliance, driver assignment enforcement, and predictive risk summary.
          </p>
        </div>

        {/* Backend Connection Error Banner */}
        {error && (
          <div className="p-4 bg-red-50 text-red-900 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between border border-red-200 shadow-sm">
            <span className="flex items-center gap-2 font-extrabold">
              <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={logout}
                className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-extrabold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Log Out & Re-login
              </button>
              <button
                onClick={fetchDashboardData}
                className="bg-white text-slate-900 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-extrabold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* LEFT MAIN COLUMN (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            
            {/* Left Card 1: Fleet Summary Stat Cards (LIVE BACKEND DATA) */}
            <div className="bg-white/70 rounded-xl p-6 border border-slate-200/70 shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Fleet Summary Stats</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Live fetched backend metrics (`GET /api/fleet-manager/dashboard`).</p>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">Live Metrics</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-3.5 bg-[#E3FDFD]/60 rounded-lg border border-[#A6E3E9]/30 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600">Total Vehicles</span>
                  <span className="text-3xl font-extrabold text-slate-900">{loading ? '...' : totalVehiclesCount}</span>
                </div>
                <div className="p-3.5 bg-[#CBF1F5]/80 rounded-lg border border-[#71C9CE]/40 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Overdue</span>
                  <span className="text-3xl font-extrabold text-slate-900">{loading ? '...' : overdueCount}</span>
                </div>
                <div className="p-3.5 bg-[#A6E3E9]/40 rounded-lg border border-[#71C9CE]/30 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Expiring Soon</span>
                  <span className="text-3xl font-extrabold text-slate-900">{loading ? '...' : expiringSoonCount}</span>
                </div>
                <div className="p-3.5 bg-[#71C9CE]/20 rounded-lg border border-[#71C9CE]/30 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">High Risk</span>
                  <span className="text-3xl font-extrabold text-slate-900">{loading ? '...' : highRiskCount}</span>
                </div>
              </div>
            </div>

            {/* Left Card 2: Quick Driver Assignment (WITH CLEAR STATUS TAGS & WARNINGS) */}
            <div className="bg-white/70 rounded-xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Quick Driver Assignment</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Assign drivers with hard-block compliance checks & status enforcement (`POST /assignments`).
                </p>
              </div>

              {assignmentNotice && (
                <div className={`p-3 rounded-lg border text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 ${
                  assignmentNotice.type === 'success'
                    ? 'bg-[#E3FDFD] text-[#061d23] border-[#A6E3E9]'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                  <span>{assignmentNotice.text}</span>
                  {assignmentNotice.type === 'error' && (
                    <button
                      onClick={() => setAssignmentNotice(null)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 px-1.5 py-0.5 rounded border border-slate-300 bg-white cursor-pointer"
                    >
                      Dismiss
                    </button>
                  )}
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
                    className="bg-white text-slate-900 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  >
                    <option value="">-- Choose Vehicle --</option>
                    {(availableVehicles.length > 0 ? availableVehicles : vehicles).map((v) => {
                      const vId = v.vehicle_id || v.id || v.vehicleId;
                      const regNum = v.registration_number || v.registrationNumber || v.plate;
                      const modelName = v.model || v.make || v.vehicle || 'Truck';
                      
                      const matchObj = vehicles.find((compV) => (compV.vehicleId || compV.id || compV.vehicle_id) === vId) || v;
                      const statusTag = matchObj.status ? ` - [${matchObj.status}]` : '';
                      const compStatus = getVehicleComplianceStatus(matchObj);
                      const compTag = compStatus.status !== 'Compliant' ? ` - [${compStatus.status}]` : '';

                      return (
                        <option key={vId} value={vId}>
                          {regNum} ({modelName}){statusTag}{compTag}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Step 2: Inactive Vehicle Warning Banner */}
                {isInactiveVehicle && (
                  <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex flex-col gap-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-950">
                      <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Vehicle Inactive in Database
                    </span>
                    <p className="text-xs text-amber-800 font-medium">
                      This vehicle is currently marked '{selectedVehicleObj.status}' in the database. Vehicles must be in 'Active' status to be assigned to a driver.
                    </p>
                  </div>
                )}

                {/* Step 3: Hard Block Active Warning for Overdue Compliance */}
                {selectedVehicleObj && isSelectedVehicleBlocked && !isInactiveVehicle && (
                  <div className="p-3.5 rounded-lg bg-[#CBF1F5]/70 border border-[#71C9CE]/50 text-slate-900 text-xs sm:text-sm flex flex-col gap-1">
                    <span className="font-bold flex items-center gap-1.5 text-slate-900">
                      <svg className="w-4 h-4 text-[#71C9CE] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Hard Block Active: Overdue Compliance
                    </span>
                    <p className="text-xs text-slate-700 font-medium">
                      Overdue items: {nonCompliantIssues.join(', ')}.
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-800">Select Driver</label>
                  <select
                    value={selectedDriverId}
                    onChange={(e) => setSelectedDriverId(e.target.value)}
                    className="bg-white text-slate-900 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  >
                    <option value="">-- Choose Driver --</option>
                    {availableDrivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 3: Override Reason Field for Non-Compliant Vehicles */}
                {isSelectedVehicleBlocked && !isInactiveVehicle && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Override Reason (Mandatory)
                    </label>
                    <textarea
                      rows="2"
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      placeholder="Enter reason..."
                      className="bg-white text-slate-900 text-xs sm:text-sm p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isInactiveVehicle}
                  className={`font-extrabold text-xs sm:text-sm px-4.5 py-2.5 rounded-lg transition-colors mt-1 ${
                    isInactiveVehicle
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                      : 'bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 cursor-pointer'
                  }`}
                >
                  {isSelectedVehicleBlocked && !isInactiveVehicle ? 'Override & Assign' : 'Assign Driver'}
                </button>
              </form>
            </div>

            {/* Left Card 3: Compliance Overview Table (MOVED TO LEFT SIDE, SCROLLABLE FOR 3 CASES) */}
            <div className="bg-white/70 rounded-xl p-6 border border-slate-200/70 shadow-sm flex flex-col gap-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Compliance Overview Table</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Per-vehicle compliance status (displaying 3 visible cases, scroll for more).
                  </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                  <button
                    onClick={() => setTableFilter('all')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      tableFilter === 'all'
                        ? 'bg-[#71C9CE] text-slate-950'
                        : 'bg-white text-slate-700 hover:bg-[#E3FDFD] border border-slate-200'
                    }`}
                  >
                    All ({vehicles.length})
                  </button>
                  <button
                    onClick={() => setTableFilter('non-compliant')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      tableFilter === 'non-compliant'
                        ? 'bg-[#71C9CE] text-slate-950'
                        : 'bg-white text-slate-700 hover:bg-[#E3FDFD] border border-slate-200'
                    }`}
                  >
                    Overdue ({overdueCount})
                  </button>
                  <button
                    onClick={() => setTableFilter('expiring')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      tableFilter === 'expiring'
                        ? 'bg-[#71C9CE] text-slate-950'
                        : 'bg-white text-slate-700 hover:bg-[#E3FDFD] border border-slate-200'
                    }`}
                  >
                    Expiring ({expiringSoonCount})
                  </button>
                  <button
                    onClick={() => setTableFilter('high-risk')}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      tableFilter === 'high-risk'
                        ? 'bg-[#71C9CE] text-slate-950'
                        : 'bg-white text-slate-700 hover:bg-[#E3FDFD] border border-slate-200'
                    }`}
                  >
                    High Risk ({highRiskCount})
                  </button>
                </div>
              </div>

              {/* Table Container (3 rows height max-h-[220px] + scrollable) */}
              <div className="overflow-x-auto max-h-[220px] overflow-y-auto rounded-xl border border-slate-200/80 shadow-inner">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#CBF1F5]/80 text-slate-700 uppercase tracking-wider text-[11px] font-bold sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-3.5 py-3">Vehicle</th>
                      <th className="px-3.5 py-3">Driver</th>
                      <th className="px-3.5 py-3">Insurance</th>
                      <th className="px-3.5 py-3">Inspection</th>
                      <th className="px-3.5 py-3">Emissions</th>
                      <th className="px-3.5 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white/80">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-6 text-center text-slate-500 italic">
                          Loading vehicle compliance data...
                        </td>
                      </tr>
                    ) : filteredVehicles.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-6 text-center text-slate-500 italic">
                          No vehicle records match the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredVehicles.map((v, idx) => {
                        const comp = getVehicleComplianceStatus(v);
                        return (
                          <tr key={`veh-${v.vehicleId || v.registrationNumber || v.id || idx}`} className="hover:bg-[#E3FDFD]/40 transition-colors">
                            <td className="px-3.5 py-3 font-bold text-slate-900">
                              <div className="flex flex-col">
                                <span>{v.registrationNumber || v.plate}</span>
                                <span className="text-[10px] text-slate-500 font-normal">{v.vehicle || v.model}</span>
                              </div>
                            </td>
                            <td className="px-3.5 py-3 font-semibold text-slate-700">
                              {v.driver || v.assignedDriver || 'Not Assigned'}
                            </td>
                            <td className="px-3.5 py-3 text-slate-600 font-medium">
                              {v.insuranceExpiry || '-'}
                            </td>
                            <td className="px-3.5 py-3 text-slate-600 font-medium">
                              {v.inspectionExpiry || '-'}
                            </td>
                            <td className="px-3.5 py-3 text-slate-600 font-medium">
                              {v.emissionExpiry || '-'}
                            </td>
                            <td className="px-3.5 py-3 text-right">
                              <span className="font-bold text-slate-900">
                                {comp.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Left Card 4: Risk Flags Summary (LIVE BACKEND DATA) */}
            <div className="bg-white/70 rounded-xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Risk Flags Summary</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Predictive risk distribution calculated from live backend documents.
                </p>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="p-3.5 bg-[#E3FDFD]/60 rounded-lg border border-[#A6E3E9]/30 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">Low Risk</span>
                  <span className="text-xl font-extrabold text-slate-900">{lowRiskCount} vehicles ({lowRiskPct}%)</span>
                </div>
                <div className="p-3.5 bg-[#CBF1F5]/80 rounded-lg border border-[#71C9CE]/40 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Medium Risk</span>
                  <span className="text-xl font-extrabold text-slate-900">{medRiskCount} vehicles ({medRiskPct}%)</span>
                </div>
                <div className="p-3.5 bg-[#A6E3E9]/50 rounded-lg border border-[#71C9CE]/30 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">High Risk</span>
                  <span className="text-xl font-extrabold text-slate-900">{highRiskCount} vehicles ({highRiskPct}%)</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-600 font-bold">Fleet Risk Ratio</span>
                <div className="w-full bg-slate-200/60 rounded-full h-2.5 overflow-hidden flex border-0">
                  <div style={{ width: `${lowRiskPct}%` }} className="bg-[#E3FDFD] h-full" title={`Low Risk: ${lowRiskPct}%`} />
                  <div style={{ width: `${medRiskPct}%` }} className="bg-[#A6E3E9] h-full" title={`Medium Risk: ${medRiskPct}%`} />
                  <div style={{ width: `${highRiskPct}%` }} className="bg-[#71C9CE] h-full" title={`High Risk: ${highRiskPct}%`} />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT MAIN COLUMN (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            
            {/* Right Card 1: Notifications Panel (RAW DATABASE MESSAGES & TITLES) */}
            <div className="bg-white/70 rounded-xl p-6 border border-slate-200/70 shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Notifications Panel</h3>
                <div className="flex items-center gap-1 text-xs sm:text-sm font-bold">
                  <button
                    onClick={() => setNotificationTab('all')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${notificationTab === 'all' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    All ({formattedNotifications.length})
                  </button>
                  <button
                    onClick={() => setNotificationTab('overdue')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${notificationTab === 'overdue' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    Overdue ({formattedNotifications.filter(n => (n.type || '').toLowerCase().includes('overdue')).length})
                  </button>
                  <button
                    onClick={() => setNotificationTab('expiring')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${notificationTab === 'expiring' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    Expiring ({formattedNotifications.filter(n => (n.type || '').toLowerCase().includes('expir') || (n.type || '').toLowerCase().includes('reminder')).length})
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 max-h-[320px] overflow-y-auto pr-1">
                {loading ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">Loading notifications...</p>
                ) : filteredNotifications.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">No active notifications found in database.</p>
                ) : (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3.5 rounded-lg border text-xs sm:text-sm flex flex-col gap-1 ${
                        (notif.type || '').toLowerCase().includes('overdue')
                          ? 'bg-[#CBF1F5]/80 text-slate-900 border-[#71C9CE]/40'
                          : 'bg-[#E3FDFD] text-slate-900 border-[#A6E3E9]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>{notif.title}</span>
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-white/90 border border-slate-200">
                          {notif.vehicle}
                        </span>
                      </div>
                      <span className="text-xs text-slate-700 font-medium">{notif.detail}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Card 2: Recent Overrides Audit Log */}
            <div className="bg-white/70 rounded-xl p-6 border border-slate-200/70 shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Recent Overrides & Audit Log</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Live audit trail fetched from backend database.</p>
                </div>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">Audit Trail</span>
              </div>

              <div className="flex flex-col gap-3.5 max-h-[420px] overflow-y-auto pr-1">
                {loading ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">Loading audit trail...</p>
                ) : auditLogsCombined.length === 0 ? (
                  <div className="p-3.5 bg-slate-100/60 rounded-lg border border-slate-200/60 flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-700">No Recent Overrides Logged</span>
                    <p className="text-xs text-slate-500">
                      Submitting a driver assignment for a vehicle with overdue compliance will automatically record an override audit log here.
                    </p>
                  </div>
                ) : (
                  auditLogsCombined.map((log, idx) => (
                    <div key={`audit-${log.type}-${log.id}-${idx}`} className="p-3.5 bg-slate-100/60 rounded-lg border border-slate-200/60 flex flex-col gap-1 text-xs sm:text-sm">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${log.type === 'override' ? 'bg-[#71C9CE]' : 'bg-slate-400'}`} />
                          {log.vehicle}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{log.timestamp}</span>
                      </div>
                      
                      {/* Render text directly without white container box */}
                      {log.reason && (
                        <p className="text-slate-700 text-xs font-medium italic py-0.5">
                          "{log.reason}"
                        </p>
                      )}

                      <div className="text-xs text-slate-600 font-medium pt-0.5">
                        {log.type === 'override' ? (
                          <>Authorized by: <span className="font-bold text-slate-900">{log.actor}</span></>
                        ) : (
                          <>Authorized by: <span className="font-bold text-slate-900">{log.actor}</span></>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
