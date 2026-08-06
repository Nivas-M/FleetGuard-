'use client';

import { useState } from 'react';
import RoleHeader from '../../../cloned/components/RoleHeader';

const ADMIN_LINKS = [
  { label: 'Dashboard', href: '/admin/cloned' },
  { label: 'Compliance Report', href: '/admin/cloned/compliance-report' },
  { label: 'User & Role Management', href: '/admin/cloned/users' },
  { label: 'Override Approvals', href: '/admin/cloned/override-approvals' },
  { label: 'Alert Config', href: '/admin/cloned/alert-config' },
  { label: 'Audit Log', href: '/admin/cloned/audit-log' },
  { label: 'Cost Tracking', href: '/admin/cloned/cost-tracking' },
];

const INITIAL_USERS = [
  { id: 'usr-1', name: 'Alexander Wright', email: 'alex.admin@fleetguard.com', role: 'Admin', branch: 'All Hubs', status: 'Active' },
  { id: 'usr-2', name: 'Rajesh Kumar', email: 'rajesh.driver@fleetguard.com', role: 'Driver', branch: 'Chennai Hub', status: 'Active' },
  { id: 'usr-3', name: 'Master Tech Vikram', email: 'vikram.mechanic@fleetguard.com', role: 'Service Center', branch: 'Chennai Hub', status: 'Active' },
  { id: 'usr-4', name: 'Suresh Raina', email: 'suresh.fm@fleetguard.com', role: 'Fleet Manager', branch: 'Coimbatore Hub', status: 'Active' },
];

export default function UserRoleManagementPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Fleet Manager', branch: 'Chennai Hub' });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    setUsers([
      { id: `usr-${Date.now()}`, name: newUser.name, email: newUser.email, role: newUser.role, branch: newUser.branch, status: 'Active' },
      ...users,
    ]);
    setShowAdd(false);
    setNewUser({ name: '', email: '', role: 'Fleet Manager', branch: 'Chennai Hub' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Admin Governance" roleBadge="User & Role Management" links={ADMIN_LINKS} activeLink="/admin/cloned/users" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">User & Role Access Management</h1>
            <p className="text-xs text-slate-600 mt-0.5">Create/manage Fleet Manager, Driver, and Service Center accounts with role-based auth.</p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2.5 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
          >
            + Create New User Account
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CBF1F5]/60 text-slate-800 uppercase tracking-wider font-extrabold text-[11px] border-b border-[#71C9CE]/30">
                  <th className="py-3.5 px-4">User ID</th>
                  <th className="py-3.5 px-4">Full Name & Email</th>
                  <th className="py-3.5 px-4">System Role</th>
                  <th className="py-3.5 px-4">Branch Hub Allocation</th>
                  <th className="py-3.5 px-4">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#E3FDFD]/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{u.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-[#061d23]">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#E3FDFD] border border-[#A6E3E9] text-[11px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{u.branch}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAdd && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900">Create New Role Account</h3>
                <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karthik Manager"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="karthik@fleetguard.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">System Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                    >
                      <option value="Fleet Manager">Fleet Manager</option>
                      <option value="Driver">Driver</option>
                      <option value="Service Center">Service Center</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Branch Hub</label>
                    <select
                      value={newUser.branch}
                      onChange={(e) => setNewUser({ ...newUser, branch: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                    >
                      <option value="Chennai Hub">Chennai Hub</option>
                      <option value="Coimbatore Hub">Coimbatore Hub</option>
                      <option value="Madurai Hub">Madurai Hub</option>
                      <option value="Salem Hub">Salem Hub</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl bg-[#71C9CE] text-slate-950 font-extrabold">Save Account</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
