'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/api/auth/login', { email, password });
            const data = response.data;

            if (data.success && data.accessToken) {
                // Save user & token in global auth context + localStorage
                login(data.user, data.accessToken);

                // Route dynamically based on user role
                const userRole = data.user?.role?.toLowerCase() || '';
                if (userRole === 'admin') {
                    router.push('/admin');
                } else if (userRole === 'fleet manager' || userRole === 'fleet-manager') {
                    router.push('/fleetmanager');
                } else if (userRole === 'driver') {
                    router.push('/driver');
                } else if (userRole === 'service center' || userRole === 'service-center') {
                    router.push('/servicecenter');
                } else {
                    router.push('/fleetmanager');
                }
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Unable to sign in. Please verify your connection.';
            setError(errorMessage);
        } finally {
            setLoading(false);
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
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

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

                            {/* Primary CTA Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#71C9CE] hover:bg-[#5bb8bc] disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-extrabold py-3 px-4 rounded-xl text-sm transition-all shadow-sm cursor-pointer mt-2 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    'Login'
                                )}
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
