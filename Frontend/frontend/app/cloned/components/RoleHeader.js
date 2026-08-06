'use client';

import Navbar from '../../components/navbar';

export default function RoleHeader({ roleTitle, roleBadge, links = [], activeLink = '' }) {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />

        {/* Role Sub-Navigation Bar */}
        <div className="py-2.5 border-t border-slate-100 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-black tracking-tight text-slate-900">{roleTitle}</span>
            {roleBadge && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E3FDFD] text-[#061d23] border border-[#A6E3E9]">
                {roleBadge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto text-xs font-bold py-0.5">
            {links.map((link) => {
              const isActive = activeLink === link.href || activeLink === link.label;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#71C9CE] text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
