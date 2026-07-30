# FleetGuard Project Guidelines

## UI & Design System Rules
- **Minimal 2D & Flat**: All user interfaces must use a clean, minimal 2D layout. Avoid 3D skeuomorphism, heavy drop shadows, rounded pill containers (`rounded-[2.5rem]`), or vivid gradient backgrounds.
- **Custom Aqua-Cyan 4-Color Palette**:
  - **`#E3FDFD`** (Lightest Icy Tint): Used for soft stat sub-box fills (`bg-[#E3FDFD]/60`), table row hover states (`hover:bg-[#E3FDFD]/50`), and audit log quote highlights.
  - **`#CBF1F5`** (Pastel Aqua): Used for warning callouts, notification items, overdue stat boxes (`bg-[#CBF1F5]/80`), and table header fill (`bg-[#CBF1F5]/40`).
  - **`#A6E3E9`** (Medium Aqua Cyan): Used for subtle border accents (`border-[#A6E3E9]`), category dividers, and select control focus rings.
  - **`#71C9CE`** (Vibrant Cyan Accent): Used for primary action buttons (`bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold`), active tab filter highlights, and high-risk ratio bars.
- **Color Tokens**:
  - Canvas background: `bg-slate-50` (`#f8fafc`).
  - Cards: `bg-white/70 rounded-xl p-6 border-0 shadow-none` (Border-free blended cards flowing seamlessly into the background canvas).
  - Primary Headings: `text-slate-900 font-bold`.
  - Secondary Text: `text-slate-600`.
  - Primary Action Button: `bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold px-4.5 py-2.5 rounded-lg`.
- **No Emojis**: Strictly do NOT use emojis in UI markup. Use clean monochrome SVG icons (`w-4 h-4 text-slate-500`) or textual pill tags.
- **Status Badges**: Use subtle text badges:
  - Valid: `bg-[#E3FDFD] text-[#061d23]`
  - Expiring: `bg-[#A6E3E9]/40 text-[#061d23]`
  - Overdue / Expired: `bg-[#CBF1F5] text-[#061d23]`

