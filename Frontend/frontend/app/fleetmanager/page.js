import navbar from '../components/navbar';

export default function Page() {
    return (
        <div className='bg-[#E2DFFF] h-screen w-screen text-black flex flex-col px-8'>
            {/* NavBar */}
            {navbar()}

            {/* First section */}
            <div className='flex flex-row w-full h-fit gap-4'>
                {/* Left */}
                <div className='w-[50%] font-sans flex flex-col h-full gap-3'>
                    {/* Greetings and summery*/}
                    <div className='font-bold font-sans flex flex-col'>
                        <h2 className="text-2xl">Welcome Back,</h2>
                        <h2 className='text-4xl'>Fleet Manager</h2>
                        <h3>Here is your Summery</h3>
                        <div className='flex flex-row gap-4 mt-4'>
                            <div className=' bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <text className='text-sm'>Total Vehicles</text>
                                <text className='text-2xl font-bold'>100</text>
                            </div>
                            <div className=' bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <text className='text-sm'>Overdue</text>
                                <text className='text-2xl font-bold text-red-500'>5</text>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 mt-4'>
                            <div className=' bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <text className='text-sm'>Expiring Soon</text>
                                <text className='text-2xl font-bold'>3</text>
                            </div>
                            <div className=' bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <text className='text-sm'>High Risk</text>
                                <text className='text-2xl font-bold'>9</text>
                            </div>
                        </div>
                    </div>

                    {/* Quick Driver Assignment */}
                    <div className=' rounded-xl w-full flex flex-col gap-2 mt-4'>
                        <h3 className='text-lg font-bold'>Quick Driver Assignment</h3>
                        <p className='text-sm text-gray-600'>Assign a driver to a vehicle quickly</p>
                        {/* Dropdowns */}
                        <div className='flex flex-row gap-2'>
                            <select defaultValue="" className=' rounded-xl p-2 w-[50%] mt-2 bg-[#F2EFFF] cursor-pointer shadow-md'>
                                <option value="" disabled>Select Vehicle Number</option>
                                <option value="VH001">TN-02-CD-5678</option>
                                <option value="VH002">TN-09-EF-1122</option>
                                <option value="VH003">TN-14-GH-3344</option>
                            </select>
                            <select defaultValue="" className='rounded-xl p-2 w-[50%] mt-2 bg-[#F2EFFF] cursor-pointer shadow-md'>
                                <option value="" disabled>Select Driver Name</option>
                                <option value="DRV001">John Smith</option>
                                <option value="DRV002">Sarah Johnson</option>
                                <option value="DRV003">Mike Davis</option>
                            </select>
                        </div>
                        <button className='bg-[#38485D] text-white px-4 py-2 rounded-full mt-2 w-fit shadow-md'>Assign Driver</button>
                    </div>
                </div>



                {/* Right */}
                <div className='w-[50%] rounded-xl font-sans flex flex-col h-full gap-2'>
                    {/* Compliance Overview Table */}
                    <div className='w-full h-fit bg-[#F2EFFF] p-6 rounded-xl flex flex-col gap-4 shadow-md'>
                        <h2 className='text-2xl font-bold'>Compliance Overview</h2>
                        {/* Table */}
                        <table className="w-full min-w-max text-left text-sm text-gray-700">
                            {/* Table headers */}
                            <thead className="text-xs uppercase font-semibold text-gray-600 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Vehicle</th>
                                    <th className="px-6 py-3 text-center">Insurance</th>
                                    <th className="px-6 py-3 text-center">Fitness</th>
                                    <th className="px-6 py-3 text-center">Pollution</th>
                                    <th className="px-6 py-3 text-center">Service</th>
                                    <th className="px-6 py-3 text-center">Driver</th>
                                </tr>
                            </thead>

                            {/* Table body */}
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-[#E2DFFF] transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">TN-02-CD-5678</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                </tr>

                                <tr className="hover:bg-[#E2DFFF] transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">TN-09-EF-1122</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                </tr>

                                <tr className="hover:bg-[#E2DFFF] transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">TN-14-GH-3344</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                </tr>

                                <tr className="hover:bg-[#E2DFFF] transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">TN-14-GH-3344</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                </tr>

                                <tr className="hover:bg-[#E2DFFF] transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">TN-14-GH-3344</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Expired</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">Valid</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/*Right bottom section */}
                    <div className='w-full h-fit flex flex-row gap-4 mt-4'>
                        {/* Notifications */}
                        <div className="bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-3 shadow-md">
                            <h3 className="font-bold text-lg mb-1">Notifications</h3>
                            <p className="border-b border-gray-300 pb-2">Overdue: Vehicle TN-02-CD-5678 Insurance expired on 2023-05-10</p>
                            <p>Overdue: Vehicle TN-09-EF-1122 Registration expired on 2023-06-15</p>
                        </div>
                        {/* Upcoming Expirations */}
                        <div className="bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-3 shadow-md">
                            <h3 className="font-bold text-lg mb-1">Upcoming Expirations</h3>
                            <p className="border-b border-gray-300 pb-2">Vehicle TN-14-GH-3344 Insurance expires on 2023-07-20</p>
                            <p>Vehicle TN-14-GH-3344 Registration expires on 2023-08-05</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}