'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import api from '../../lib/api';
import { useAuth } from '../context/AuthContext';

export default function ServiceCenterDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  // Backend Data State
  const [queue, setQueue] = useState([]);
  const [completedServices, setCompletedServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [odometerInput, setOdometerInput] = useState('');
  const [serviceNotes, setServiceNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formNotice, setFormNotice] = useState(null);
  const [queueFilter, setQueueFilter] = useState('all');

  // Route Guard & Initial Data Fetching
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

      const res = await api.get('/api/mechanic/dashboard');

      if (res.data?.success && res.data?.data) {
        const { stats: apiStats, queue: apiQueue, recentServices: apiRecent } = res.data.data;
        if (apiStats) setStats(apiStats);
        if (Array.isArray(apiQueue)) setQueue(apiQueue);
        if (Array.isArray(apiRecent)) setCompletedServices(apiRecent);
      } else {
        setError('Unexpected response format from service center API.');
      }
    } catch (err) {
      console.error('Error fetching mechanic dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to fetch service center data from backend.');
    } finally {
      setLoading(false);
    }
  };

  // Stat Computations (Combining Backend Stats with Local Fallbacks)
  const totalInQueue = stats?.totalInQueue ?? queue.length;
  const overdueCount = stats?.overdue ?? queue.filter((item) => item.overdue || item.urgency === 'Overdue').length;
  const scheduledTodayCount = stats?.dueToday ?? queue.filter((item) => {
    if (item.scheduledToday !== undefined) return item.scheduledToday;
    if (typeof item.dueMileage === 'number' && typeof item.mileage === 'number') {
      return (item.dueMileage - item.mileage) <= 0;
    }
    return false;
  }).length;
  const highRiskCount = stats?.highRisk ?? queue.filter((item) => (item.priority || item.riskLevel) === 'High').length;

  // Log Service Handler (Posts to Backend & Resets Compliance Clock)
  const handleLogService = async (e) => {
    e.preventDefault();
    if (!selectedVehicleId || !odometerInput) {
      setFormNotice({
        type: 'error',
        text: 'Please select a vehicle from the queue and enter the current odometer mileage.',
      });
      return;
    }

    try {
      setSubmitting(true);
      setFormNotice(null);

      const payload = {
        vehicle_id: selectedVehicleId,
        current_mileage: Number(odometerInput),
        notes: serviceNotes || undefined,
      };

      const res = await api.post('/api/mechanic/log-service', payload);

      if (res.data?.success) {
        setFormNotice({
          type: 'success',
          text: res.data?.message || 'Service logged successfully! Vehicle compliance clock automatically reset.',
        });

        // Clear Form Fields
        setSelectedVehicleId('');
        setOdometerInput('');
        setServiceNotes('');

        // Refresh Live Dashboard Data
        await fetchDashboardData();

        setTimeout(() => setFormNotice(null), 5000);
      } else {
        setFormNotice({
          type: 'error',
          text: res.data?.message || 'Failed to log completed service.',
        });
      }
    } catch (err) {
      console.error('Error logging service:', err);
      setFormNotice({
        type: 'error',
        text: err.response?.data?.message || 'Error communicating with server to log service.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered Queue helper
  const filteredQueue = queue.filter((item) => {
    const isOverdue = item.overdue || item.urgency === 'Overdue';
    const isToday = item.scheduledToday || (typeof item.dueMileage === 'number' && typeof item.mileage === 'number' && (item.dueMileage - item.mileage) <= 0);
    const isHighRisk = (item.priority || item.riskLevel) === 'High';

    if (queueFilter === 'overdue') return isOverdue;
    if (queueFilter === 'today') return isToday;
    if (queueFilter === 'high-risk') return isHighRisk;
    return true;
  });

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
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Service Center & Mechanic Dashboard</h1>
          <p className="text-sm text-slate-600 mt-0.5 font-medium">
            Service queue management, risk-driven maintenance priority, and automatic compliance clock resets.
          </p>
        </div>

        {/* Global Loading & Error State Alerts */}
        {loading && (
          <div className="p-4 bg-[#E3FDFD] text-slate-900 font-semibold rounded-xl text-sm animate-pulse flex items-center justify-between">
            <span>Connecting to backend & loading live service queue data...</span>
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
            
            {/* Left Card 1: Service Queue Stats */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Service Queue Stats</h3>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">Live Backend Queue</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-3.5 bg-[#E3FDFD]/60 rounded-lg border-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600">Total in Queue</span>
                  <span className="text-3xl font-extrabold text-slate-900">{totalInQueue}</span>
                </div>
                <div className="p-3.5 bg-[#CBF1F5]/80 rounded-lg border-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Overdue</span>
                  <span className="text-3xl font-extrabold text-slate-900">{overdueCount}</span>
                </div>
                <div className="p-3.5 bg-[#A6E3E9]/40 rounded-lg border-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Due Today</span>
                  <span className="text-3xl font-extrabold text-slate-900">{scheduledTodayCount}</span>
                </div>
                <div className="p-3.5 bg-[#71C9CE]/20 rounded-lg border-0 flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">High Risk Priority</span>
                  <span className="text-3xl font-extrabold text-slate-900">{highRiskCount}</span>
                </div>
              </div>
            </div>

            {/* Left Card 2: Log Completed Service */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Log Completed Service</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Submitting a service log automatically resets the vehicle's compliance clock.
                </p>
              </div>

              {formNotice && (
                <div className={`p-3 rounded-lg border-0 text-xs sm:text-sm font-semibold ${
                  formNotice.type === 'success' ? 'bg-[#E3FDFD] text-slate-900' : 'bg-[#CBF1F5] text-slate-900'
                }`}>
                  {formNotice.text}
                </div>
              )}

              <form onSubmit={handleLogService} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-800">Select Vehicle from Queue</label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => {
                      const vId = e.target.value;
                      setSelectedVehicleId(vId);
                      const selected = queue.find((v) => (v.vehicleId || v.id) === vId);
                      if (selected) {
                        const mVal = selected.mileage ?? selected.current_mileage;
                        if (mVal !== undefined) {
                          setOdometerInput(String(mVal).replace(/[^\d]/g, ''));
                        }
                      }
                      setFormNotice(null);
                    }}
                    className="bg-white/90 text-slate-900 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  >
                    <option value="">-- Select Vehicle to Service --</option>
                    {queue.map((v) => {
                      const vId = v.vehicleId || v.id;
                      const plate = v.registrationNumber || v.plate || vId;
                      const model = v.vehicle || v.model || '';
                      const priority = v.priority || v.riskLevel || 'Normal';
                      return (
                        <option key={vId} value={vId}>
                          {plate} ({model}) - [{priority} Risk]
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-800">Current Odometer Mileage (km)</label>
                  <input
                    type="number"
                    value={odometerInput}
                    onChange={(e) => setOdometerInput(e.target.value)}
                    placeholder="e.g. 112000"
                    className="bg-white/90 text-slate-900 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-800">Mechanic Service Notes (Optional)</label>
                  <textarea
                    rows="2"
                    value={serviceNotes}
                    onChange={(e) => setServiceNotes(e.target.value)}
                    placeholder="Enter diagnostic details or parts replaced..."
                    className="bg-white/90 text-slate-900 text-xs sm:text-sm p-3 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#71C9CE] hover:bg-[#5bb8bc] disabled:opacity-50 text-slate-950 font-extrabold text-xs sm:text-sm px-4.5 py-2.5 rounded-lg transition-colors mt-1 cursor-pointer"
                >
                  {submitting ? 'Logging Service...' : 'Log Service & Reset Clock'}
                </button>
              </form>
            </div>

          </div>

          {/* RIGHT MAIN COLUMN (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            
            {/* Right Card 1: Service Queue & Risk-Driven Priority */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Service Queue</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Sorted by maintenance urgency and risk flags.</p>
                </div>

                <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                  <button
                    onClick={() => setQueueFilter('all')}
                    className={`px-2.5 py-1 rounded transition-colors ${queueFilter === 'all' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    All ({queue.length})
                  </button>
                  <button
                    onClick={() => setQueueFilter('overdue')}
                    className={`px-2.5 py-1 rounded transition-colors ${queueFilter === 'overdue' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    Overdue ({overdueCount})
                  </button>
                  <button
                    onClick={() => setQueueFilter('today')}
                    className={`px-2.5 py-1 rounded transition-colors ${queueFilter === 'today' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    Today ({scheduledTodayCount})
                  </button>
                  <button
                    onClick={() => setQueueFilter('high-risk')}
                    className={`px-2.5 py-1 rounded transition-colors ${queueFilter === 'high-risk' ? 'bg-[#71C9CE] text-slate-950' : 'text-slate-600'}`}
                  >
                    High Risk ({highRiskCount})
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
                {filteredQueue.length === 0 ? (
                  <p className="text-xs sm:text-sm text-slate-500 italic p-3.5 bg-slate-50 rounded-lg">
                    {loading ? 'Loading queue items...' : 'No vehicles match the selected service queue filter.'}
                  </p>
                ) : (
                  filteredQueue.map((item) => {
                    const vId = item.vehicleId || item.id || item.scheduleId;
                    const plate = item.registrationNumber || item.plate || vId;
                    const model = item.vehicle || item.model || 'Fleet Vehicle';
                    const serviceType = item.serviceName || item.serviceType || 'Maintenance Check';
                    const priority = item.priority || item.riskLevel || 'Low';
                    const isOverdue = item.overdue || item.urgency === 'Overdue';
                    const dueInfo = item.dueMileage ? `Due at: ${item.dueMileage.toLocaleString()} km` : (item.dueDate || 'Scheduled');
                    const mileageInfo = typeof item.mileage === 'number' ? `${item.mileage.toLocaleString()} km` : (item.mileage || '');

                    return (
                      <div
                        key={vId}
                        className={`p-3.5 rounded-lg border-0 text-xs sm:text-sm flex flex-col gap-2 ${
                          isOverdue ? 'bg-[#CBF1F5]/80 text-slate-900' : 'bg-[#E3FDFD]/80 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-slate-900">{plate}</span>
                            <span className="text-xs text-slate-600">({model})</span>
                          </div>
                          <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-white/90">
                            {priority} Risk Priority
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 font-medium">{serviceType}</p>

                        <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold pt-1">
                          <span>{dueInfo} | Current: {mileageInfo}</span>
                          <button
                            onClick={() => {
                              setSelectedVehicleId(vId);
                              const mVal = item.mileage ?? item.current_mileage;
                              if (mVal !== undefined) {
                                setOdometerInput(String(mVal).replace(/[^\d]/g, ''));
                              }
                            }}
                            className="text-[#061d23] font-bold underline hover:opacity-80 cursor-pointer"
                          >
                            Quick Fill Log
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Card 2: Recently Completed Services (Mini-Log) */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recently Completed Services</h3>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">Clock Resets</span>
              </div>

              <div className="flex flex-col gap-3.5 max-h-[380px] overflow-y-auto pr-1">
                {completedServices.length === 0 ? (
                  <p className="text-xs sm:text-sm text-slate-500 italic p-3 bg-slate-50 rounded-lg">
                    {loading ? 'Loading recent services...' : 'No recently completed services logged yet.'}
                  </p>
                ) : (
                  completedServices.map((log) => {
                    const logId = log.serviceId || log.id || Math.random();
                    const vehiclePlate = log.registrationNumber || log.vehicle || 'Vehicle';
                    const model = log.vehicle || log.model || '';
                    const serviceType = log.notes || `Scheduled Service (${log.serviceInterval || 0} km interval)`;
                    const completedAtStr = log.completedAt ? new Date(log.completedAt).toLocaleString() : (log.completedAt || 'Recently');
                    const mechanicName = log.mechanic || 'Mechanic';
                    const mileageStr = typeof log.mileage === 'number' ? `${log.mileage.toLocaleString()} km` : (log.mileageAtService || `${log.mileage || 0} km`);
                    const clockStatusStr = log.clockStatus || 'Service Clock Reset to Up-to-Date';

                    return (
                      <div key={logId} className="p-3.5 bg-slate-100/60 rounded-lg border-0 flex flex-col gap-2 text-xs sm:text-sm">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{vehiclePlate} {model && `(${model})`}</span>
                          <span className="text-xs text-slate-500 font-medium">{completedAtStr}</span>
                        </div>

                        <p className="text-slate-800 italic bg-[#E3FDFD]/60 p-2.5 rounded border-0 text-xs font-medium">
                          "{serviceType}" — Mileage: {mileageStr}
                        </p>

                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-emerald-800 font-bold bg-[#E3FDFD] px-2 py-0.5 rounded">
                            {clockStatusStr}
                          </span>
                          <span className="text-slate-600">By: {mechanicName}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
