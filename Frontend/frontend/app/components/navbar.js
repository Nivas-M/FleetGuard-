export default function Navbar() {
  return (
    <nav className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-2">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-2.5 cursor-pointer">
        <div className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer">
          <img src="/images/logo.png" alt="Profile" className="w-full h-full object-cover"/>
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900">FleetGuard</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        
        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer">
          <img src="/images/user.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
}

