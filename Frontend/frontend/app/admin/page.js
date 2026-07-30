/**
 * ==============================================================================
 * ADMIN DASHBOARD (app/admin/page.js)
 * ==============================================================================
 * 
 * API ENDPOINTS & DATA FETCHING:
 * ------------------------------------------------------------------------------
 * 1. GET /api/admin/vehicles (Primary Data Source)
 *    - Purpose: Retrieves all vehicle records from Supabase ('vehicles' table).
 *    - Used for:
 *      a) "Vehicles Available" Table (Registration, Make & Model, Year, Mileage, Status).
 *      b) "Vehicle Fleet Status Breakdown" Table (Dynamic counts & % per status).
 *      c) "Fleet Health Summary" Cards (Fleet Readiness %, Active count, Maintenance count).
 *      d) "Total Vehicles" Summary Card count.
 * 
 * 2. GET /api/admin/dashboard (Secondary / Optional Data Source)
 *    - Purpose: Calls getDashboardSummary() in `dashboardService.js`.
 *    - Used for:
 *      a) Fleet Managers count (summary.fleetManagers).
 *      b) Expired Documents count (summary.expiredDocuments).
 * 
 * ------------------------------------------------------------------------------
 * WHAT IS NOT BEING USED FROM `dashboardService.js`:
 * ------------------------------------------------------------------------------
 * 1. Backend Vehicle Status Counts (activeVehicles, vehiclesUnderMaintenance, outOfServiceVehicles):
 *    - Reason: Backend queries lowercase status strings ('active'), whereas DB stores capitalized ('Active').
 *    - Solution: Frontend counts these dynamically from GET /api/admin/vehicles.
 * 
 * 2. Document Compliance Percentage (compliancePercentage):
 *    - Reason: Calculated from 'compliance_documents' table in DB.
 *    - Solution: Frontend calculates Fleet Readiness Rate (Active / Total * 100) directly from live vehicles.
 * 
 * 3. mechanicalIssues:
 *    - Reason: Returns null in backend (no 'mechanical_issues' table in current DB schema).
 * 
 * 4. documentsExpiringSoon:
 *    - Reason: Requires populated rows in 'compliance_documents' table in Supabase.
 * ==============================================================================
 */

"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import navbar from '../components/navbar';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function Page() {
    const [vehicles, setVehicles] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch vehicles and dashboard summary concurrently
            const [vehiclesRes, summaryRes] = await Promise.allSettled([
                axios.get(`${API_BASE_URL}/api/admin/vehicles`),
                axios.get(`${API_BASE_URL}/api/admin/dashboard`)
            ]);

            // Handle Vehicles data
            if (vehiclesRes.status === 'fulfilled' && vehiclesRes.value.data) {
                const data = vehiclesRes.value.data.data || vehiclesRes.value.data.vehicles || vehiclesRes.value.data;
                setVehicles(Array.isArray(data) ? data : []);
            } else {
                // Fallback attempt to alternate endpoint path if needed
                try {
                    const fallbackRes = await axios.get(`${API_BASE_URL}/admin/vehicles`);
                    const data = fallbackRes.data?.data || fallbackRes.data?.vehicles || fallbackRes.data;
                    setVehicles(Array.isArray(data) ? data : []);
                } catch {
                    setVehicles([]);
                }
            }

            // Handle Dashboard Summary data
            if (summaryRes.status === 'fulfilled' && summaryRes.value.data?.data) {
                setSummary(summaryRes.value.data.data);
            }
        } catch (err) {
            console.error('Error fetching admin data:', err);
            setError('Failed to fetch data from backend server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    // Helper function to render compliance status badges
    const renderStatusBadge = (status) => {
        const normalized = String(status || 'Valid').toLowerCase();
        
        if (normalized === 'valid' || normalized === 'active' || normalized === 'compliant') {
            return (
                <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                    Valid
                </span>
            );
        } else if (normalized === 'expired' || normalized === 'out_of_service' || normalized === 'overdue') {
            return (
                <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    Expired
                </span>
            );
        } else if (normalized === 'due soon' || normalized === 'maintenance' || normalized === 'under service') {
            return (
                <span className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                    Due Soon
                </span>
            );
        }

        return (
            <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                {status || 'Pending'}
            </span>
        );
    };

    return (
        <div className='h-fit min-h-screen w-screen text-black flex flex-col px-8 bg-[#E2DFFF] pb-10'>
            {/* NavBar*/}
            {navbar()}

            {/* First section */}
            <div className='flex flex-row w-full h-fit gap-4 mt-2'>
                {/* Left */}
                <div className='w-[50%] font-sans flex flex-col h-full gap-6'>
                    {/* Greetings and summary*/}
                    <div className='font-bold font-sans flex flex-col'>
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl">Welcome Back,</h2>
                                <h2 className='text-4xl'>Admin</h2>
                            </div>
                            <button
                                onClick={fetchAdminData}
                                disabled={loading}
                                className="px-3 py-1.5 text-xs font-medium bg-[#F2EFFF] hover:bg-white text-gray-700 rounded-lg shadow-sm transition-all"
                            >
                                {loading ? 'Refreshing...' : '🔄 Refresh Data'}
                            </button>
                        </div>
                        <h3 className="mt-2 text-gray-700">Here is your Summary</h3>
                        
                        {error && (
                            <div className="mt-3 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-xs font-normal">
                                ⚠️ {error} Showing cached/fallback interface.
                            </div>
                        )}

                        <div className='flex flex-row gap-4 mt-4'>
                            <div className='bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <p className='text-sm text-gray-600 font-normal'>Total Vehicles</p>
                                <p className='text-2xl font-bold'>
                                    {summary?.totalVehicles ?? vehicles.length ?? 0}
                                </p>
                            </div>
                            <div className='bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <p className='text-sm text-gray-600 font-normal'>Overdue Documents</p>
                                <p className='text-2xl font-bold text-red-500'>
                                    {summary?.expiredDocuments ?? 0}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 mt-4'>
                            <div className='bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <p className='text-sm text-gray-600 font-normal'>Expiring Soon</p>
                                <p className='text-2xl font-bold text-amber-600'>
                                    {summary?.documentsExpiringSoon ?? 0}
                                </p>
                            </div>
                            <div className='bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <p className='text-sm text-gray-600 font-normal'>Fleet Managers</p>
                                <p className='text-2xl font-bold text-indigo-600'>
                                    {summary?.fleetManagers ?? 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Vehicles Available Table */}
                    <div className='w-full h-fit bg-[#F2EFFF] p-6 rounded-xl flex flex-col gap-4 shadow-md'>
                        <div className="flex justify-between items-center">
                            <h2 className='text-2xl font-bold'>Vehicles Available</h2>
                            <span className="text-xs text-gray-500 font-medium">
                                {loading ? 'Loading...' : `${vehicles.length} Vehicles`}
                            </span>
                        </div>

                        {/* Table Container with scrollable max height (~3 rows) */}
                        <div className="overflow-x-auto overflow-y-auto max-h-[210px] rounded-lg">
                            <table className="w-full text-left text-sm text-gray-700">
                                {/* Table headers */}
                                <thead className="text-xs uppercase font-semibold text-gray-600 border-b border-gray-200 sticky top-0 bg-[#F2EFFF] z-10">
                                    <tr>
                                        <th className="px-4 py-3">Registration</th>
                                        <th className="px-4 py-3">Make & Model</th>
                                        <th className="px-4 py-3 text-center">Year</th>
                                        <th className="px-4 py-3 text-center">Mileage</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                    </tr>
                                </thead>

                                {/* Table body */}
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-6 text-center text-gray-500 italic">
                                                Loading vehicles from backend...
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-6 text-center text-red-600 font-medium">
                                                ⚠️ {error}
                                            </td>
                                        </tr>
                                    ) : vehicles.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-6 text-center text-gray-500 italic">
                                                No vehicles found in database.
                                            </td>
                                        </tr>
                                    ) : (
                                        // Dynamic Vehicle data from backend
                                        vehicles.map((v, idx) => {
                                            const regNo = v.registration_number || v.plate_number || `Vehicle #${v.vehicle_id || idx + 1}`;
                                            const makeModel = v.make && v.model ? `${v.make} ${v.model}` : (v.make || v.model || '-');
                                            const year = v.year || '-';
                                            const mileage = v.current_mileage !== undefined && v.current_mileage !== null ? `${v.current_mileage.toLocaleString()} km` : '-';
                                            const status = v.status || 'Active';

                                            return (
                                                <tr key={v.vehicle_id || idx} className="hover:bg-[#E2DFFF] transition-colors">
                                                    <td className="px-4 py-4 font-medium text-gray-900">{regNo}</td>
                                                    <td className="px-4 py-4 text-gray-700">{makeModel}</td>
                                                    <td className="px-4 py-4 text-center text-gray-600">{year}</td>
                                                    <td className="px-4 py-4 text-center text-gray-600">{mileage}</td>
                                                    <td className="px-4 py-4 text-center">{renderStatusBadge(status)}</td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className='w-[50%] rounded-xl font-sans flex flex-col h-full gap-6'>

                    {/* Vehicle Fleet Status Breakdown Table */}
                    <div className='w-full h-fit bg-[#F2EFFF] p-6 rounded-xl flex flex-col gap-4 shadow-md'>
                        <h2 className='text-2xl font-bold'>Vehicle Fleet Status Breakdown</h2>
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max text-left text-sm text-gray-700">
                                {/* Table headers */}
                                <thead className="text-xs uppercase font-semibold text-gray-600 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3">Vehicle Status</th>
                                        <th className="px-4 py-3 text-center">Vehicle Count</th>
                                        <th className="px-4 py-3 text-center">% of Total Fleet</th>
                                    </tr>
                                </thead>

                                {/* Table body */}
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-6 text-center text-gray-500 italic">
                                                Calculating fleet breakdown...
                                            </td>
                                        </tr>
                                    ) : vehicles.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-6 text-center text-gray-500 italic">
                                                No fleet status data available.
                                            </td>
                                        </tr>
                                    ) : (
                                        (() => {
                                            // Group vehicles by status dynamically
                                            const statusMap = vehicles.reduce((acc, v) => {
                                                const s = v.status || 'Active';
                                                acc[s] = (acc[s] || 0) + 1;
                                                return acc;
                                            }, {});

                                            const total = vehicles.length;

                                            return Object.entries(statusMap).map(([statusName, count]) => {
                                                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                                                return (
                                                    <tr key={statusName} className="hover:bg-[#E2DFFF] transition-colors">
                                                        <td className="px-4 py-3.5 font-medium">
                                                            {renderStatusBadge(statusName)}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-center font-bold text-gray-900">
                                                            {count}
                                                        </td>
                                                        <td className="px-4 py-3.5 text-center text-gray-700 font-semibold">
                                                            {pct}%
                                                        </td>
                                                    </tr>
                                                );
                                            });
                                        })()
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Fleet Overview Stats */}
                    <div className="bg-[#F2EFFF] p-4 rounded-xl w-full flex flex-col gap-3 shadow-md">
                        <h3 className="font-bold text-lg mb-1">Fleet Health Summary</h3>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <p>Fleet Readiness Rate</p>
                            <p className="font-bold text-emerald-600">
                                {vehicles.length > 0
                                    ? `${Math.round((vehicles.filter(v => (v.status || '').toLowerCase() === 'active').length / vehicles.length) * 100)}%`
                                    : '0%'}
                            </p>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <p>Active Operational Vehicles</p>
                            <p className="font-bold text-gray-800">
                                {vehicles.filter(v => (v.status || '').toLowerCase() === 'active').length}
                            </p>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <p>Under Maintenance / Service</p>
                            <p className="font-bold text-amber-600">
                                {vehicles.filter(v => (v.status || '').toLowerCase().includes('service') || (v.status || '').toLowerCase().includes('maintenance')).length}
                            </p>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-[#F2EFFF] p-4 rounded-xl w-full flex flex-col gap-3 shadow-md">
                        <h3 className="font-bold text-lg mb-1">Notifications</h3>
                        <p className="text-gray-500 text-sm">No new notifications</p>
                    </div>
                </div>
            </div>
        </div>
    );
}