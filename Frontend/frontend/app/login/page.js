import navbar from '../components/navbar';

export default function Page() {
    return (
        <div className='h-screen w-screen text-black flex flex-col items-center justify-center p-8 bg-[#E2DFFF]'>
            <div className='h-[90%] w-[80%] text-black flex flex-row p-2 bg-[#573b7d] rounded-xl overflow-hidden relative'>
                {/* Left Side */}
                <div className='h-full w-[50%] rounded-xl overflow-hidden relative'>
                    {/* Cover Image */}
                    <img src='/images/logincover.png' alt='cover image' className='h-full w-full object-cover object-center' />
                    {/* Branding Overlay */}
                    <div className='absolute top-2 left-2 flex items-center gap-2'>
                        <img src='/images/logo.png' alt='Profile' className='w-10 h-auto'/>
                        <span className='text-white text-lg font-semibold'>FleetGuard</span>
                    </div>
                </div>

                {/* Right Side */}
                <div className='h-full w-[50%] rounded-xl overflow-hidden relative p-20 gap-4 flex flex-col justify-center'>
                    <h2 className='text-4xl font-sans text-white'>Welcome Back!</h2>
                    <p className='text-white text-sm text-[]'>New to FleetGuard? <a href='/signup' className='text-blue-500 hover:underline'>Create an account</a></p>
                    {/* Login Form */}
                    <form className='flex flex-col gap-4'>
                        <div>
                            <label htmlFor='email' className='text-white'>Email</label>
                            <input type='email' id='email' className='bg-[#F2EFFF] text-black placeholder:text-gray-500 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='name@company.com' required />
                        </div>
                        <div>
                            <label htmlFor='password' className='text-white'>Password</label>
                            <input type='password' id='password' className='bg-[#F2EFFF] text-black placeholder:text-gray-500 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='••••••••' required />
                        </div>
                        <button type='submit' className='bg-[#FFD700] hover:bg-[#FFA500] text-black font-bold py-2 px-4 rounded-xl transition-colors'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}