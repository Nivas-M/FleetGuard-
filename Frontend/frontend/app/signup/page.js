'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = Router();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('fleet-manager');

    function Router() {
        try {
            return useRouter();
        } catch {
            return null;
        }
    }

    const handleSignup = (e) => {
        e.preventDefault();
        // Redirect to appropriate dashboard after sign up
        const targetRoute = role === 'admin' ? '/admin' :
                            role === 'driver' ? '/driver' :
                            role === 'service-center' ? '/servicecenter' : '/fleetmanager';
        if (router) {
            router.push(targetRoute);
        } else {
            window.location.href = targetRoute;
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col justify-center font-sans selection:bg-[#71C9CE] selection:text-slate-950">
            {/* Main Content Area */}
            <main className="max-w-7xl w-full mx-auto px-6 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Branding, Headline & Signup Form */}
                <div className="lg:col-span-6 flex flex-col justify-center max-w-xl w-full">
                    {/* Brand Logo & Name */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#E3FDFD] p-1.5 flex items-center justify-center border border-[#A6E3E9]">
                            <img src="/images/logo.png" alt="FleetGuard Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">FleetGuard</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-[3rem] font-serif tracking-tight text-slate-900 mb-2 leading-[1.15]">
                        Create your account
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg font-normal mb-6 leading-relaxed">
                        Start managing your fleet operations and compliance with confidence
                    </p>

                    {/* Signup Card Box - Compact Natural Content Fit */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm w-full">
                        {/* Signup Form */}
                        <form onSubmit={handleSignup} className="flex flex-col gap-3.5">
                            <div>
                                <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="johndoe"
                                    className="bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#71C9CE] focus:ring-1 focus:ring-[#71C9CE] block w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                    Work Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#71C9CE] focus:ring-1 focus:ring-[#71C9CE] block w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Passwords in the same line */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#71C9CE] focus:ring-1 focus:ring-[#71C9CE] block w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#71C9CE] focus:ring-1 focus:ring-[#71C9CE] block w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                    Role / Access Level
                                </label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="bg-slate-50 text-slate-900 border border-slate-300 focus:border-[#71C9CE] focus:ring-1 focus:ring-[#71C9CE] block w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all cursor-pointer"
                                    required
                                >
                                    <option value="fleet-manager">Fleet Manager</option>
                                    <option value="admin">System Admin</option>
                                    <option value="driver">Driver</option>
                                    <option value="service-center">Service Center Partner</option>
                                </select>
                            </div>

                            {/* Primary CTA Button - Cyan Accent per designtemplate.md */}
                            <button
                                type="submit"
                                className="bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold py-3 px-4 rounded-xl text-sm transition-all shadow-sm cursor-pointer mt-1"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="text-xs text-slate-500 mt-4 text-center">
                            Already have an account?{' '}
                            <a href="/login" className="text-slate-900 hover:text-[#71C9CE] underline font-semibold">
                                Login
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Column: Hero Cover Image Frame */}
                <div className="lg:col-span-6 flex justify-center lg:justify-end">
                    <div className="w-full max-w-lg lg:max-w-none h-[480px] sm:h-[540px] lg:h-[640px] rounded-3xl overflow-hidden border border-slate-200 shadow-md relative group bg-slate-100">
                        <img
                            src="/images/logincover.png"
                            alt="FleetGuard Cover"
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                        
                    </div>
                </div>
            </main>
        </div>
    );
}


