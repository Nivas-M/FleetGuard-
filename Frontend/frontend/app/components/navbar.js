export default function navbar(){
    return(
        <div className='flex flex-row items-center justify-between gap-2 p-4'>
            <div className='flex flex-row items-center gap-2'>
                <img src='/images/logo.png' alt = 'Profile' className='w-10 h-auto mr-1'/>
                <h1 className='text-2xl bg-'>FleetGuard</h1>
            </div>
                <img src='/images/user.png' alt = 'Profile' className='w-8 h-8 rounded-full border border-black'/>
        </div>
    );
}