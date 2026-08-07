'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function SignupPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('fleet-manager');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const roleMap = {
        'fleet-manager': 'Fleet Manager',
        'admin': 'Admin',
        'driver': 'Driver',
        'service-center': 'Mechanic',
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const formattedRole = roleMap[role] || 'Fleet Manager';
            const response = await api.post('/api/auth/register', {
                name: username,
                email,
                password,
                role: formattedRole,
            });

            if (response.data?.success) {
                setSuccessMsg('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    router.push('/login');
                }, 1500);
            } else {
                setError(response.data?.message || 'Registration failed.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Unable to register account. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
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

                    {/* Signup Card Box */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm w-full">
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {successMsg && (
                            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{successMsg}</span>
                            </div>
                        )}

                        {/* Signup Form */}
                        <form onSubmit={handleSignup} className="flex flex-col gap-3.5">
                            <div>
                                <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                                    Full Name / Username
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

                            {/* Passwords grid */}
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

                            {/* Primary CTA Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#71C9CE] hover:bg-[#5bb8bc] disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-extrabold py-3 px-4 rounded-xl text-sm transition-all shadow-sm cursor-pointer mt-1 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    'Sign Up'
                                )}
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

                {/* Right Column: Hero Cover Image Frame (Hidden on Mobile) */}
                <div className="hidden lg:flex lg:col-span-6 justify-end">
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
