# FleetGuard Project Guidelines

## UI & Design System Rules
- **Minimal 2D & Flat**: All user interfaces must use a clean, minimal 2D layout. Avoid 3D skeuomorphism, heavy drop shadows, rounded pill containers (`rounded-[2.5rem]`), or vivid gradient backgrounds.
- **Color Tokens**:
  - Canvas background: `bg-slate-50` (`#f8fafc`).
  - Cards: `bg-white border border-slate-200 rounded-xl p-5`.
  - Primary Headings: `text-slate-900 font-bold`.
  - Secondary Text: `text-slate-600`.
  - Primary Action Button: `bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg`.
- **No Emojis**: Strictly do NOT use emojis in UI markup. Use clean monochrome SVG icons (`w-4 h-4 text-slate-500`) or textual pill tags.
- **Status Badges**: Use subtle text badges:
  - Valid: `bg-emerald-100 text-emerald-800`
  - Expiring: `bg-amber-50 text-amber-900 border border-amber-200`
  - Overdue / Expired: `bg-rose-50 text-rose-900 border border-rose-200`
