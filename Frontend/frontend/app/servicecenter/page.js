'use client';

import { useState } from 'react';
import Navbar from '../components/navbar';

export default function ServiceCenterDashboard() {
  // Mock Service Queue Data
  const initialQueue = [
    {
      id: 'VH002',
      plate: 'TN-09-EF-1122',
      model: 'Tata Prima Express Truck',
      serviceType: '100,000 km Major Overhaul & Oil Renewal',
      dueDate: '2025-11-12',
      mileage: '112,000 km',
      urgency: 'Overdue',
      riskLevel: 'High',
      assignedMechanic: 'Dave Miller',
      scheduledToday: true,
    },
    {
      id: 'VH003',
      plate: 'TN-14-GH-3344',
      model: 'Ashok Leyland 2820',
      serviceType: 'Brake Disc Inspection & Transmission Fluid',
      dueDate: '2025-09-18',
      mileage: '145,800 km',
      urgency: 'Overdue',
      riskLevel: 'High',
      assignedMechanic: 'Sam Wilson',
      scheduledToday: true,
    },
    {
      id: 'VH001',
      plate: 'TN-02-CD-5678',
      model: 'Volvo FH16 Heavy Freight',
      serviceType: '80,000 km Scheduled Lubrication & Filters',
      dueDate: '2026-02-10',
      mileage: '85,400 km',
      urgency: 'Due Soon',
      riskLevel: 'Medium',
      assignedMechanic: 'Dave Miller',
      scheduledToday: false,
    },
    {
      id: 'VH005',
      plate: 'TN-45-LM-4455',
      model: 'BharatBenz 3528C',
      serviceType: 'Engine Diagnostics & Air Filter Replacement',
      dueDate: '2026-05-30',
      mileage: '98,300 km',
      urgency: 'Routine Check',
      riskLevel: 'High',
      assignedMechanic: 'Unassigned',
      scheduledToday: false,
    },
  ];

  const initialCompletedServices = [
    {
      id: 'LOG-702',
      vehicle: 'TN-37-JK-9988',
      model: 'Eicher Pro 6028',
      serviceType: '60,000 km Scheduled Service & Oil Filter',
      completedAt: '2026-07-29 16:45',
      mechanic: 'Dave Miller',
      mileageAtService: '42,100 km',
      clockStatus: 'Service Clock Reset to Up-to-Date',
    },
    {
      id: 'LOG-699',
      vehicle: 'TN-72-NP-7711',
      model: 'Mahindra Blazo X 28',
      serviceType: 'Annual Safety Tune-up & Tire Rotation',
      completedAt: '2026-07-28 11:20',
      mechanic: 'Sam Wilson',
      mileageAtService: '31,500 km',
      clockStatus: 'Service Clock Reset to Up-to-Date',
    },
  ];

  // State Management
  const [queue, setQueue] = useState(initialQueue);
  const [completedServices, setCompletedServices] = useState(initialCompletedServices);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [serviceTypeInput, setServiceTypeInput] = useState('');
  const [odometerInput, setOdometerInput] = useState('');
  const [serviceNotes, setServiceNotes] = useState('');
  const [formNotice, setFormNotice] = useState(null);
  const [queueFilter, setQueueFilter] = useState('all');

  // Stat Computations
  const totalInQueue = queue.length;
  const overdueCount = queue.filter((item) => item.urgency === 'Overdue').length;
  const scheduledTodayCount = queue.filter((item) => item.scheduledToday).length;
  const highRiskCount = queue.filter((item) => item.riskLevel === 'High').length;

  // Log Service Handler (Triggers Automatic Compliance Clock Reset)
  const handleLogService = (e) => {
    e.preventDefault();
    if (!selectedVehicleId || !serviceTypeInput || !odometerInput) {
      setFormNotice({
        type: 'error',
        text: 'Please select a vehicle, enter the service type, and specify current mileage.',
      });
      return;
    }

    const vehicleObj = queue.find((v) => v.id === selectedVehicleId);
    const vehiclePlate = vehicleObj ? vehicleObj.plate : selectedVehicleId;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    // Remove vehicle from service queue
    setQueue((prev) => prev.filter((item) => item.id !== selectedVehicleId));

    // Append to completed service log with clock reset confirmation
    const newLog = {
      id: `LOG-${Math.floor(700 + Math.random() * 200)}`,
      vehicle: vehiclePlate,
      model: vehicleObj ? vehicleObj.model : 'Fleet Vehicle',
      serviceType: serviceTypeInput,
      completedAt: now,
      mechanic: 'Dave Miller (Lead Mechanic)',
      mileageAtService: `${odometerInput} km`,
      clockStatus: 'Service Clock Reset to Up-to-Date',
    };

    setCompletedServices([newLog, ...completedServices]);

    setFormNotice({
      type: 'success',
      text: `Service logged for ${vehiclePlate}. Compliance clock automatically reset to Up-to-Date!`,
    });

    // Reset Form
    setSelectedVehicleId('');
    setServiceTypeInput('');
    setOdometerInput('');
    setServiceNotes('');

    setTimeout(() => setFormNotice(null), 5000);
  };

  // Filtered Queue
  const filteredQueue = queue.filter((item) => {
    if (queueFilter === 'overdue') return item.urgency === 'Overdue';
    if (queueFilter === 'today') return item.scheduledToday;
    if (queueFilter === 'high-risk') return item.riskLevel === 'High';
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
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Service Center & Mechanic Dashboard</h1>
          <p className="text-sm text-slate-600 mt-0.5 font-medium">
            Service queue management, risk-driven maintenance priority, and automatic compliance clock resets.
          </p>
        </div>

        {/* DASHBOARD GRID (Border-Free Blended Cards mimicking Fleet Manager & Driver layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* LEFT MAIN COLUMN (Span 6) */}
          <div className="lg:col-span-6 flex flex-col gap-7">
            
            {/* Left Card 1: Today's Scheduled Services & Metric Stats */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Service Queue Stats</h3>
                <span className="text-xs sm:text-sm font-semibold text-slate-500 font-medium">Live Queue</span>
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

            {/* Left Card 2: Log Service Quick Action (Form triggers Clock Reset) */}
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
                      setSelectedVehicleId(e.target.value);
                      const selected = queue.find((v) => v.id === e.target.value);
                      if (selected) {
                        setServiceTypeInput(selected.serviceType);
                        setOdometerInput(selected.mileage.replace(' km', '').replace(',', ''));
                      }
                      setFormNotice(null);
                    }}
                    className="bg-white/90 text-slate-900 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  >
                    <option value="">-- Select Vehicle to Service --</option>
                    {queue.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.plate} ({v.model}) - [{v.urgency}]
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-800">Service Type Completed</label>
                  <input
                    type="text"
                    value={serviceTypeInput}
                    onChange={(e) => setServiceTypeInput(e.target.value)}
                    placeholder="e.g. 100,000 km Oil & Filter Change"
                    className="bg-white/90 text-slate-900 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#71C9CE]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs sm:text-sm font-bold text-slate-800">Current Odometer Mileage (km)</label>
                  <input
                    type="text"
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
                  className="bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs sm:text-sm px-4.5 py-2.5 rounded-lg transition-colors mt-1"
                >
                  Log Service & Reset Clock
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

              <div className="flex flex-col gap-3">
                {filteredQueue.length === 0 ? (
                  <p className="text-xs sm:text-sm text-slate-500 italic p-3.5 bg-slate-50 rounded-lg">
                    No vehicles match the selected service queue filter.
                  </p>
                ) : (
                  filteredQueue.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-lg border-0 text-xs sm:text-sm flex flex-col gap-2 ${
                        item.urgency === 'Overdue'
                          ? 'bg-[#CBF1F5]/80 text-slate-900'
                          : 'bg-[#E3FDFD]/80 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-900">{item.plate}</span>
                          <span className="text-xs text-slate-600">({item.model})</span>
                        </div>
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-white/90">
                          {item.riskLevel} Risk Priority
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 font-medium">{item.serviceType}</p>

                      <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold pt-1">
                        <span>Due: {item.dueDate} | Mileage: {item.mileage}</span>
                        <button
                          onClick={() => {
                            setSelectedVehicleId(item.id);
                            setServiceTypeInput(item.serviceType);
                            setOdometerInput(item.mileage.replace(' km', '').replace(',', ''));
                          }}
                          className="text-[#061d23] font-bold underline hover:opacity-80"
                        >
                          Quick Fill Log
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Card 2: Recently Completed Services (Mini-Log) */}
            <div className="bg-white/70 rounded-xl p-6 border-0 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recently Completed Services</h3>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">Clock Resets</span>
              </div>

              <div className="flex flex-col gap-3.5">
                {completedServices.map((log) => (
                  <div key={log.id} className="p-3.5 bg-slate-100/60 rounded-lg border-0 flex flex-col gap-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{log.vehicle} ({log.model})</span>
                      <span className="text-xs text-slate-500 font-medium">{log.completedAt}</span>
                    </div>

                    <p className="text-slate-800 italic bg-[#E3FDFD]/60 p-2.5 rounded border-0 text-xs font-medium">
                      "{log.serviceType}" — Mileage: {log.mileageAtService}
                    </p>

                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-emerald-800 font-bold bg-[#E3FDFD] px-2 py-0.5 rounded">
                        {log.clockStatus}
                      </span>
                      <span className="text-slate-600">By: {log.mechanic}</span>
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
