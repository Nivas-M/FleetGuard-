'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close popup menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full flex items-center justify-between gap-4 py-4 px-2">
      {/* Brand Logo & Name */}
      <a href="/" className="flex items-center gap-2.5 cursor-pointer">
        <div className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer">
          <img src="/images/logo.png" alt="FleetGuard Logo" className="w-full h-full object-cover"/>
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">FleetGuard</span>
      </a>

      {/* Right Controls: User Profile Button with Popout Menu */}
      <div className="flex items-center gap-3">
        {isAuthenticated && user ? (
          <div className="relative" ref={menuRef}>
            {/* Profile Avatar Trigger Button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              title="User Profile"
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#71C9CE] hover:border-[#5bb8bc] transition-all cursor-pointer shadow-sm focus:outline-none flex items-center justify-center bg-white"
            >
              <img src="/images/user.png" alt="Profile" className="w-full h-full object-cover" />
            </button>

            {/* Popout Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 p-2 z-50 flex flex-col gap-1">
                <div className="px-3 py-2 border-b border-slate-100 flex flex-col">
                  <span className="text-xs font-bold text-slate-900 truncate">{user.name || 'User'}</span>
                  <span className="text-[10px] font-semibold text-slate-500">{user.role || 'Member'}</span>
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Fallback if not authenticated */
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
