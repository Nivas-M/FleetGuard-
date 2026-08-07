'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import api from '../../lib/api';
import { useAuth } from '../context/AuthContext';

export default function DriverDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  // Backend Data State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  // Form & Checklist State
  const [checklist, setChecklist] = useState({
    brakes: false,
    lights: false,
    tires: false,
    fluids: false,
    safetyKit: false,
  });
  const [remarks, setRemarks] = useState('');
  const [checklistCompleted, setChecklistCompleted] = useState(false);
  const [checklistNotice, setChecklistNotice] = useState(null);
  const [submittingChecklist, setSubmittingChecklist] = useState(false);

  // Authentication & Initial Data Fetching
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        fetchDashboardData();
      }
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch Dashboard Data from Backend API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get('/api/driver/dashboard');

      if (res.data?.success && res.data?.data) {
        setDashboardData(res.data.data);
      } else {
        setError('Unexpected response format from driver API.');
      }
    } catch (err) {
      console.error('Error fetching driver dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to fetch driver dashboard data from backend.');
    } finally {
      setLoading(false);
    }
  };

  // Extract Assigned Vehicle & Statuses
  const assignedVehicle = dashboardData?.assignedVehicle || null;
  const compliance = dashboardData?.compliance || null;
  const headsUp = dashboardData?.headsUp || null;
  const recentChecklist = dashboardData?.recentChecklist || [];

  // Determine Road Legal Status
  const isDanger = headsUp?.type === 'Danger' ||
    compliance?.insurance === 'Expired' ||
    compliance?.inspection === 'Expired' ||
    compliance?.emission === 'Expired';

  const roadLegalStatus = isDanger ? 'Do Not Drive' : 'Road-Legal';

  // Checklist Handlers
  const handleCheckItem = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChecklistSubmit = async (e) => {
    e.preventDefault();
    const allChecked = Object.values(checklist).every(Boolean);

    if (!allChecked) {
      setChecklistNotice({
        type: 'error',
        text: 'Please tap and verify all 5 pre-trip inspection items before submitting.',
      });
      return;
    }

    try {
      setSubmittingChecklist(true);
      setChecklistNotice(null);

      const payload = {
        brakes: checklist.brakes,
        headlights: checklist.lights,
        tyres: checklist.tires,
        fluids: checklist.fluids,
        safety_kit: checklist.safetyKit,
        remarks: remarks || undefined,
      };

      const res = await api.post('/api/driver/pre-trip-checklist', payload);

      if (res.data?.success) {
        setChecklistCompleted(true);
        setChecklistNotice({
          type: 'success',
          text: res.data?.message || 'Pre-trip safety checklist submitted successfully!',
        });
        setRemarks('');
        await fetchDashboardData();
      } else {
        setChecklistNotice({
          type: 'error',
          text: res.data?.message || 'Failed to submit pre-trip checklist.',
        });
      }
    } catch (err) {
      console.error('Error submitting checklist:', err);
      setChecklistNotice({
        type: 'error',
        text: err.response?.data?.message || 'Error communicating with server to submit checklist.',
      });
    } finally {
      setSubmittingChecklist(false);
    }
  };

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

        {/* Global Loading & Error State Alerts */}
        {loading && (
          <div className="p-4 bg-[#E3FDFD] text-slate-900 font-semibold rounded-xl text-sm animate-pulse flex items-center justify-between">
            <span>Connecting to backend & loading assigned vehicle data...</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 border border-red-300 text-red-900 font-semibold rounded-xl text-sm flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button
              onClick={fetchDashboardData}
              className="px-3 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* LEFT MAIN COLUMN (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            
            {/* Left Card 1: My Vehicle Card */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              {assignedVehicle ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Vehicle</span>
                      <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                        {assignedVehicle.registrationNumber || 'No Plate'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {assignedVehicle.make} {assignedVehicle.model} ({assignedVehicle.type || 'Vehicle'})
                      </p>
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

                  {/* Mileage & Vehicle Status */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100/60 text-xs sm:text-sm">
                    <span className="text-slate-600 font-medium">Current Mileage: <strong className="text-slate-900">{typeof assignedVehicle.currentMileage === 'number' ? `${assignedVehicle.currentMileage.toLocaleString()} km` : 'N/A'}</strong></span>
                    <span className="text-slate-600 font-medium">Assignment Status: <strong className="text-slate-900">{assignedVehicle.status || 'Active'}</strong></span>
                  </div>

                  {/* Quick Vehicle Compliance Summary Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
                    <div className="p-3 bg-[#E3FDFD]/60 rounded-lg border-0 flex flex-col gap-1 text-xs">
                      <span className="text-slate-600 font-semibold">Insurance</span>
                      <span className="font-bold text-slate-900">{compliance?.insurance || 'N/A'}</span>
                    </div>
                    <div className="p-3 bg-[#E3FDFD]/60 rounded-lg border-0 flex flex-col gap-1 text-xs">
                      <span className="text-slate-600 font-semibold">Inspection</span>
                      <span className="font-bold text-slate-900">{compliance?.inspection || 'N/A'}</span>
                    </div>
                    <div className={`p-3 rounded-lg border-0 flex flex-col gap-1 text-xs ${
                      compliance?.emission === 'Expired' ? 'bg-[#CBF1F5]/80' : 'bg-[#E3FDFD]/60'
                    }`}>
                      <span className="text-slate-600 font-semibold">Emissions</span>
                      <span className="font-bold text-slate-900">{compliance?.emission || 'N/A'}</span>
                    </div>
                    <div className="p-3 bg-[#A6E3E9]/40 rounded-lg border-0 flex flex-col gap-1 text-xs">
                      <span className="text-slate-600 font-semibold">Service Clock</span>
                      <span className="font-bold text-slate-900">{compliance?.serviceClock || 'N/A'}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-6 text-center text-slate-500">
                  <p className="text-sm font-semibold">No vehicle is currently assigned to your driver profile.</p>
                  <p className="text-xs mt-1 text-slate-400">Please contact your Fleet Manager to be assigned to a fleet vehicle.</p>
                </div>
              )}
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

                {/* Remarks Input */}
                <div className="flex flex-col gap-1 mt-1">
                  <label className="text-xs font-bold text-slate-700">Remarks / Inspection Notes (Optional)</label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter any issues noticed during pre-trip check..."
                    className="bg-white/90 text-slate-900 text-xs sm:text-sm p-2.5 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={checklistCompleted || submittingChecklist || !assignedVehicle}
                  className={`mt-2 font-extrabold text-xs sm:text-sm px-4.5 py-2.5 rounded-lg transition-colors border-0 ${
                    checklistCompleted || !assignedVehicle
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 cursor-pointer'
                  }`}
                >
                  {submittingChecklist
                    ? 'Submitting Pre-Trip Checklist...'
                    : checklistCompleted
                    ? 'Checklist Completed for Today'
                    : 'Submit Pre-Trip Inspection'}
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
                {!headsUp ? (
                  <p className="text-xs sm:text-sm text-slate-500 italic p-3.5 bg-slate-50 rounded-lg">
                    {loading ? 'Loading compliance notices...' : 'No active compliance warnings for your vehicle.'}
                  </p>
                ) : (
                  <div
                    className={`p-3.5 rounded-lg border-0 text-xs sm:text-sm flex flex-col gap-1 ${
                      headsUp.type === 'Danger'
                        ? 'bg-[#CBF1F5]/80 text-slate-900'
                        : 'bg-[#E3FDFD] text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{headsUp.title}</span>
                      {assignedVehicle?.registrationNumber && (
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-white/90">
                          {assignedVehicle.registrationNumber}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-700 font-medium">{headsUp.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Card 2: Recent Checklist Status (Inspection Log History) */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recent Checklist Submissions</h3>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">Inspection Log</span>
              </div>

              <div className="flex flex-col gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                {recentChecklist.length === 0 ? (
                  <p className="text-xs sm:text-sm text-slate-500 italic p-3 bg-slate-50 rounded-lg">
                    {loading ? 'Loading inspection logs...' : 'No recent checklist submissions found.'}
                  </p>
                ) : (
                  recentChecklist.map((item) => (
                    <div key={item.checklistId} className="p-3.5 bg-slate-100/60 rounded-lg border-0 flex flex-col gap-2 text-xs sm:text-sm">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>Vehicle: {item.registrationNumber || item.vehicle}</span>
                        <span className="text-xs text-slate-500 font-medium">
                          {item.submittedAt ? new Date(item.submittedAt).toLocaleString() : 'Recent'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-[#E3FDFD]/60 p-2.5 rounded border-0 text-xs font-medium">
                        <span className="text-slate-800 font-bold">Passed ({item.passed})</span>
                        <span className="text-slate-600">ID: {item.checklistId}</span>
                      </div>
                      {item.remarks && (
                        <div className="text-xs text-slate-600 font-medium italic">
                          Remarks: "{item.remarks}"
                        </div>
                      )}
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

