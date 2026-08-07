'use client';

import Navbar from '../components/navbar';

export default function StandaloneDashboardsIndex() {
  const dashboards = [
    {
      title: 'Fleet Manager Dashboard',
      role: 'Fleet Manager',
      route: '/fleetmanager/cloned',
      badge: 'Interactive Compliance & Assignment',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description:
        'Manage fleet summary stats, quick driver assignments with hard compliance blocks, override reason logging, risk distributions, and overdue notifications.',
      features: [
        'Fleet summary stat cards (Overdue, Expiring, High Risk)',
        'Compliance matrix table with search & status filters',
        'Hard compliance block on overdue vehicle assignment',
        'Real-time override log audit feed',
      ],
    },
    {
      title: 'Driver Portal & Inspection',
      role: 'Driver',
      route: '/driver/cloned',
      badge: 'Touch-Optimized Checklist',
      color: 'bg-[#E3FDFD] text-[#061d23] border-[#71C9CE]',
      description:
        'Driver-focused mobile UI displaying vehicle road-legal status, 5-point tap-to-verify pre-trip checklist, heads-up expiry warnings, and inspection history.',
      features: [
        'Road-Legal vs Do Not Drive status hero banner',
        '5-Point tap-through inspection cards with checkmarks',
        'One-tap submission & history timeline',
        'Heads-up renewal notifications',
      ],
    },
    {
      title: 'Service Center & Workshop',
      role: 'Service Mechanic',
      route: '/servicecenter/cloned',
      badge: 'Queue & Clock Reset',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      description:
        'Clear queue of vehicles requiring maintenance sorted by urgency and predictive risk score, with one-click service logging that resets compliance clocks.',
      features: [
        'Filterable service queue (Overdue, Today, High Risk)',
        'Log service form auto-populates odometer reading',
        'Automatic service-due clock reset trigger',
        'Completed work order history feed',
      ],
    },
    {
      title: 'Admin Compliance & Audit',
      role: 'System Admin',
      route: '/admin/cloned',
      badge: 'Fleet Radar & Overrides',
      color: 'bg-[#CBF1F5] text-[#061d23] border-[#71C9CE]',
      description:
        'Fleet-wide compliance scorecards, 4 regional hub breakdowns, document expiry radar, pending override request approval queue, and spend placeholders.',
      features: [
        'Executive KPI row (87.5% compliance, YTD cost estimate)',
        'Regional Hub snapshots (Chennai, Coimbatore, Madurai, Salem)',
        'Filterable document expiry radar',
        'Approve/Reject pending manager override requests',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-[#E3FDFD] text-[#061d23] border border-[#71C9CE]/50 shadow-sm">
            ✨ FleetGuard Revamped Dashboards — Standalone Clones
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Select a Cloned Dashboard to Explore
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            All 4 dashboards have been completely revamped with modern UX, interactive mock states, consistent FleetGuard styling, and zero backend connections.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {dashboards.map((dash) => (
            <div
              key={dash.route}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${dash.color}`}>
                    {dash.badge}
                  </span>
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    Role: {dash.role}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900">{dash.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {dash.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Highlights:</span>
                  <ul className="space-y-1">
                    {dash.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#71C9CE] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={dash.route}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch {dash.title}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
