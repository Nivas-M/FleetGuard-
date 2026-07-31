'use client';

import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-2">
      {/* Brand Logo & Name */}
      <a href="/" className="flex items-center gap-2.5 cursor-pointer">
        <div className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer">
          <img src="/images/logo.png" alt="FleetGuard Logo" className="w-full h-full object-cover"/>
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">FleetGuard</span>
      </a>

      {/* Right Controls: User Profile & Log Out */}
      <div className="flex items-center gap-3">
        {isAuthenticated && user && (
          <div className="flex items-center gap-2.5 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-sm">
            {/* User Profile Avatar */}
            <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-slate-300">
              <img src="/images/user.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            
            {/* User Details */}
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-none">{user.name || 'User'}</span>
              <span className="text-[10px] font-semibold text-slate-500 mt-0.5 leading-none">{user.role || 'Member'}</span>
            </div>

            {/* Log Out Button */}
            <button
              onClick={logout}
              title="Log out of session"
              className="ml-1 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-slate-300/60"
            >
              <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Fallback if not authenticated */}
        {(!isAuthenticated || !user) && (
          <a
            href="/login"
            className="bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
