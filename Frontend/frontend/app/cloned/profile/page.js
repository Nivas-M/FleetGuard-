'use client';

import { useState } from 'react';
import Navbar from '../../components/navbar';

export default function UserProfileSettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Alexander Wright',
    email: 'alex.admin@fleetguard.com',
    role: 'System Administrator',
    hub: 'Chennai Central Headquarters',
    phone: '+91 98765 43210',
  });

  const [notice, setNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setNotice(true);
    setTimeout(() => setNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">User Profile & Account Settings</h1>
          <p className="text-xs text-slate-600 mt-0.5">Manage basic account information, role details, and preferences.</p>
        </div>

        {notice && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200">
            ✓ Account profile preferences updated!
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-[#E3FDFD] border-2 border-[#71C9CE] flex items-center justify-center font-black text-xl text-[#061d23]">
              AW
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">{profile.name}</h2>
              <span className="text-xs font-bold text-[#71C9CE] bg-[#E3FDFD] px-2.5 py-0.5 rounded-full border border-[#A6E3E9]">
                {profile.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Display Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 font-semibold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Assigned Hub / Station</label>
              <input
                type="text"
                readOnly
                value={profile.hub}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-600 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm transition-all cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
