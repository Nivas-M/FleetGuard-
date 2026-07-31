'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = Router();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function Router() {
        try {
            return useRouter();
        } catch {
            return null;
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (router) {
            router.push('/fleetmanager');
        } else {
            window.location.href = '/fleetmanager';
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col justify-center font-sans selection:bg-[#71C9CE] selection:text-slate-950">
            {/* Main Content Area */}
            <main className="max-w-7xl w-full mx-auto px-6 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Branding, Headline & Login Form */}
                <div className="lg:col-span-6 flex flex-col justify-center max-w-xl">
                    {/* Brand Logo & Name */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#E3FDFD] p-1.5 flex items-center justify-center border border-[#A6E3E9]">
                            <img src="/images/logo.png" alt="FleetGuard Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">FleetGuard</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif tracking-tight text-slate-900 mb-3 leading-[1.15]">
                        Question what's next
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg font-normal mb-8 leading-relaxed">
                        Your thinking partner for big ambitions
                    </p>

                    {/* Login Card Box */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm w-full">
                        {/* Email / Password Form */}
                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#71C9CE] focus:ring-1 focus:ring-[#71C9CE] block w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-300 focus:border-[#71C9CE] focus:ring-1 focus:ring-[#71C9CE] block w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Primary CTA Button - Cyan Accent per designtemplate.md */}
                            <button
                                type="submit"
                                className="bg-[#71C9CE] hover:bg-[#5bb8bc] text-slate-950 font-extrabold py-3 px-4 rounded-xl text-sm transition-all shadow-sm cursor-pointer mt-2"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-xs text-slate-500 mt-5 text-center">
                            New to FleetGuard?{' '}
                            <a href="/signup" className="text-slate-900 hover:text-[#71C9CE] underline font-semibold">
                                Create an account
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Column: Hero Cover Image Frame */}
                <div className="lg:col-span-6 flex justify-center lg:justify-end">
                    <div className="w-full max-w-lg lg:max-w-none h-[480px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden border border-slate-200 shadow-md relative group bg-slate-100">
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

