import navbar from '../components/navbar';

export default function Page() {
    return (
        <div className=' h-fit w-screen text-black flex flex-col px-8  bg-[#E2DFFF]'>
            {/* NavBar*/}
            {navbar()}

            {/* First section */}
            <div className='flex flex-row w-full h-fit gap-4'>
                {/* Left */}
                <div className='w-[50%] font-sans flex flex-col h-full gap-6'>
                    {/* Greetings and summery*/}
                    <div className='font-bold font-sans flex flex-col'>
                        <h2 className="text-2xl">Welcome Back,</h2>
                        <h2 className='text-4xl'>Admin</h2>
                        <h3>Here is your Summery</h3>
                        <div className='flex flex-row gap-4 mt-4'>
                            <div className=' bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <p className='text-sm'>Vehicles Overdue</p>
                                <p className='text-2xl font-bold'>1</p>
                            </div>
                            <div className=' bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <p className='text-sm'>Overdue</p>
                                <p className='text-2xl font-bold text-red-500'>5</p>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 mt-4'>
                            <div className=' bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <p className='text-sm'>Expiring Soon</p>
                                <p className='text-2xl font-bold'>3</p>
                            </div>
                            <div className=' bg-[#F2EFFF] p-4 rounded-xl w-[50%] flex flex-col gap-2 shadow-md'>
                                <p className='text-sm'>Overrides Logged</p>
                                <p className='text-2xl font-bold'>9</p>
                            </div>
                        </div>
                    </div>

                    {/* Compliance Overview Table */}
                    <div className='w-full h-fit bg-[#F2EFFF] p-6 rounded-xl flex flex-col gap-4 shadow-md'>
                        <h2 className='text-2xl font-bold'>Compliance Overview</h2>
                        {/* Table */}
                        <table className="w-full w-full text-left text-sm text-gray-700">
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
                            </tbody>
                        </table>
                    </div>
                </div>



                {/* Right */}
                <div className='w-[50%] rounded-xl font-sans flex flex-col h-full gap-6'>

                    {/*Compliance Health by Document Type*/}
                    <div className='w-full h-fit bg-[#F2EFFF] p-6 rounded-xl flex flex-col gap-4 shadow-md'>
                        <h2 className='text-2xl font-bold'>Compliance Health by Document Type</h2>
                        {/* Table */}
                        <table className="w-full min-w-max text-left text-sm text-gray-700">
                            {/* Table headers */}
                            <thead className="text-xs uppercase font-semibold text-gray-600 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Insurance</th>
                                    <th className="px-6 py-3 text-center">Fitness Cert</th>
                                    <th className="px-6 py-3 text-center">Pollution Cert</th>
                                    <th className="px-6 py-3 text-center">Service Due</th>
                                </tr>
                            </thead>

                            {/* Table body */}
                            <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-[#E2DFFF] transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">Overdue</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-l font-medium rounded-full">5</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-l font-medium rounded-full">15</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-l font-medium rounded-full">3</span>
                                    </td>
                                </tr>

                                <tr className="hover:bg-[#E2DFFF] transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">Due Soon</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-l font-medium rounded-full">5</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-l font-medium rounded-full">10</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-l font-medium rounded-full">5</span>
                                    </td>
                                </tr>

                                <tr className="hover:bg-[#E2DFFF] transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">Compliant</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-l font-medium rounded-full">5</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-l font-medium rounded-full">15</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 text-l font-medium rounded-full">5</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Month stats */}
                    <div className="bg-[#F2EFFF] p-4 rounded-xl w-full flex flex-col gap-3 shadow-md">
                        <h3 className="font-bold text-lg mb-1">This Month</h3>
                        <div className="flex justify-between text-gray-500">
                            <p>Services logged</p>
                            <p>3</p>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <p>Overrides</p>
                            <p>1</p>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <p>Compliant</p>
                            <p>5</p>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-[#F2EFFF] p-4 rounded-xl w-full flex flex-col gap-3 shadow-md">
                        <h3 className="font-bold text-lg mb-1">Notifications</h3>
                        <p className="text-gray-500">No new notifications</p>
                    </div>
                </div>
            </div>

        </div>
    );
}