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

export default function AdminGlobalAlertConfigPage() {
  const [config, setConfig] = useState({
    defaultInsuranceDays: 30,
    defaultInspectionDays: 15,
    defaultEmissionsDays: 7,
    enableEmailNotifications: true,
    enableSmsEscalation: false,
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <RoleHeader roleTitle="Admin Governance" roleBadge="Global Alert Configuration" links={ADMIN_LINKS} activeLink="/admin/cloned/alert-config" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Global System Alert Configuration</h1>
          <p className="text-xs text-slate-600 mt-0.5">Configure default lead times and external notification channel stubs system-wide.</p>
        </div>

        {savedNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-200">
            ✓ Global alert configuration updated across all 4 regional hubs!
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 text-xs">
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100">Global Default Lead Times</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Insurance Renewal (Days)</label>
                <input
                  type="number"
                  value={config.defaultInsuranceDays}
                  onChange={(e) => setConfig({ ...config, defaultInsuranceDays: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Inspection Renewal (Days)</label>
                <input
                  type="number"
                  value={config.defaultInspectionDays}
                  onChange={(e) => setConfig({ ...config, defaultInspectionDays: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">PUC Emissions (Days)</label>
                <input
                  type="number"
                  value={config.defaultEmissionsDays}
                  onChange={(e) => setConfig({ ...config, defaultEmissionsDays: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:ring-2 focus:ring-[#71C9CE]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100">Notification Channel Stubs</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.enableEmailNotifications}
                onChange={(e) => setConfig({ ...config, enableEmailNotifications: e.target.checked })}
                className="w-4 h-4 rounded text-[#71C9CE] focus:ring-[#71C9CE]"
              />
              <span className="font-semibold text-slate-800">Send Email Alerts to Fleet Managers & Admins</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.enableSmsEscalation}
                onChange={(e) => setConfig({ ...config, enableSmsEscalation: e.target.checked })}
                className="w-4 h-4 rounded text-[#71C9CE] focus:ring-[#71C9CE]"
              />
              <span className="font-semibold text-slate-800">Enable Urgent SMS Escalation for Overdue Documents</span>
            </label>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold text-xs shadow-sm transition-all cursor-pointer"
          >
            Save Global Configuration
          </button>
        </form>
      </main>
    </div>
  );
}
