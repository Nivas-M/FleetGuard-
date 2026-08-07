'use client';

import { useState } from 'react';
import RoleHeader from '../../../cloned/components/RoleHeader';

const FLEETMANAGER_LINKS = [
  { label: 'Dashboard', href: '/fleetmanager/cloned' },
  { label: 'Vehicle Registry', href: '/fleetmanager/cloned/vehicles' },
  { label: 'Assignments Flow', href: '/fleetmanager/cloned/assignments' },
  { label: 'Override Log', href: '/fleetmanager/cloned/override-log' },
  { label: 'Alert Config', href: '/fleetmanager/cloned/alert-config' },
  { label: 'Historical Entry', href: '/fleetmanager/cloned/historical-entry' },
];

const INITIAL_VEHICLES = [
  { id: 'v1', plate: 'TN-09-AB-1234', name: 'Heavy Hauler Alpha', model: 'Volvo FH16 (2022)', type: 'Heavy Duty Truck', branch: 'Chennai Hub', status: 'Active', compliance: 'Non-Compliant', driver: 'Rajesh Kumar' },
  { id: 'v2', plate: 'TN-14-CD-5678', name: 'Cargo Express Beta', model: 'Tata Signa 4825 (2023)', type: 'Multi-Axle Truck', branch: 'Coimbatore Hub', status: 'Active', compliance: 'Action Required', driver: 'Suresh Raina' },
  { id: 'v3', plate: 'TN-37-EF-9012', name: 'LogiTrans Gamma', model: 'BharatBenz 2823C (2021)', type: 'Tpper Truck', branch: 'Madurai Hub', status: 'In Repair', compliance: 'Non-Compliant', driver: 'Unassigned' },
  { id: 'v4', plate: 'TN-01-GH-3456', name: 'Metro Hauler Delta', model: 'Eicher Pro 6028 (2024)', type: 'Medium Hauler', branch: 'Chennai Hub', status: 'Active', compliance: 'Compliant', driver: 'Anil Kapoor' },
  { id: 'v5', plate: 'TN-11-IJ-7890', name: 'Coastal Transport Epsilon', model: 'Ashok Leyland 3520 (2022)', type: 'Rigid Truck', branch: 'Salem Hub', status: 'Active', compliance: 'Action Required', driver: 'Venkatesh Prasad' },
  { id: 'v6', plate: 'TN-05-KL-2345', name: 'Southern Logistics Zeta', model: 'Mahindra Blazo X (2023)', type: 'Heavy Hauler', branch: 'Chennai Hub', status: 'Standby', compliance: 'Compliant', driver: 'Unassigned' },
];

export default function VehicleRegistryPage() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ plate: '', name: '', model: '', type: 'Heavy Duty Truck', branch: 'Chennai Hub' });

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!newVehicle.plate || !newVehicle.name) return;

    const added = {
      id: `v-${Date.now()}`,
      plate: newVehicle.plate.toUpperCase(),
      name: newVehicle.name,
      model: newVehicle.model || 'Standard Fleet Model',
      type: newVehicle.type,
      branch: newVehicle.branch,
      status: 'Active',
      compliance: 'Compliant',
      driver: 'Unassigned',
    };

    setVehicles([added, ...vehicles]);
    setShowAddModal(false);
    setNewVehicle({ plate: '', name: '', model: '', type: 'Heavy Duty Truck', branch: 'Chennai Hub' });
  };

  const filtered = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Fleet Manager" roleBadge="Vehicle Registry" links={FLEETMANAGER_LINKS} activeLink="/fleetmanager/cloned/vehicles" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Vehicle Registry</h1>
            <p className="text-xs text-slate-600">List all vehicles, edit details, and add new assets to fleet inventory.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>+ Add New Vehicle</span>
          </button>
        </div>

        {/* Search & Stats Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by plate, vehicle name, model..."
            className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE] w-full sm:w-80"
          />

          <span className="text-xs font-bold text-slate-600">
            Total Inventory: <span className="text-slate-900 font-extrabold">{vehicles.length} Vehicles</span>
          </span>
        </div>

        {/* Vehicle Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                  <th className="py-3.5 px-4">Plate Number</th>
                  <th className="py-3.5 px-4">Vehicle Name & Model</th>
                  <th className="py-3.5 px-4">Category Type</th>
                  <th className="py-3.5 px-4">Branch Hub</th>
                  <th className="py-3.5 px-4">Assigned Driver</th>
                  <th className="py-3.5 px-4">Compliance Status</th>
                  <th className="py-3.5 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-[#E3FDFD]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{v.plate}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900">{v.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{v.model}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{v.type}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">{v.branch}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{v.driver}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        v.compliance === 'Non-Compliant'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : v.compliance === 'Action Required'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-[#E3FDFD] text-[#061d23] border border-[#A6E3E9]'
                      }`}>
                        {v.compliance}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={`/fleetmanager/cloned/vehicles/${v.id}`}
                        className="text-xs font-bold text-[#71C9CE] hover:text-[#5bb8bc] underline"
                      >
                        View Detail →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Vehicle Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900">Add New Vehicle to Registry</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Registration Plate Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TN-07-ZZ-9999"
                    value={newVehicle.plate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vehicle Name / Alias *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Express Hauler Heavy Duty"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Make & Model</label>
                  <input
                    type="text"
                    placeholder="e.g. BharatBenz 3528 (2024)"
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category Type</label>
                    <select
                      value={newVehicle.type}
                      onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
                    >
                      <option value="Heavy Duty Truck">Heavy Duty Truck</option>
                      <option value="Multi-Axle Truck">Multi-Axle Truck</option>
                      <option value="Tipper Truck">Tipper Truck</option>
                      <option value="Medium Hauler">Medium Hauler</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Branch Hub</label>
                    <select
                      value={newVehicle.branch}
                      onChange={(e) => setNewVehicle({ ...newVehicle, branch: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#71C9CE]"
                    >
                      <option value="Chennai Hub">Chennai Hub</option>
                      <option value="Coimbatore Hub">Coimbatore Hub</option>
                      <option value="Madurai Hub">Madurai Hub</option>
                      <option value="Salem Hub">Salem Hub</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#71C9CE] text-slate-950 font-extrabold hover:bg-[#5bb8bc]"
                  >
                    Save Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
